// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

// importing the standards for minting the NFT
// Also making the NFT ownable
// public -- accessible from within the contract and can be accessed from external contracts as well
contract chocoGolemsNFT is ERC721, Ownable{
    uint256 public mintPrice; // price of minting the NFT
    uint256 public totalSupply; // total number of NFTs minted
    uint256 public maxSupply; // maximum number of NFTs that can be minted in collection
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled; // Owner must toggle for minting to enable
    string public baseURI; // base URI for the NFTs
    address payable public withdrawWallet; // wallet to which the minting funds will be transferred
    mapping(address=>uint256) public walletMint;// mapping to keep track of the number of NFTs minted by a wallet

    constructor() payable ERC721('chocoGolems','cG'){
        mintPrice = 0.05 ether;
        totalSupply = 0;
        maxSupply = 3000;
        maxPerWallet = 5;
    }
    // external  - can only be accessed from outside the contract

    function setPublicMintEnable(bool isPublicMintEnabled_) external onlyOwner{
        isPublicMintEnabled = isPublicMintEnabled_; // toggling the minting
    }

    function setBaseURI(string memory baseURI_) external onlyOwner{
        baseURI = baseURI_; // setting the base URI
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId_),".json"));
    }

    function withdraw() external onlyOwner{
        (bool success,) = withdrawWallet.call{value: address(this).balance}('');
        require(success, 'Withdrawal failed');
    }

    function mint(uint256 quantity_) public payable{
        require(isPublicMintEnabled, 'Public minting is not enabled');
        require(totalSupply + quantity_ <= maxSupply, 'Sold out');
        require(walletMint[msg.sender] + quantity_ <= maxPerWallet, 'Exceeds maximum per wallet');
        require(msg.value >= mintPrice * quantity_, 'Insufficient funds');
        for(uint256 i = 0; i < quantity_; i++){
            uint256 tokenId = totalSupply + 1;
            totalSupply += 1;
            _safeMint(msg.sender, tokenId);
        }
    }

}