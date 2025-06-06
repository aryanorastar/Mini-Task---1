# Blockchain Fundamentals Project 🚀

This project is a **foundational exploration of blockchain technology**, created as part of my learning journey in BlockSeBlock Internship Program. It combines both **theoretical understanding** and **hands-on simulation code** in JavaScript to showcase how key components of a blockchain work — especially **mining** and **consensus mechanisms** like PoW, PoS, and DPoS.

---

## 📚 Theoretical Summary

🔗 Blockchain Basics
A blockchain is a distributed, decentralized digital ledger that records data across many computers, making it secure, transparent, and tamper-proof. Each record, or block, contains a batch of transactions or data, along with a hash of the previous block, ensuring continuity and immutability. Once data is recorded in a block and added to the chain, it’s nearly impossible to alter without changing every subsequent block across the network. Blockchains are maintained through consensus mechanisms like Proof of Work or Proof of Stake, which validate transactions and maintain network integrity without central control. This technology forms the backbone of cryptocurrencies but has far-reaching applications beyond finance.

🌍 Real-Life Use Cases

1. Supply Chain Management: Tracks goods at each step from origin to delivery, improving transparency and reducing fraud.
2. Digital Identity Verification: Provides secure, tamper-proof identity credentials for online authentication, voting, and access control.

---

📦 Block Anatomy

Block Diagram
+---------------------------------------------+
| Index: 1                                    |
| Timestamp: 2025-06-06 10:00:00              |
| Data: "Transaction Data"                    |
| Previous Hash: "0000a12b..."                |
| Merkle Root: "f9e2b1..."                    |
| Nonce: 325                                   |
| Hash: "0000b34c..."                         |
+---------------------------------------------+

🧪 Merkle Root Explanation
A Merkle root summarizes all transactions in a block. Transactions are hashed in pairs to form a tree structure, and the final single hash at the top is the Merkle root.
Example: For transactions A, B, C, and D:
Hash(A+B) → AB
Hash(C+D) → CD
Hash(AB+CD) → Merkle Root
If any transaction changes (e.g., C to X), the root changes, signaling data tampering.

--- 

🔐 Consensus Conceptualization
Proof of Work (PoW)
PoW requires miners to solve complex math puzzles using computational power. It secures the network by making it expensive to add fraudulent blocks. High energy consumption is its trade-off due to the intense calculations.

Proof of Stake (PoS)
PoS selects validators based on how much cryptocurrency they stake. Higher stake means a higher chance to validate blocks. It consumes less energy than PoW and reduces hardware requirements.

Delegated Proof of Stake (DPoS)
DPoS uses voting: coin holders elect a small group of trusted delegates to validate transactions. It's faster and more democratic, but centralization risk increases due to fewer validators.

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
