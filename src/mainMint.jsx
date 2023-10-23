import React from 'react'
import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import chocoGolemsNFT from './chocoGolemsNFT.json'
import dotenv from 'dotenv'
dotenv.config()

const chocoGolemsAddress = process.dotenv.CONTRACT_ADDRESS;

const mainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(chocoGolemsAddress, chocoGolemsNFT.abi, signer);
            try {
                const transaction = await contract.mint(BigNumber.from(mintAmount));
                console.log(transaction)
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div>
            <h1>chocoGolems</h1>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}></button>
                        <input type="text" value={mintAmount} />
                        <button onClick={handleIncrement}></button>
                    </div>
                    <button onClick={handleMint}>Mint Now!</button>
                </div>
            ) : (
                <p>You must be connected to Mint!</p>
            )}
        </div>
    )


}

export default mainMint
