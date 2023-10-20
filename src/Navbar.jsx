import React from 'react'

const Navbar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccounts(accounts);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div>
            <div>About</div>
            <div>Mint</div>

            {isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )
            }
        </div>
    )

}

export default Navbar
