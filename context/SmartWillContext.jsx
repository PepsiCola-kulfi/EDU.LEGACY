"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ethers, formatEther } from "ethers";
import { CONTRACT_ADDRESS } from "../utils";
import CONTRACT_ABI from "@/abi";

const SmartWillContext = createContext();

export function SmartWillProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [balance, setBalance ] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [willData, setWillData] = useState(null);
  const [allWills, setAllWills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize provider and contract
  useEffect(() => {}, []);

  // Connect to MetaMask and retrieve account info (***** DONE *****)
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true);
        const providerInstance = new ethers.BrowserProvider(window.ethereum);

        const accounts = await providerInstance.send("eth_requestAccounts", []);
        const balance = await providerInstance.getBalance(accounts[0]);
        setBalance(formatEther(balance))

        setAccount(accounts[0]);

        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
        setError("Error connecting to wallet.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("MetaMask is required to use this app.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  }

  
// function to create normal will (***** DONE *****)
 async function createNormalWill(beneficiary, description, amount) {
  try {
    if(!account){
      return false;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const value = ethers.parseEther(amount);
    const tx = await contract.createNormalWill(beneficiary, description, { value });
    await tx.wait();
    return tx;


  } catch (error) {
    console.error("Error creating normal will :", error);
      return false; // If an error occurs, assume the will doesn't exist
  }
  
 }

 // function to get normal will by the address of the owner (***** DONE *****)
 async function getNormalWill(ownerAddress) {
  try {
    if(!account){
      return false;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const will = await contract.normalWills(ownerAddress);
      console.log("Normal Will Details:", will);
      return will;
  } catch (error) {
      console.error("Error fetching normal will:", error);
  }
}
// function to check will by the address   (***** DONE *****)
async function hasCreatedWill() {
  try {
    if (!account) {
      return false; // If no account is connected
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const result = await contract.hasNormalWill(account); // Call hasCreatedWill for the current account
    return result; // It will return true or false based on whether the will exists
  } catch (error) {
    console.error("Error checking if will exists:", error);
    return false; // If an error occurs, assume the will doesn't exist
  }
}


 //function to ping the smart contract to inform activity (***** DONE *****)
  async function ping() {
    try {
      if (!account) {
        return false; // If no account is connected
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
      const tx = await contract.ping(); // Call ping function
      await tx.wait();
      return tx;
    } catch (error) {
      console.error("Error pinging contract:", error);
      return false; // If an error occurs, assume the will doesn't exist
    }
  }

  //function to deposit more in normal will (***** DONE *****)

  async function depositNormalWill(amount){
    try {
      if (!account) {
        return false; // If no account is connected{
        
      } 
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const amountDeposited = ethers.parseEther(amount);
      const result = await contract.deposit({value: amountDeposited}); // Call deposit for the current account
      return result; // It will return true or false based on whether the will exists
    } catch (
      error
    ) {
      console.error("Error depositing to existsing will:", error);
      return false; // If an error occurs
    }
  }

  // functuon to create customized will 
  const createCustomizedWill = async (beneficiaries, releaseTimes, releasePercentages, descriptions) => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to create a will');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Convert ETH amount to Wei
      const amountInWei = ethers.parseEther(totalAmount);

      // Create the will
      const tx = await contract.createMilestoneWill(
        beneficiaries,
        releaseTimes,
        releasePercentages,
        descriptions,
        { value: amountInWei }
      );

      setLoading(true);
      await tx.wait();
      
    } catch (err) {
      setError(err.message || 'Error creating will');
    } finally {
      setLoading(false);
    }
  };


  const getWillDetails = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      // Replace this with the actual smart contract call
      const willDetails = await contract.getWillDetails(address);
      console.log(willDetails)
      return willDetails;
    } catch (error) {
      throw new Error('Failed to fetch will details');
    }
  };

  async function getBeneficiaryWills() {
    try {
      if (!account) return [];

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const wills = await contract.getBeneficiaryWills(account);
      return wills;
    } catch (error) {
      console.error("Error fetching beneficiary wills:", error);
      return [];
    }
  }

  // Function to claim a will (if the user is a beneficiary)
  async function claimWill(willId) {
    try {
      if (!account) return false;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.claimWill(willId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error claiming will:", error);
      return false;
    }
  }

  async function getAllWills() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const wills = await contract.getAllWills();
      return wills;
    } catch (error) {
      console.error("Error fetching all wills:", error);
      return [];
    }
  }

 
  
  

  const value = {
    connectWallet,
    account, balance,
    isConnected,
    
    createNormalWill, getNormalWill, ping, hasCreatedWill, getWillDetails,  depositNormalWill,
    createCustomizedWill,
    getBeneficiaryWills,  getAllWills, getWillDetails
  }; 

  return (
    <SmartWillContext.Provider value={value}>
      {children}
    </SmartWillContext.Provider>
  );
}

export const useSmartWill = () => {
  const context = useContext(SmartWillContext);
  if (!context) {
    throw new Error("useSmartWill must be used within a SmartWillProvider");
  }
  return context;
};