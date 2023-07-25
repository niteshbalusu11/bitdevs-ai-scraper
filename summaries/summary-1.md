
## bitcoin-dev


A request has been made to summarize a piece of information, but no specific information or text has been provided. Please provide the information or text that needs summarizing.

## Full-RBF Peering Bitcoin Core v25.0 Released


Bitcoin Core version v25.0 is now available, with a full-rbf peering code by Antoine Riard. This version allows full-rbf nodes to advertise a FULL_RBF service bit and connect to additional FULL_RBF peers, ensuring reliable propagation of full-rbf replacements. Running full-rbf is beneficial, and more people using it would be helpful. More information can be found in a blog post by Peter Todd, and there are even hats associated with it.

## Scaling and anonymizing Bitcoin at layer 1 with client-side validation


The LNP/BP Standards Association has introduced a proposal called Prime, which aims to upgrade the Bitcoin protocol by implementing a new layer 1 that is scalable and fully anonymous. This proposal moves most validation work into a client-side validation system, making Bitcoin more efficient and solving scaling and privacy issues. The upgrade does not require a softfork or miner upgrade and does not affect users who choose not to upgrade. It also makes other layer 2 systems like Lightning Network redundant. The Association plans to set up a working group for formal specification and implementation of the new layer and welcomes collaboration from the community. They also emphasize that this effort should be funded through non-profit donations and offer membership opportunities for for-profit organizations.

## Standardisation of an unstructured taproot annex


The taproot annex is currently considered valid but non-standard. Discussions on standardization are leaning towards using a flexible Type-Length-Value (TLV) format, but this may take time. In the meantime, it is proposed to define any annex starting with '0' as free-form without constraints. This allows developers to immediately utilize the taproot annex without the need to wait for structured format implementation. This strategy provides immediate utilization, future flexibility, and potentially more efficient data encoding. By adopting this approach, the taproot annex's usage can be broadened while still leaving open the possibility of transitioning to a structured format in the future.

## Conceptual package relay using taproot annex


The author presents an idea for a potential solution to the problem of transaction packages not reaching miners in the absence of peer-to-peer package relay. They suggest using a third transaction, C, which contains the original transactions A and B in a taproot annex. Transaction C would have sufficient fees and use at least one of the same fee-contributing inputs as transaction B. Miners, upon receiving transaction C, would detect the embedded transactions A and B and immediately submit them to their mempool as a transaction package. This package (A+B) would replace transaction C and could be included in a block for mining. The author notes that the fees for transaction C would not be paid because it has been replaced, so there are no additional costs involved. However, if not all miners adopt this replacement scheme, transaction C may still be mined. The author suggests modifying transactions B and C if needed and acknowledges that the fees paid for the initial transaction C would be forfeited.

## BIP for Silent Payments


The proposal introduces a protocol called Silent Payments, which aims to address the privacy concerns and limitations of existing approaches to using a new address for each Bitcoin transaction. The protocol eliminates the need for interaction and notifications, protects sender and receiver privacy, and supports features such as payment labeling. However, wallets will need to scan the blockchain to detect payments, which may pose a challenge for light clients. The overview provides an informal explanation of the protocol, including examples and considerations for address reuse, multiple outputs, and labels.

## lightning-dev


Please provide the text or information that you want to be summarized.

## Proposal: Bundled payments


In this statement, the author proposes an extension to BOLT-11, which is a protocol used in Lightning Network payments. The proposal suggests including two bundled payments with distinct preimages and amounts in an invoice. This would address the need for prepayment of mining fees in certain services like submarine swaps and JIT channels. The author argues that current methods are vulnerable to DoS attacks and may result in custodian services, which could fall under regulation. By bundling the prepayment and main payment in the same invoice, the author believes this would level the competition field and improve the non-custodian nature of certain services. The author emphasizes the need for simplicity and non-interactivity in implementing this change.

## Bitcoin PR Review Club


This is a monthly club on IRC where participants review and discuss Bitcoin Core pull requests (PRs). The club is intended to help newer contributors learn about the Bitcoin Core codebase and review process. The goal is not to get PRs merged, but to educate participants on how to contribute to Bitcoin Core. Anyone interested in contributing to Bitcoin Core can join the club and ask questions. Participating in the club provides participants with the tools and knowledge needed to contribute to the Bitcoin Core review process on GitHub. To participate, simply show up on IRC. The club is scheduled and hosted by various Bitcoin Core contributors. They are always looking for interesting PRs to discuss and volunteers to lead the discussions.

## #27307 Track mempool conflicts with wallet transactions


In Bitcoin Core, there is a PR that addresses an issue with wallet transaction states and conflicts. Currently, conflicted transactions are only considered as such when they are mined into a block, which can cause confusion for users. This PR adds a new transaction state for mempool-conflicted transactions and keeps track of conflicting transactions in a map called MempoolConflicts. Adding these changes allows the wallet to treat mempool-conflicted transactions as conflicted, providing a clearer picture of a user's balance. The PR also includes modifications to tests and the abandonment functionality for transactions with mempool conflicts. Overall, this PR fixes a bug and enhances the user experience.

## #27748 util: generalize accounting of system-allocated memory in pool resource


The PR branch HEAD was d25b54346fed931830cf3f538b96c5c346165487 at the time of this review club meeting. This PR is a follow-on to PR 25325, which we reviewed on March 8 of this year. The -dbcache configuration option determines the amount of memory used for the coins cache and other uses of memory. Using less memory than allowed decreases the cache hit ratio, while using more memory risks crashing the system on memory-restricted systems. Bitcoin Core includes a function called MallocUsage() to approximate the conversion of logical memory size to physical size. The memusage.h file includes many versions of the function DynamicUsage() that make use of MallocUsage(). This PR adds a new DynamicUsage() overload to calculate the overall coins cache size, which is called only from CCoinsViewCache::DynamicMemoryUsage(). In the master branch, the DynamicUsage() overload has many templated arguments. The DynamicUsage() overload worked by adding together various values in the master branch. In this PR, the DynamicUsage() calculation is moved and m.bucket_count() is no longer needed. The advantage of not referencing m.bucket_count() is that it eliminates an unnecessary calculation. The cachedCoinsUsage refers to the memory usage of the cached coins, and it is added to memusage::DynamicUsage(cacheCoins()) in CCoinsViewCache::DynamicMemoryUsage().

## #27625 Stop relaying non-mempool txs


Summary: The PR branch HEAD was faa2976a56ea7cdfd77ce2580a89ce493b57b5d4. The PR removes mapRelay and introduces m_most_recent_block_txs to keep track of only the transactions from the most recent block. The memory usage of mapRelay is hard to determine. The introduction of m_most_recent_block_txs solves a problem and is necessary. The memory requirements for m_most_recent_block_txs compared to mapRelay are not mentioned. Transactions may be available for a shorter or longer time depending on the change. One possible downside of removing mapRelay is not mentioned.

## #27711 Remove shutdown from kernel library


The PR branch HEAD at the time of the review club meeting was a6a3c3245303d05917c04460e71790e33241f3b5. The libbitcoinkernel project aims to separate Bitcoin Core's consensus engine from other non-consensus modules in the codebase. The review club meeting mentioned previous PRs related to libbitcoinkernel. PR #27636 introduced a new Notifications interface that allows node implementations to trigger specific behaviors for events. This PR #27711 adds two new notification methods, startShutdown and fatalError, to enable the necessary behavior for the consensus engine requiring a shutdown. It also moves the shutdown files and remaining usages of uiInterface out of the kernel code. The questions asked in the summary are: whether the PR was reviewed (Concept ACK, approach ACK, tested ACK, or NACK), why startShutdown exists in both kernel/notifications_interface.h and node/kernel_notifications.h, the role of fRequestShutdown in terminating long-running kernel functions, how the notification interface contributes to decoupling non-consensus code, the flow of startShutdown and fatalError notifications in the new setup, any potential race conditions or synchronization issues, and why KernelNotifications::m_shutdown_requested is a reference value and alternative approaches for triggering a shutdown.