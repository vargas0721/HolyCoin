"use client";
import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";
import humanity from '../humanity.png';
import covenant from '../covenant.png';



export default function Home() {
  const [walletKey, setwalletKey] = useState("");

  const [mintingAmount, setMintingAmount] = useState<number>(0);
  const [mintSubmitted, setMintSubmitted] = useState(false);
  const [balance, setBalance] = useState<number>(0);

  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [stakedAmount, setStakedAmount] = useState<number>(0);
  const [stakeSubmitted, setStakeSubmitted] = useState(false);

  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [elapsedStakeTime, setElapsedStakeTime] = useState<number>(0);
  const [withdrawSubmitted, setWithdrawSubmitted] = useState(false);

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setMintSubmitted(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setStakeSubmitted(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setWithdrawSubmitted(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window as any;

    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: [
            "https://sepolia-rollup.arbitrum.io/rpc",
            "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
          ],
          chainId: "0x66eee",
          chainName: "Arbitrum Sepolia",
        },
      ],
    });

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);

    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0x66eee",
        },
      ],
    });
  };

  return (
<main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100" style={{backgroundImage: "url('https://i.imgur.com/CtCVNc6.jpeg')", backgroundPosition: "center"}}>
<div className="max-w-max bg-gray-300 rounded-lg text-center p-4">
  <h1 className="text-3xl font-bold text-black">Absolution of Sins</h1>
</div>

<div className="mt-4">
  <button
    onClick={() => {
      connectWallet();
    }}
    className="bg-black text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    style={{ margin: "8px" }}
  >
    Connect Wallet
  </button>
</div>

<div className="flex mb-8">
  <div className="w-1/2 pr-1">
    <div className="bg-gray-300 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center mb-4">
      <div className="mb-4">
        <Image src={covenant} alt="" width={230} height={200} />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">Deepen Covenant(Mint)</h2>
      <input
        type="number"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        value={mintingAmount}
        onChange={(e) => mintAmountChange(e)}
        placeholder="Enter amount to mint"
        style={{ color: "black", width: "100%" }}
      />
      <button
        onClick={() => {
          mintCoin();
        }}
        className="bg-black text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Mint Tokens
      </button>
    </div>
  </div>
  <div className="w-1/2 pl-1">
    <div className="bg-gray-300 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center mb-4">
      <div className="mb-4">
        <Image src={humanity} alt="" width={180} height={200} />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">Return humanity (Stake)</h2>
      <input
        type="number"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        value={stakingAmount}
        onChange={(e) => stakeAmountChange(e)}
        placeholder="Enter amount to stake"
        style={{ color: "black", width: "100%" }}
      />
      <button
        onClick={() => {
          stakeCoin();
        }}
        className="bg-black text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Stake Tokens
      </button>
    </div>
  </div>
</div>

<div>
  <button
    onClick={() => {
      withdrawCoin();
    }}
    className="bg-black text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8"
  >
    Withdraw Tokens
  </button>
</div>
</main>
  );
}
