# Blockchain Fundamentals Project 🚀

This project is a **foundational exploration of blockchain technology**, created as part of my learning journey in Computer Engineering. It combines both **theoretical understanding** and **hands-on simulation code** in JavaScript to showcase how key components of a blockchain work — especially **mining** and **consensus mechanisms** like PoW, PoS, and DPoS.

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

## 🕒 Timestamps (Worked Over Multiple Days)

- **Day 1 (June 3, 2025):** Wrote initial block class and basic hash function.
- **Day 2 (June 4, 2025):** Implemented mining logic and blockchain linking.
- **Day 3 (June 5, 2025):** Developed consensus comparison logic (PoW, PoS, DPoS).
- **Day 4 (June 6, 2025):** Cleaned up code, fixed bugs, added comments and learning notes.

---

## 📌 What I Learned

- 🔐 How hashing and proof-of-work make blockchain secure.
- 📈 How mining difficulty exponentially increases workload.
- ⚖️ Trade-offs between different consensus protocols.
- 🔧 How to simulate realistic weighted probabilities.
- 📚 The power of trial-and-error, debugging, and researching online.

---

## 📺 Resources I Used

- [Simply Explained - YouTube](https://www.youtube.com/c/SimplyExplained)
- [Andreas Antonopoulos’ Bitcoin videos](https://www.youtube.com/user/aantonop)
- [Ethereum PoS Explained - Finematics](https://www.youtube.com/watch?v=4ePe2BzT4oA)
- [Mozilla Developer Network (MDN)](https://developer.mozilla.org/)
- [Hashing and Crypto by freeCodeCamp](https://www.freecodecamp.org/learn/)

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

1. Ensure you have Node.js installed.
2. Clone the repo or paste the code in a file (e.g., `blockchain.js`)
3. Run using:
```bash
node blockchain.js
```

---

> 🧩 _"Blockchain isn’t magic — it’s just math, economics, and game theory combined."_  
> — Me, after finally getting this task done 😅
