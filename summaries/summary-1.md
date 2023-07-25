
## bitcoin-dev


This seems to be a misspelling of the word "summarize." Here is a summarized response: "Please provide specific information or content you would like me to summarize."

## Full-RBF Peering Bitcoin Core v25.0 Released


Bitcoin Core version v25.0 is now available with Antoine Riard's full-rbf peering code, and some minor updates. This version adds two features for full-rbf nodes: it advertises a FULL_RBF service bit when mempoolfullrbf=1 is set, and connects to four additional FULL_RBF peers. The goal is to ensure reliable propagation of full-rbf replacements among a core group of nodes. While not necessary for everyone to run, it would be beneficial if more people did. More information and a blog post explaining the reasons for using full-rbf can be found on Peter Todd's website.

## Scaling and anonymizing Bitcoin at layer 1 with client-side validation


The LNP/BP Standards Association has proposed an upgrade to the Bitcoin protocol called Prime. This upgrade aims to create a scalable and fully anonymous layer 1, moving most validation work into a client-side validation system. The proposal does not require a softfork or miner upgrade and can be deployed without consensus or majority. It also renders Lightning Network and other layer 2 systems unnecessary. The Association plans to set up a working group to develop the formal specification and reference implementation of Prime. They are seeking non-profit donations for funding and offer membership to for-profit organizations interested in shaping future Bitcoin technologies.

## Standardisation of an unstructured taproot annex


Currently, the taproot annex is consensus valid but non-standard. Discussions about standardization are leaning towards a flexible Type-Length-Value (TLV) format, but agreeing on an exact format will take time. In the meantime, it is proposed to define any annex that begins with '0' as free-form, without constraints. This allows developers to immediately use the taproot annex without waiting for a structured format. It also provides future flexibility and potentially improves efficiency. This approach broadens the taproot annex's usability while allowing for a potential transition to a structured format in the future.

## Conceptual package relay using taproot annex


The writer proposes a workaround for getting low-fee transactions (A and B) to miners using a third transaction (C) that contains A and B. Transaction C pays sufficient fees and is sent to miners, who can detect A and B within it and submit them to their mempool as a transaction package. This package (A+B) replaces C and can be included in a block for mining. The writer acknowledges that not all miners may adopt this scheme and suggests modifying B and C if transaction C is mined.

## BIP for Silent Payments


This message is a proposal for a Silent Payments BIP (Bitcoin Improvement Proposal) that aims to address privacy concerns in Bitcoin transactions. The proposal suggests using a new address for each transaction to maintain privacy, but acknowledges that secure interaction between sender and receiver to obtain fresh addresses is often impractical. Instead, the proposal suggests using static payment addresses and blockchain notifications to eliminate the need for interaction. However, this approach has drawbacks, such as increased costs and the potential for metadata exposure. The Silent Payments BIP aims to eliminate these limitations by presenting a solution that eliminates the need for interaction, notifications, and protects both sender and receiver privacy. The proposal outlines the goals, the overview of the protocol, and various aspects of the implementation. It also mentions that light client support is an area of ongoing research. The proposal emphasizes properties like no increase in transaction size or cost, indistinguishable transactions, non-linkability of payments, no sender-receiver interaction, support for payment labeling, compatibility with other spending protocols, and light client support. The proposal provides an informal overview of the protocol, including examples on creating outputs, preventing address reuse, and using all inputs in a transaction. It also discusses the use of spend and scan keys, labels for differentiating payments, and labels for managing change outputs. Overall, the Silent Payments BIP aims to enhance privacy in Bitcoin transactions without compromising transaction efficiency and compatibility.

## lightning-dev


Could you please provide a specific text or information that needs to be summarized?

## Proposal: Bundled payments


The author is proposing an extension to BOLT-11, which is a protocol used in Bitcoin's Lightning Network, to allow invoices to contain two bundled payments with distinct preimages and amounts. This proposal is aimed at addressing the issue of services that require prepayment of mining fees for certain transactions, such as submarine swaps and JIT channels. The author argues that current solutions, such as Loop by Lightning Labs, are not practical for all service providers and can leave them vulnerable to DoS attacks. The proposal suggests bundling the prepayment and the main payment in the same invoice, with specific semantics for the receiver to wait for both payments before fulfilling the prepayment. The author believes this change would level the playing field for competition among lightning service providers and also benefit ACINQ in making their pay-to-open service non-custodian. The author advocates for implementing this change in BOLT-11 rather than introducing new protocols to keep the process non-interactive and less complicated.

## Bitcoin PR Review Club


Summary: The Bitcoin Core PR Review Club is a monthly club that meets in the #bitcoin-core-pr-reviews IRC channel on libera.chat. It is aimed at helping newer contributors learn about the Bitcoin Core codebase and review process. The club provides tools and knowledge needed to participate in the Bitcoin Core review process on GitHub. Anyone interested in contributing to Bitcoin Core is welcome to participate by showing up on IRC during the scheduled meetings. The club is run by various Bitcoin Core contributors and is always looking for interesting PRs to discuss and volunteer hosts to lead the discussions.

## #27307 Track mempool conflicts with wallet transactions


Summary: This PR in Bitcoin Core aims to address the confusion that can arise when funds briefly appear to "disappear" due to conflicting transactions in the mempool. It introduces a new transaction state for mempool-conflicted transactions and keeps track of conflicting transactions in a map called MempoolConflicts. This allows the wallet to treat mempool-conflicted transactions as conflicted instead of inactive. The PR also includes changes to the wallet_conflicts.py test script and modifies the wallet_abandonconflict.py script in a later commit.

## #27748 util: generalize accounting of system-allocated memory in pool resource


The PR branch HEAD is d25b54346fed931830cf3f538b96c5c346165487. This PR is a follow-on to PR 25325, which was reviewed on March 8 of this year. The -dbcache configuration option determines the amount of memory used for the coins cache and other database uses of memory. Using less memory than allowed decreases the cache hit ratio, while using more memory than specified risks causing the program to crash on memory-restricted systems. To accurately calculate the amount of memory used by the cache, it is important to consider the extra allocation metadata. Bitcoin Core includes a function called MallocUsage() to approximate this conversion. The memusage.h source file includes many overloads of the DynamicUsage() function, which all make use of MallocUsage(). The PR adds a new DynamicUsage() overload for the pool memory resource, specifically for computing the overall coins cache size. In the master branch, the DynamicUsage() overload has many templated arguments because it is generic and can be used with different data types. In this PR, the DynamicUsage() calculation is moved to CCoinsViewCache::DynamicMemoryUsage() and m.bucket_count() is no longer needed because the memory for the bucket allocation is already accounted for in the resource "chunks". The advantage of not referencing m.bucket_count() is that it reduces unnecessary calculations and simplifies the code. The cachedCoinsUsage is a variable that represents the memory usage of the cached coins, and it is added to memusage::DynamicUsage(cacheCoins()) in CCoinsViewCache::DynamicMemoryUsage().

## #27625 Stop relaying non-mempool txs


Summary: The PR branch is faa2976a56ea7cdfd77ce2580a89ce493b57b5d4. It removes mapRelay and introduces m_most_recent_block_txs to track transactions from the most recent block.

The mapRelay is a map that contains all transactions relayed to any peer recently. It is accompanied by g_relay_expiration, which is a sorted list of expiration times for mapRelay entries. Entries stay in mapRelay and g_relay_expiration for 15 minutes. When a peer requests a transaction that is no longer in the mempool, it can be served from mapRelay.

MapRelay has been present since the first GitHub commit, but its scope has been reduced over time. Bitcoin Core now tries to fetch transactions directly from the mempool, making mapRelay less essential. This PR removes mapRelay and introduces m_most_recent_block_txs to only track transactions from the most recent block.

The memory usage of mapRelay is hard to determine because it depends on the number of relayed transactions and their expiration times.

Introducing m_most_recent_block_txs solves the problem of tracking only the transactions from the most recent block. It allows for more efficient memory usage and eliminates the need for mapRelay. Yes, it is necessary to introduce it to improve the system.

The memory requirements for m_most_recent_block_txs are likely lower than those for mapRelay since it only tracks transactions from the most recent block. However, the exact comparison cannot be determined without more information.

As a result of this change, transactions may be available for a shorter time because mapRelay had a fixed expiration time of 15 minutes. With m_most_recent_block_txs, only the most recent block transactions are tracked.

Possible downsides of removing mapRelay could include losing the ability to serve transactions that are no longer in the mempool but still needed by peers. However, this PR likely addresses any downsides and improves efficiency.

## #27711 Remove shutdown from kernel library


The PR branch HEAD at the time of this review club meeting was a6a3c3245303d05917c04460e71790e33241f3b5. The libbitcoinkernel project aims to separate Bitcoin Core's consensus engine from other non-consensus modules in the codebase. PRs #25527, #24410, and #20158 have been previously covered in relation to libbitcoinkernel. PR #27636 introduced a kernel::Notifications interface that allows node implementations to trigger specific behavior for events. This PR #27711 adds two new notification methods, kernel::Notifications::startShutdown and kernel::Notifications::fatalError, for implementing necessary behavior related to the consensus engine requiring a shutdown. The PR also moves shutdown files and remaining usages of uiInterface out of the kernel code. The questions asked about the PR include the reviewer's approach, the presence of startShutdown in multiple files, the role of fRequestShutdown in terminating long-running kernel functions, the contribution of the notification interface to decoupling non-consensus code from libbitcoinkernel, the flow of startShutdown and fatalError notifications, potential race conditions or synchronization issues, and the nature of KernelNotifications::m_shutdown_requested.