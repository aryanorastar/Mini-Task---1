// Comparing different consensus mechanisms - PoW vs PoS vs DPoS
// This was confusing at first but makes sense once you understand the incentives

// Different types of validators for each consensus mechanism
class Miner {
    constructor(name, hashRate) {
        this.name = name;
        this.hashRate = hashRate; // how fast they can mine (TH/s)
    }
}

class Validator {
    constructor(name, stakeAmount) {
        this.name = name;
        this.stakeAmount = stakeAmount; // how much they've staked
    }
}

class Delegate {
    constructor(name) {
        this.name = name;
        this.votes = 0; // votes they've received
    }
}

class Voter {
    constructor(name, tokenBalance) {
        this.name = name;
        this.tokenBalance = tokenBalance;
    }
}

// Main simulation class
class ConsensusDemo {
    constructor() {
        this.setupTestData();
    }

    setupTestData() {
        // create some miners with different hash rates
        this.miners = [
            new Miner("BigMining Corp", 120.5),
            new Miner("CryptoFarm LLC", 89.2),
            new Miner("HashPower Inc", 201.7),
            new Miner("DigitalMiner Co", 156.3),
            new Miner("BlockDigger Ltd", 93.8)
        ];

        // validators with different stake amounts
        this.validators = [
            new Validator("Alice", 15000),
            new Validator("Bob", 32000),
            new Validator("Charlie", 8500),
            new Validator("Diana", 41000),
            new Validator("Eve", 19500)
        ];

        // delegates (will get votes later)
        this.delegates = [
            new Delegate("Community Pool"),
            new Delegate("Tech Foundation"),
            new Delegate("Innovation Lab"),
            new Delegate("Future Chain"),
            new Delegate("Crypto Alliance")
        ];

        // voters who will vote for delegates
        this.voters = [
            new Voter("Investor_A", 5000),
            new Voter("Investor_B", 3200),
            new Voter("Investor_C", 8100),
            new Voter("Investor_D", 2800),
            new Voter("Investor_E", 6500),
            new Voter("Investor_F", 4200),
            new Voter("Investor_G", 7300)
        ];
    }

    // Proof of Work simulation
    simulatePoW() {
        console.log('\n=== PROOF OF WORK SIMULATION ===');
        console.log('Miners compete to solve puzzle first...\n');
        
        console.log('Available miners:');
        this.miners.forEach((miner, i) => {
            console.log(`${i+1}. ${miner.name}: ${miner.hashRate} TH/s`);
        });

        // calculate total hash power
        const totalHashPower = this.miners.reduce((sum, miner) => sum + miner.hashRate, 0);
        console.log(`\nTotal network hash rate: ${totalHashPower.toFixed(1)} TH/s`);

        // show each miner's probability
        console.log('\nMining probabilities:');
        this.miners.forEach(miner => {
            const probability = (miner.hashRate / totalHashPower * 100).toFixed(1);
            console.log(`${miner.name}: ${probability}%`);
        });

        // simulate the mining race (weighted random selection)
        let random = Math.random() * totalHashPower;
        let winner = null;
        
        for (let miner of this.miners) {
            random -= miner.hashRate;
            if (random <= 0) {
                winner = miner;
                break;
            }
        }

        console.log(`\nWINNER: ${winner.name}!`);
        console.log('They solved the puzzle first and get the block reward.');
        console.log(`Energy used: ~${(winner.hashRate * 0.1).toFixed(1)} MW/hour`);
        
        return winner;
    }

    // Proof of Stake simulation
    simulatePoS() {
        console.log('\n=== PROOF OF STAKE SIMULATION ===');
        console.log('Validators selected based on stake size...\n');
        
        console.log('Staked validators:');
        this.validators.forEach((validator, i) => {
            console.log(`${i+1}. ${validator.name}: ${validator.stakeAmount.toLocaleString()} tokens`);
        });

        const totalStake = this.validators.reduce((sum, validator) => sum + validator.stakeAmount, 0);
        console.log(`\nTotal staked: ${totalStake.toLocaleString()} tokens`);

        // show selection probabilities
        console.log('\nSelection probabilities:');
        this.validators.forEach(validator => {
            const probability = (validator.stakeAmount / totalStake * 100).toFixed(1);
            console.log(`${validator.name}: ${probability}%`);
        });

        // weighted random selection based on stake
        let random = Math.random() * totalStake;
        let selected = null;
        
        for (let validator of this.validators) {
            random -= validator.stakeAmount;
            if (random <= 0) {
                selected = validator;
                break;
            }
        }

        console.log(`\nSELECTED: ${selected.name}!`);
        console.log('They get to create the next block.');
        console.log(`Risk: Could lose ${selected.stakeAmount.toLocaleString()} tokens if they cheat`);
        console.log('Energy used: ~0.01 MW/hour (99.9% less than PoW!)');
        
        return selected;
    }

    // Delegated Proof of Stake simulation
    simulateDPoS() {
        console.log('\n=== DELEGATED PROOF OF STAKE SIMULATION ===');
        console.log('Community votes for delegates...\n');
        
        console.log('Delegate candidates:');
        this.delegates.forEach((delegate, i) => {
            console.log(`${i+1}. ${delegate.name}`);
        });

        console.log('\nVoting process:');
        // simulate voting - each voter picks random delegates
        this.voters.forEach(voter => {
            // each voter votes for 1-2 delegates
            const numVotes = Math.floor(Math.random() * 2) + 1;
            const votedFor = [];
            
            for (let i = 0; i < numVotes; i++) {
                let randomDelegate;
                do {
                    randomDelegate = this.delegates[Math.floor(Math.random() * this.delegates.length)];
                } while (votedFor.includes(randomDelegate));
                
                votedFor.push(randomDelegate);
                randomDelegate.votes += voter.tokenBalance;
                
                console.log(`${voter.name} (${voter.tokenBalance} tokens) votes for ${randomDelegate.name}`);
            }
        });

        // show results
        console.log('\nVoting results:');
        const sortedDelegates = [...this.delegates].sort((a, b) => b.votes - a.votes);
        sortedDelegates.forEach((delegate, i) => {
            console.log(`${i+1}. ${delegate.name}: ${delegate.votes.toLocaleString()} votes`);
        });

        // top 3 become active delegates
        const topDelegates = sortedDelegates.slice(0, 3);
        const blockProducer = topDelegates[0]; // top delegate produces this block

        console.log(`\nActive delegates (top 3):`);
        topDelegates.forEach((delegate, i) => {
            const status = i === 0 ? '(CURRENT BLOCK PRODUCER)' : '(STANDBY)';
            console.log(`${i+1}. ${delegate.name} ${status}`);
        });

        console.log(`\nBlock producer: ${blockProducer.name}`);
        console.log('Block production rotates between top delegates');
        console.log('If they do bad job, community can vote them out!');
        
        return blockProducer;
    }

    // run all simulations and compare
    runComparison() {
        console.log('BLOCKCHAIN CONSENSUS MECHANISMS COMPARISON');
        console.log('==========================================');
        
        const powWinner = this.simulatePoW();
        const posWinner = this.simulatePoS();
        const dposWinner = this.simulateDPoS();

        console.log('\n=== COMPARISON SUMMARY ===');
        console.log(`PoW winner:  ${powWinner.name} (${powWinner.hashRate} TH/s)`);
        console.log(`PoS winner:  ${posWinner.name} (${posWinner.stakeAmount.toLocaleString()} tokens)`);
        console.log(`DPoS winner: ${dposWinner.name} (${dposWinner.votes.toLocaleString()} votes)`);

        this.showComparison();
    }

    showComparison() {
        console.log('\n=== DETAILED COMPARISON ===');
        console.log('Aspect          | PoW           | PoS           | DPoS');
        console.log('----------------|---------------|---------------|---------------');
        console.log('Energy use      | Very High     | Very Low      | Very Low');
        console.log('Transaction speed| Slow (~10min) | Fast (~6sec)  | Fastest (~3sec)');
        console.log('Scalability     | Limited       | Better        | Best');
        console.log('Security        | Highest       | High          | Good');
        console.log('Decentralization| Good          | Good          | Questionable');

        console.log('\n=== REAL EXAMPLES ===');
        console.log('PoW:  Bitcoin, Ethereum (old), Litecoin');
        console.log('PoS:  Ethereum 2.0, Cardano, Polkadot');
        console.log('DPoS: EOS, Tron, BitShares');

        console.log('\n=== ATTACK SCENARIOS ===');
        console.log('PoW attack:  Need 51% of hash power (very expensive)');
        console.log('PoS attack:  Need 51% of tokens + lose them if caught');
        console.log('DPoS attack: Need to control top delegates (vote buying)');

        console.log('\nEach mechanism has trade-offs:');
        console.log('- PoW: Most secure but energy hungry');
        console.log('- PoS: Good balance of security and efficiency');
        console.log('- DPoS: Fastest but potentially less decentralized');
    }
}

// run the simulation
console.log('Starting consensus mechanisms comparison...\n');

const demo = new ConsensusDemo();
demo.runComparison();

console.log('\n=== CONCLUSION ===');
console.log('Understanding these consensus mechanisms is crucial for blockchain design.');
console.log('Each one represents different priorities and trade-offs.');
console.log('The "best" one depends on what you value most: security, speed, or energy efficiency.');