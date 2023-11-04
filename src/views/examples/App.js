import React, { useState, useEffect } from "react";
import Germoney from "./Germoney";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { ethers, Contract } from "ethers";
import contractDefintion from "../../contracts/Germoney.json";

const Web3 = require("web3");

const Injected = new InjectedConnector({
  supportedChainIds: [1, 369],
});

function App() {
  const [isConnected, setConnected] = useState(false);

  const web3Context = useWeb3React();

  useEffect(() => {
    async function connectWallet() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          });
        } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        }
        await web3Context.activate(Injected, undefined, true);
      }
      setConnected(true);
    }
    if (!isConnected) {
      connectWallet();
    }
  }, []);

  if (isConnected) {
    const web3 = new Web3.Web3(Web3.givenProvider);

    const signerOrProvider = web3Context.library
      ? web3Context.library.getSigner()
      : new ethers.providers.InfuraProvider();

    const contract = new Contract(
      "0x844Af22fBEC4D1bb9C062F33D29e4Ad8d0EFc01D",
      contractDefintion.abi,
      signerOrProvider
    );

    return (
      <Germoney
        contract={contract}
        account={web3Context.account}
        utils={web3.utils}
      />
    );
  }
  return "Connecting Wallet ...";
}

export default App;
