import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const { loginWithWallet } = useUser();

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      alert("MetaMask is not installed. Please install it to use PomVerse.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      setWalletAddress(address);
      loginWithWallet();
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  useEffect(() => {
    // Auto-detect wallet if already connected
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          loginWithWallet();
        }
      }
    };
    checkWallet();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "1rem", fontFamily: "'Orbitron', sans-serif", color: "#fff" }}>
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: "#1f8ef1",
            color: "#fff",
            padding: "0.8rem 1.5rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          🔗 Connect Wallet
        </button>
      ) : (
        <p>👛 Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
      )}
    </div>
  );
};

export default ConnectWallet;
