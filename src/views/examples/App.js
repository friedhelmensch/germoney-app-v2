import React, { useState, useEffect } from "react";
import Germoney from "./Germoney";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { abi } from "../../contracts/Germoney.json";

const Web3 = require("web3");

const Injected = new InjectedConnector({
  supportedChainIds: [369],
});

function App() {
  //console.log(abi);
  const [isConnected, setConnected] = useState(false);

  const web3 = useWeb3React();

  useEffect(() => {
    async function connectWallet() {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x171" }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "PulseChain",
                chainId: "0x171",
                nativeCurrency: { name: "PULSE", decimals: 18, symbol: "PLS" },
                rpcUrls: ["https://rpc.pulsechain.com"],
              },
            ],
          });
        }
      }

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x171" }],
      });

      await web3.activate(Injected, undefined, true);
      setConnected(true);
    }
    if (!isConnected) {
      connectWallet();
    }
  }, []);

  if (isConnected) {
    const contract = new Contract(
      "0x844Af22fBEC4D1bb9C062F33D29e4Ad8d0EFc01D",
      abi,
      web3.library.getSigner()
    );

    const utils = new Web3(Web3.givenProvider).utils;
    return (
      <Germoney contract={contract} account={web3.account} utils={utils} />
    );
  }
  return "Connecting Wallet ...";
}

export default App;
