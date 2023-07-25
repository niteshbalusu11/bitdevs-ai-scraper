
## bitcoin-dev


Can you please provide the text that needs to be summarized?

## Full-RBF Peering Bitcoin Core v25.0 Released


Bitcoin Core v25.0 is now available, featuring Antoine Riard's full-rbf peering code and minor updates. Full-rbf nodes advertise a FULL_RBF service bit and connect to four additional FULL_RBF peers to ensure reliable propagation of full-rbf replacements. While not necessary for everyone to run, it would be helpful if more people did. Peter Todd explains the benefits of running full-rbf in a blog post, and there are even hats available.

## Scaling and anonymizing Bitcoin at layer 1 with client-side validation


The LNP/BP Standards Association has announced the release of the RGB smart contract system, which has the potential to upgrade the Bitcoin layer 1 blockchain. The proposal, called Prime, aims to create a new scalable and anonymous layer 1, allowing for billions of transactions per minute. This upgrade can be implemented without a soft fork or miner upgrade and does not require consensus or majority for initial deployment. It also eliminates the need for Lightning Network and other layer 2 systems. The white paper describing the proposal can be found on GitHub. The association plans to establish a working group for formal specification and implementation and is seeking cooperation and non-profit donations. For-profit organizations can also become members of the association and contribute to shaping future Bitcoin technologies. Contact info provided for more information.

## Standardisation of an unstructured taproot annex


The taproot annex is currently valid but not standardized. The conversation around standardization leans towards a flexible TLV format, but this may take time to finalize. In the meantime, making the annex available in a non-structured form has immediate benefits. Proposing that any annex starting with '0' be considered free-form allows developers to use it without delay, providing immediate utilization and future flexibility. Non-structured data may be more efficient than a TLV format. This approach broadens the taproot annex's usage while allowing for a potential transition to a structured format in the future. This is seen as a practical and efficient route with short and long-term benefits.

## Conceptual package relay using taproot annex


The author presents an idea for transaction relay in the absence of a fully developed peer-to-peer relay system. They propose using a third transaction, C, that contains transactions A and B within it. Transaction C would pay sufficient fees and include at least one fee contributing input from transaction B. Miners receiving transaction C would detect the embedded transactions A and B and submit them to their mempool as a transaction package. This package (A+B) would then replace transaction C and be included in a mining block. The author notes that fees for transaction C would never be paid as it gets replaced, reducing costs. However, if not all miners adopt this scheme, transaction C may still be mined. The author suggests modifying transactions B and C if this occurs, but notes that fees paid for the initial transaction C would be forfeited.

## BIP for Silent Payments


Silent Payments is a proposed protocol that aims to address the limitations of current approaches for maintaining privacy in Bitcoin transactions. The protocol eliminates the need for interaction between sender and receiver, eliminates the need for notifications, and protects both sender and receiver privacy. It requires wallets to scan the blockchain to detect payments, which is generally feasible for full nodes but poses a challenge for light clients. The protocol has several goals, including no increase in transaction size or cost, blending transactions with other bitcoin transactions, preventing transactions from being linked to a silent payment address, and supporting payment labeling. The protocol is designed to be compatible with other spending protocols, such as CoinJoin, and supports light client/SPV wallet. The overview of the protocol provides an informal explanation of how it works, including creating a destination output for silent payments, preventing address reuse, using all inputs in a transaction, and using labels for differentiating incoming payments and managing change outputs.

## lightning-dev


Summarizing a piece of content without further context is difficult. Could you please provide the specific content you would like to have summarized?

## Proposal: Bundled payments


The proposal suggests extending BOLT-11 to include two bundled payments with distinct preimages and amounts in an invoice. This is aimed at addressing issues related to prepayment of mining fees for certain services like submarine swaps and JIT channels. The proposal aims to prevent DoS attacks and enable non-custodian services to ask for prepayment. The idea is to bundle the prepayment and main payment in the same invoice, with specific semantics for handling the HTLCs. The proposal is believed to level the competition field among lightning service providers and benefit ACINQ in making their pay-to-open service non-custodian. The proposal suggests implementing the change in BOLT-11 rather than using BOLT-12 or onion messages to keep things simple and non-interactive.

## Bitcoin PR Review Club


This is a monthly club that reviews Bitcoin Core PRs in the #bitcoin-core-pr-reviews IRC channel on libera.chat. The purpose of the club is to help newer contributors learn about the Bitcoin Core codebase and review process. It is not intended to help open PRs get merged. Anyone who wants to learn about contributing to Bitcoin Core is welcome to participate and ask questions. The benefit for participants is gaining the tools and knowledge needed to take part in the Bitcoin Core review process on GitHub. To participate, one can simply show up on IRC. The club is run by various Bitcoin Core contributors. They are always looking for interesting PRs to discuss and volunteer hosts to lead the discussion.

## #27307 Track mempool conflicts with wallet transactions


This PR addresses the issue of confused users when funds temporarily "disappear" due to conflicted transactions in the mempool. It adds a new transaction state called TxStateMempoolConflicted to indicate these conflicts and keeps track of the conflicting transactions in a new map called MempoolConflicts. This allows the wallet to properly handle and display transactions with mempool conflicts. The PR is considered a feature, as it improves the functionality and user experience of the wallet. The trade-offs of considering mempool-conflicted transactions as conflicted instead of inactive include potential confusion among users but provide a more accurate representation of transaction states. The first commit is necessary and does not change any existing behavior. The MempoolConflicts map is added to efficiently track conflicting transactions, while mapTxSpends cannot easily handle this task. The benefit of adding TxStateMempoolConflicted as a separate transaction state is to clearly represent transactions with mempool conflicts. With this PR, a user can abandon a transaction with a mempool conflict. After a wallet is reloaded, previously mempool-conflicted transactions will retain their TxStateMempoolConflicted state. The tests added to wallet_conflicts.py may fail on the master branch. The changes in this PR do not directly modify the balance calculation code, but they affect the balance calculation of the wallet indirectly by properly handling conflicted transactions. TxStateConflicted and TxStateMempoolConflicted transactions are not treated the same in memory. Additional test cases may be beneficial to ensure full coverage and reliability. wallet_abandonconflict.py needs to be modified in the second commit to accommodate the new transaction state and handle abandoned transactions properly.

## #27748 util: generalize accounting of system-allocated memory in pool resource


This summary discusses a pull request (PR) for the PR branch HEAD (commit) d25b54346fed931830cf3f538b96c5c346165487. The PR is a continuation of PR 25325, which was reviewed on March 8 of this year. It is recommended to review the notes from that previous review.
The -dbcache configuration option determines the amount of memory used for the coins cache and other memory uses. Using less memory decreases the cache hit ratio, while using more memory risks crashing bitcoind on memory-restricted systems.
To accurately account for the memory used by the cache, there is a function called MallocUsage() in Bitcoin Core that approximates the conversion from logical memory size to physical size. This function is utilized by the DynamicUsage() function in the memusage.h source file.
The PR introduces a new DynamicUsage() overload that calculates the overall coins cache size to ensure it stays within the configured cache size. This overload is only called from CCoinsViewCache::DynamicMemoryUsage().
The reviewer is asked about their feedback on the PR and to provide an approach ACK, concept ACK, tested ACK, or NACK. They are also questioned about the templated arguments in the DynamicUsage() overload before this PR and how it worked.
In the PR, the DynamicUsage() calculation is moved to a different location, and m.bucket_count() is no longer needed. The advantage of not referencing m.bucket_count() is not mentioned.
Lastly, the question mentions cachedCoinsUsage and why it is added to memusage::DynamicUsage(cacheCoins()) in CCoinsViewCache::DynamicMemoryUsage, but no explanation is given.

## #27625 Stop relaying non-mempool txs


Summary:
This proposal removes the use of mapRelay and replaces it with m_most_recent_block_txs to track only the transactions from the most recent block. mapRelay is a map of transactions that have been relayed to peers recently, and it is accompanied by a sorted list of expiration times. However, its use has been reduced over time, and now Bitcoin Core tries to fetch transactions directly from the mempool. The memory usage of mapRelay is hard to determine, and the introduction of m_most_recent_block_txs solves the problem of unnecessary memory usage. The memory requirements for m_most_recent_block_txs are lower compared to mapRelay. Transactions may be available for a shorter or longer time depending on the scenario. Introducing m_most_recent_block_txs may have downsides, but they are not mentioned in the given information.

Review approach: This information does not provide any details about the reviewer's approach to the PR review.

Memory usage of mapRelay: According to the comment, the memory usage of mapRelay is hard to determine because it grows and shrinks unpredictably. It depends on several factors, such as network conditions and the behavior of connected peers.

Introduction of m_most_recent_block_txs: The introduction of m_most_recent_block_txs solves the problem of unnecessary memory usage by only keeping track of transactions from the most recent block. It reduces the memory requirements compared to mapRelay.

Memory requirements for m_most_recent_block_txs compared to mapRelay: The information does not specify the exact memory requirements for m_most_recent_block_txs. However, it mentions that the new approach has lower memory requirements compared to mapRelay.

Availability of transactions: There are no details provided about scenarios where transactions would be available for a shorter or longer time as a result of this change. It is unclear how this change would affect the availability of transactions.

Possible downsides of removing mapRelay: The given information does not mention any downsides of removing mapRelay. Additional information is required to identify any potential downsides.

## #27711 Remove shutdown from kernel library


This is a summary of the given text:

This review club meeting focuses on a PR (#27711) related to the libbitcoinkernel project, which aims to separate Bitcoin Core's consensus engine from other non-consensus modules. The PR introduces new notification methods to handle the consensus engine requiring a shutdown. It also moves shutdown files and the remaining usage of uiInterface out of the kernel code. The questions asked during the meeting include the purpose of having startShutdown in two different files, the relationship between fRequestShutdown and this PR, the impact of the notification interface on decoupling non-consensus code from libbitcoinkernel, the flow of startShutdown and fatalError notifications, potential race conditions or synchronization issues, and the reasoning behind making KernelNotifications::m_shutdown_requested a reference value.

In conclusion, the review club meeting analyzed the PR #27711, which adds notification methods and enhances the decoupling process in the libbitcoinkernel project. The participants discussed various aspects of the PR and raised questions regarding its implementation and potential issues.