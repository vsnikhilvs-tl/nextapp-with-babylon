import { ReactElement, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

import contract from "../../public/contracts/NFTCollectible.json";
import Layout from "../../components/layout/layout";
import styles from "../../styles/Wallet.module.scss";

declare global {
    interface Window {
      ethereum: MetaMaskInpageProvider;
    }
  }

const contractAddress = "0xf195057034f55722E27497Fec4772d0B01D5c271";
const abi = contract.abi;

export default function Wallet() {

    const [currentAccount, setCurrentAccount] = useState(null);

  function handleAccountsChanged(accounts: any) {
    console.log(accounts);
    if (accounts.length !== 0) {
      setCurrentAccount(accounts[0]);
    } else setCurrentAccount(null);
  }

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Please connect Metamask Wallet");
      return;
    } else {
      console.log(ethereum);
      console.log("Wallet exists. Ready to go !");
    }
    const accounts: any = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an auth account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No auth account found");
    }
    ethereum.on("accountsChanged", handleAccountsChanged);
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install metamask");
    }
    try {
      const accounts: any = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const mintNftHandler = () => {};

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className={`${styles.ctaButton} ${styles.connectWalletButton}`}
      >
        Connect
      </button>
    );
  };

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className={`${styles.ctaButton} ${styles.mintNftButton}`}>
        Mint NFT
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
    return () => {
      const { ethereum } = window;
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

    return (
        <div className={styles.mainApp}>
          <h1>Connect to your Metamask wallet</h1>
          <div>{currentAccount ? mintNftButton() : connectWalletButton()}</div>
        </div>
      );
}

Wallet.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}
