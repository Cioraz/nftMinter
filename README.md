# NFT-Minter

### Progress
- Managed to create a smart contract to create a new ERC721 NFT.
- Deployed the contract to the following address 0xD4eE5c000B55d28ea53CbE35840aC5F864D7Be13 on the ethereum sepolia testnet.


### Explanation of the contract
- Importing the necessary openzeppelin contract standards.
- Named the NFT chocoGolems where its inherited from the ERC721 standards
- Declared the necessary variables to ensure smooth going of the contract.
- Created a mapping, to map the address of the users to the number of NFT's minted by them to ensure each user has a set number of NFT's to mint.
- Gave the mintPrice as 0.05 ETH
- Total collection has 3000 NFT's
- Each User can have a max of 5 NFT's per wallet.

# Functions
## setPublicMintEnable
- This is to toggle the public minting of the NFT's

## setBaseURI
- This is to set the endpoint for our metadata here it will be out image hosted on platforms like IFPS.

## tokenURI
- Generates URI for metadata for the NFT
- If NFT doesnt exist, it combines base URL(base URI) and the NFT ID and a .json file extension to create the metadata URI
- This is used by external applications to display information about that NFT.


## withdraw
- This will withdraw the amount from the contract

## mint
- This is the main minting function
- It first checks if public minting is enabled
- Then ensures that NFT is not sold out
- It also requires that the User cant mint beyond his max number per wallet
- Also ensures that user has enough funds to mint
- Then it uses the _safeMint from the library to safely mint the required number of NFT's


### Stuff to do
- Dint manage to finish the frontend of the app.
- Could have optimised the smart contract
