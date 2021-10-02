import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import contractABI from './utils/ReturnToMonke.json';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWoops, setAllWoops] = useState([]);
  const [message, setMessage] = useState('');

  const contractAddress = "0xaAb7EF97810663aaAf99D64A59064517347c1816";
  const _ABI = contractABI.abi;

  /*
   * Create a method that gets all woops from your contract
   */
  const getAllWoops = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const monkeContract = new ethers.Contract(contractAddress, _ABI, signer);

        const woops = await monkeContract.getAllWoops();

        let woopsCleaned = [];
        woops.forEach(woop => {
          woopsCleaned.push({
            address: woop.wooper,
            timestamp: new Date(woop.timestamp * 1000),
            message: woop.woop
          });
        });

        /*
         * Store our data in React State
         */
        setAllWoops(woopsCleaned);

        /**
         * Listen in for emitter events!
         */
        monkeContract.on("NewWoop", (from, timestamp, message) => {
          console.log("NewWoop", from, timestamp, message);

          setAllWoops(prevState => [...prevState, {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message: message
          }]);
        });
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getAllWoops();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }
  
  const eatBanana = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const monkeContract = new ethers.Contract(contractAddress, _ABI, signer);

        // getTotalMonkes never completes execution
        let count = await monkeContract.getTotalMonkes();
        console.log("Retrieved total monke count...", count.toNumber());

        const monkeTxn = await monkeContract.eatBanana(message, { gasLimit: 300000 });
        console.log("Mining...", monkeTxn.hash);

        await monkeTxn.wait();
        console.log("Mined -- ", monkeTxn.hash);

        count = await monkeContract.getTotalBananasEaten();
        console.log("Retrieved total bananas eaten...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        Return to Monke
        </div>

        <div className="bio">
        Connect your Ethereum wallet to eat bananas and return to monke. Eat the most bananas to become the GIGA KONG!!  
        </div>

        <input placeholder="Send a message to your fellow apes!" className="message-text-input" onChange={event => setMessage(event.target.value)} value={message}/>

        <button className="waveButton" onClick={eatBanana}>
          Eat Banana
        </button>
``
        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {allWoops.map((woop, index) => {
          return (
            <div className='displayWoops' key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div className='woopSubsection'>Address: {woop.address}</div>
              <div className='woopSubsection'>Time: {woop.timestamp.toString()}</div>
              <div className='woopSubsection'>Message: {woop.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}

export default App
