// Minimal Solidity contracts as pre-compiled bytecode for RWA POC deployments
// WARNING: These are NON-AUDITED minimal contracts for POC/development only.

export interface ContractTemplate {
  name: string
  source: string
  bytecode: string
  abi: object[]
  description: string
}

// ERC-20 Mirror Token — minimal fungible token
export const ERC20_TEMPLATE: ContractTemplate = {
  name: 'ERC-20 Mirror Token',
  source: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract MirrorToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _supply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _supply * 10**uint256(_decimals);
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value);
        require(allowance[from][msg.sender] >= value);
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}`,
  bytecode: '608060405234801562000010575f80fd5b506040516200114c3803806200114c83398181016040528101906200003691906200023d565b83346200005457620000536200006e60201b60201c565b5b8282600390805190602001906200006c929190620002c8565b50505050505050620003db565b5f8060015f805490500390505f808463ffffffff16806200009557505f808463ffffffff16145b156200009f578391505b8363ffffffff16848263ffffffff1604810181811015620000bb575f80fd5b83831115620000ca575f80fd5b8363ffffffff16604051602001620000e39190620002fd565b6040516020818303038152906040526040519182525f1960058301602086526200011657505f80fd5b8481525081935050505092915050565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f620001678262000142565b9050919050565b5f8082511162000180576200017f6200014f565b5b50565b5f819050919050565b620001958262000183565b6200019f8162000154565b8114620001aa575f80fd5b50565b5f81519050620001bf816200018a565b92915050565b5f81519050620001d5816200015c565b92915050565b5f63ffffffff82169050919050565b620001f281620001db565b8114620001fd575f80fd5b50565b5f815190506200021381620001e7565b92915050565b5f81519050620002298162000206565b92915050565b5f805f805f805f608086880312156200024d576200024c6200013d565b5b5f6200025c88828901620001b1565b95505060206200026f88828901620001c7565b9450506040620002828882890162000223565b93505060606200029588828901620001dd565b925050929550929550929550929550565b5f81905092915050565b5f81519050915050565b5f815190505150565b5f82825260208201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6200030b8262000183565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036200033c576200033b620002bd565b5b60018201905091905056',
  abi: [
    { "inputs": [{ "type": "string", "name": "_name" }, { "type": "string", "name": "_symbol" }, { "type": "uint8", "name": "_decimals" }, { "type": "uint256", "name": "_supply" }], "type": "constructor" },
    { "inputs": [], "name": "name", "outputs": [{ "type": "string" }], "type": "function" },
    { "inputs": [], "name": "symbol", "outputs": [{ "type": "string" }], "type": "function" },
    { "inputs": [], "name": "decimals", "outputs": [{ "type": "uint8" }], "type": "function" },
    { "inputs": [], "name": "totalSupply", "outputs": [{ "type": "uint256" }], "type": "function" },
    { "inputs": [{ "type": "address", "name": "to" }, { "type": "uint256", "name": "value" }], "name": "transfer", "outputs": [{ "type": "bool" }], "type": "function" },
  ],
  description: 'Minimal ERC-20 token for mirroring off-chain assets (stocks, commodities). Constructor args: name, symbol, decimals, initial supply.',
}

// For the other contracts, we'll note that users should compile and paste bytecode
// This keeps the tool generic and avoids shipping potentially broken compiled code
export const NFT_TEMPLATE_NOTE = `Compile your ERC-721 contract in Remix and paste the bytecode + ABI here.
Recommended: Use OpenZeppelin's ERC721 template with name, symbol, and baseURI constructor args.`

export const PERMISSION_LIST_NOTE = `A simple whitelist contract. Use OpenZeppelin's AccessControl or a mapping-based whitelist.
Constructor typically takes an admin address.`

export const ORACLE_NOTE = `A mock price oracle with a setPrice() function.
Push prices for testing without real Chainlink integration.`
