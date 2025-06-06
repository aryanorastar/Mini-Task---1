const crypto = require('crypto');

// Block that can be mined - took me a while to understand this concept
class MineableBlock {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;  // this is what we'll keep changing
        this.hash = this.calculateHash();
    }

    calculateHash() {
        // combining all block data with nonce to create hash
        return crypto.createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .digest('hex');
    }

    // the actual mining process - this is where the work happens!
    mineBlock(difficulty) {
        console.log(`\nMining block ${this.index} with difficulty ${difficulty}...`);
        
        const target = "0".repeat(difficulty); // need this many zeros at start
        const startTime = new Date().getTime();
        let attempts = 0;

        // brute force approach - keep trying until we find a valid hash
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
            attempts++;

            // show progress every 50k attempts so we know it's working
            if (attempts % 50000 === 0) {
                console.log(`Tried ${attempts} times... current hash: ${this.hash.substring(0, 10)}...`);
            }
        }

        const endTime = new Date().getTime();
        const timeTaken = endTime - startTime;

        console.log(`SUCCESS! Block mined in ${timeTaken}ms`);
        console.log(`Found nonce: ${this.nonce} after ${attempts} attempts`);
        console.log(`Final hash: ${this.hash}`);
        console.log(`Hash starts with ${difficulty} zeros as required`);
        
        return { nonce: this.nonce, attempts: attempts, time: timeTaken };
    }

    displayBlock() {
        console.log(`\n=== Block ${this.index} ===`);
        console.log(`Timestamp: ${new Date(this.timestamp).toLocaleString()}`);
        console.log(`Data: ${JSON.stringify(this.data)}`);
        console.log(`Previous Hash: ${this.previousHash}`);
        console.log(`Hash: ${this.hash}`);
        console.log(`Nonce: ${this.nonce}`);
    }
}

// blockchain with mining capability
class MiningBlockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; // start easy
    }

    createGenesisBlock() {
        const genesis = new MineableBlock(0, Date.now(), "First Block Ever", "0");
        genesis.mineBlock(this.difficulty);
        return genesis;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    // testing different difficulty levels to see the difference
    testDifficulties() {
        console.log('\n=== DIFFICULTY COMPARISON TEST ===');
        
        const testDifficulties = [1, 2, 3]; // don't go too high or it takes forever
        const results = [];

        testDifficulties.forEach(diff => {
            console.log(`\nTesting difficulty ${diff}:`);
            
            const testBlock = new MineableBlock(
                999, 
                Date.now(), 
                { test: `difficulty_${diff}` }, 
                "test123"
            );
            
            const result = testBlock.mineBlock(diff);
            results.push({ difficulty: diff, ...result });
        });

        // show comparison
        console.log('\n--- RESULTS COMPARISON ---');
        console.log('Difficulty | Attempts | Time (ms)');
        console.log('--------------------------------');
        
        results.forEach(r => {
            console.log(`    ${r.difficulty}      |  ${r.attempts.toString().padStart(6)}  | ${r.time.toString().padStart(8)}`);
        });

        console.log('\nObservation: Each extra zero makes it ~16x harder!');
        console.log('This is why Bitcoin mining uses so much electricity.');
    }
}

// Let's test this thing
console.log('=== PROOF OF WORK MINING SIMULATION ===');

// create blockchain with mining
const blockchain = new MiningBlockchain();

console.log('\nGenesis block created and mined:');
blockchain.chain[0].displayBlock();

// mine a few more blocks
console.log('\n--- MINING BLOCK 1 ---');
const block1 = new MineableBlock(1, Date.now(), {
    from: "Alice",
    to: "Bob",
    amount: 100
});
blockchain.addBlock(block1);

console.log('\n--- MINING BLOCK 2 ---');
blockchain.difficulty = 3; // make it harder
const block2 = new MineableBlock(2, Date.now(), {
    from: "Bob", 
    to: "Charlie",
    amount: 50
});
blockchain.addBlock(block2);

// show final blockchain
console.log('\n=== FINAL MINED BLOCKCHAIN ===');
blockchain.chain.forEach(block => block.displayBlock());

// test different difficulties
blockchain.testDifficulties();

// some real world context
console.log('\n=== REAL WORLD INFO ===');
console.log('Bitcoin currently uses difficulty ~20 (20+ leading zeros)');
console.log('Bitcoin network does ~100 quintillion calculations per second');
console.log('That uses about as much electricity as a small country!');
console.log('But this massive energy use is what makes Bitcoin secure.');

console.log('\nMining is basically a lottery where:');
console.log('- More tickets (hash power) = better chance to win');
console.log('- Winner gets block reward (currently 6.25 BTC ≈ $150k+)');
console.log('- Everyone else gets nothing and wasted electricity');
console.log('- Process repeats every ~10 minutes');