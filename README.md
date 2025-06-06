# Blockchain Fundamentals Project 🚀

This project is a **foundational exploration of blockchain technology**, created as part of my learning journey in BlockSeBlock Internship Program. It combines both **theoretical understanding** and **hands-on simulation code** in JavaScript to showcase how key components of a blockchain work — especially **mining** and **consensus mechanisms** like PoW, PoS, and DPoS.

---

## 📚 Theoretical Summary

### What is Blockchain?
A blockchain is a **decentralized and immutable ledger** of digital transactions, grouped in blocks and chained together using cryptographic hashes. Each block contains:
- **Index**
- **Timestamp**
- **Transaction Data**
- **Previous Block Hash**
- **Current Block Hash**
- **Nonce (for mining)**

### Why Mining?
Mining in Proof of Work (PoW) is the process of solving a computational puzzle (finding a hash with a certain number of leading zeros). This process:
- Validates new transactions
- Adds new blocks to the blockchain
- Provides security via computational cost (Sybil resistance)

### Consensus Mechanisms
Consensus ensures all participants agree on the ledger's state without a central authority.

#### 1. 🔨 Proof of Work (PoW)
- Miners compete by brute force to find a valid hash.
- Very secure, but highly energy-intensive.
- Used by Bitcoin and older Ethereum.

#### 2. 🧍 Proof of Stake (PoS)
- Validators are chosen based on how much they stake.
- Lower energy usage, faster validation.
- Used by Ethereum 2.0, Cardano.

#### 3. 🗳️ Delegated Proof of Stake (DPoS)
- Token holders vote for delegates.
- Delegates validate blocks in rotation.
- Highly efficient, but can become centralized.
- Used by EOS, Tron.

---

## 💻 Project Structure

### 1. `MineableBlock.js`
Simulates individual blocks that can be mined using PoW logic.

### 2. `MiningBlockchain.js`
Implements a basic blockchain with adjustable mining difficulty and block addition.

### 3. `ConsensusDemo.js`
Simulates PoW, PoS, and DPoS with realistic data and randomness to demonstrate selection logic.

---

## 🔨 Bugs I Fixed (With Comments)

```js
// BUGGY:
// this.hash = crypto.createHash('sha256').update(this.data).digest('hex');

// FIXED:
this.hash = this.calculateHash(); // must include nonce, timestamp, etc.
```

```js
// OLD ATTEMPT:
while (!this.hash.startsWith('000')) { ... } 

// BETTER:
while (this.hash.substring(0, difficulty) !== target) { ... }
```

---

## 📌 What I Learned

- 🔐 How hashing and proof-of-work make blockchain secure.
- 📈 How mining difficulty exponentially increases workload.
- ⚖️ Trade-offs between different consensus protocols.
- 🔧 How to simulate realistic weighted probabilities.
- 📚 The power of trial-and-error, debugging, and researching online.

---

## 📺 Resources I Used

- [Simply Explained - YouTube](https://www.youtube.com/channel/UCnxrdFPXJMeHru_b4Q_vTPQ)
- [Andreas Antonopoulos’ Bitcoin videos](https://www.youtube.com/channel/UCJWCJCWOxBYSi5DhCieLOLQ)
- [Ethereum PoS Explained - Finematics](https://finematics.com/the-ethereum-merge-explained/#:~:text=The%20transition%20to%20PoS%20aims,before%20the%20Ethereum%20network%20launched.)
- [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/)
- [Hashing and Crypto by freeCodeCamp](https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in- nodejs/#:~:text=Hashing%20involves%20converting%20a%20given,value%20and%20facilitates%20the%20retrieval.)

---

## 🧠 Naming Evolution

Some variables evolved over time to improve clarity:
```js
// Before:
let x = crypto.createHash(...);

// After:
let calculatedHash = crypto.createHash(...);

// Before:
let d = 2;

// After:
let difficulty = 2;
```

---

## 🔚 Conclusion

This project helped me internalize how blockchain systems function under the hood. Writing simulations forced me to understand:
- Why decentralization matters
- How energy plays a role in security
- The design philosophies behind PoW, PoS, and DPoS

It’s not just about code — it’s about the incentives that keep blockchains honest.

---

## 🚀 To Run This Project

You need Node.js installed (tested on v20.19.0).

Your project folder should contain these subfolders and scripts:

- `blockchain_simulation.js/blockchain.js` — simulates blockchain basics
- `mining_simulation.js/mining.js` — simulates mining in PoW
- `consensus_demo.js/consensus.js` — main consensus demo comparing PoW, PoS, and DPoS

Run all scripts sequentially using this command in your terminal (from project root):

```bash
echo "=== RUNNING BLOCKCHAIN SIMULATION ===" && \
node blockchain_simulation.js/blockchain.js && \
echo -e "\n\n=== RUNNING MINING SIMULATION ===" && \
node mining_simulation.js/mining.js && \
echo -e "\n\n=== RUNNING CONSENSUS MECHANISMS DEMO ===" && \
node consensus_demo.js/consensus.js
```

---

> 🧩 _"Blockchain isn’t magic — it’s just math, economics, and game theory combined."_  
> — Me, after finally getting this task done 😅
