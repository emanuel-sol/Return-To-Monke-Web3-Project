# Return to Monke Overview

I created Return to Monke to demonstrate my understanding of creating and deploying a Web3 project on Ethereum's Rinkeby Testnet.

# Interacting With the Application

To interact with the app simply go to this [link](https://waveportal-baseline-student.emanuelsolis.repl.co/), connect your MetaMask wallet (make sure it's on the Rinkeby network), and ensure that it has some test ETH.

Type a message in the message field and click the "Eat Banana" button to broadcast your message to the blockchain!

To view the contract on Etherscan go [here](https://rinkeby.etherscan.io/address/0xaAb7EF97810663aaAf99D64A59064517347c1816)

## Tools Used

- [Alchemy](https://www.alchemy.com/) (deployment)
- [Hardhat](https://hardhat.org/) (testing & deployment)
- [Metamask](https://metamask.io/) (testing)
- [Replit](https://replit.com/) (hosting frontend)
- [Rinkeby](https://rinkeby.etherscan.io/) (testing)

# Issues I Encountered During Development

The biggest issue I encountered during development so far was a permissions issue with Metamask that prevented my MetaMask wallet from updating its balance and being able to properly make transactions. My permissions were set to "This Can Read and Change Site" Data > "When You Click the Extension", instead of "This Can Read and Change Site" Data > "On All Sites"

Shout out to [Hasanza](https://github.com/hasanza) for helping me identify this issue

## Solution Explanation

From MetaMask's Support [page](https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-Started-With-MetaMask)

> Note:
> When adding MetaMask to your browser, you may ask why you’d have to approve an extension to “read and change all your data on the websites your visit”. Get ready, the answer is technical:

> In order to enable Dapps (Distributed Apps) to access the blockchain, MetaMask needs to inject a Web3 JavaScript object into each page. By doing so, it will not change the website, but merely allows it to access the network.

> If you are still not convinced, a good way to experiment and manage your browser is to sandbox your MetaMask, i.e. creating, say, a Chrome profile where MetaMask is only installed in browser with that profile. This way, you could browse with or without MetaMask at will."

# Future Development Plans

Right now the application doesn't include any incentivization mechanism to use the contract other than the random distribution of ether. In the future I'd like to gamify the application by adding a leaderboard that tracks the top users by bananas eaten, display a counter for total bananas eaten, flesh out a ranking system, and implement the ability for users to form clans.
