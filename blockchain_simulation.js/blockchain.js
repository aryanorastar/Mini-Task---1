const crypto = require('crypto');

// Basic block structure - learned this from watching blockchain tutorials
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    // using SHA-256 because that's what Bitcoin uses
    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .digest('hex');
    }

    showBlockInfo() {
        console.log(`\nBlock #${this.index}`);
        console.log(`Time: ${new Date(this.timestamp).toLocaleString()}`);
        console.log(`Data: ${JSON.stringify(this.data)}`);
        console.log(`Previous Hash: ${this.previousHash}`);
        console.log(`Current Hash: ${this.hash}`);
        console.log(`Nonce: ${this.nonce}`);
    }
}

// simple blockchain implementation
class Blockchain {
    constructor() {
        this.chain = [this.createFirstBlock()];
    }

    // first block doesn't have a previous hash
    createFirstBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // check if blockchain is valid - important for security
    validateChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log(`Block ${i} has been tampered with!`);
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`Block ${i} doesn't link to previous block properly`);
                return false;
            }
        }
        return true;
    }

    printChain() {
        console.log('\n--- MY BLOCKCHAIN ---');
        this.chain.forEach(block => block.showBlockInfo());
    }
}

// Testing my blockchain implementation
console.log('Building a simple blockchain with 3 blocks...\n');

// create new blockchain
const myChain = new Blockchain();

// add some test transactions
const block1 = new Block(1, Date.now(), {
    sender: "Alice",
    receiver: "Bob", 
    amount: 50
});
myChain.addNewBlock(block1);

// wait a bit before next block (realistic timing)
setTimeout(() => {
    const block2 = new Block(2, Date.now(), {
        sender: "Bob",
        receiver: "Charlie",
        amount: 25
    });
    myChain.addNewBlock(block2);
    
    const block3 = new Block(3, Date.now(), {
        sender: "Charlie",
        receiver: "Alice",
        amount: 10
    });
    myChain.addNewBlock(block3);

    // show the complete chain
    myChain.printChain();

    // test blockchain validation
    console.log('\nIs my blockchain valid?', myChain.validateChain());

    // now let's try to hack it and see what happens
    console.log('\n--- TESTING SECURITY ---');
    console.log('Trying to change data in block 1...');
    
    // save original data first
    const originalData = myChain.chain[1].data;
    console.log('Original data:', JSON.stringify(originalData));

    // attempt to modify the data
    myChain.chain[1].data = {
        sender: "Alice",
        receiver: "Eve",  // changed from Bob to Eve
        amount: 500      // changed from 50 to 500
    };

    console.log('Modified data:', JSON.stringify(myChain.chain[1].data));
    console.log('Is blockchain still valid?', myChain.validateChain());

    console.log('\nWhat went wrong?');
    console.log('- Block 1 data changed but hash stayed the same');
    console.log('- This breaks the cryptographic integrity');
    console.log('- All subsequent blocks become invalid');

    // to fix this, we need to recalculate everything
    console.log('\nFixing the blockchain...');
    myChain.chain[1].hash = myChain.chain[1].calculateHash();
    myChain.chain[2].previousHash = myChain.chain[1].hash;
    myChain.chain[2].hash = myChain.chain[2].calculateHash();
    myChain.chain[3].previousHash = myChain.chain[2].hash;
    myChain.chain[3].hash = myChain.chain[3].calculateHash();

    console.log('Fixed! Is blockchain valid now?', myChain.validateChain());
    console.log('\nKey insight: Changing ANY block requires updating ALL following blocks!');
    
}, 100);