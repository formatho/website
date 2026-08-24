/**
 * EVM chain metadata for chain-specific tool landing pages.
 * Each entry powers a page at /evm-tools/:slug with pre-configured
 * RPC endpoints, chain facts, and curated tool listings.
 */
export interface EvmChain {
  slug: string
  name: string
  chainId: number
  nativeToken: string
  tokenSymbol: string
  rpc: string
  explorer: string
  explorerName: string
  type: 'L1' | 'L2'
  blurb: string
  gasNote: string
  popularTokens: Array<{ symbol: string; address: string; decimals: number }>
}

export const evmChains: EvmChain[] = [
  {
    slug: 'ethereum',
    name: 'Ethereum',
    chainId: 1,
    nativeToken: 'Ether',
    tokenSymbol: 'ETH',
    rpc: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
    explorerName: 'Etherscan',
    type: 'L1',
    blurb: 'The original smart contract platform. All EVM tools work natively — Keccak-256 hashing, contract interaction, address derivation, and ABI encoding use the same primitives Ethereum was built on.',
    gasNote: 'Gas priced in gwei (1 gwei = 0.000000001 ETH)',
    popularTokens: [
      { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 },
      { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },
      { symbol: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18 },
      { symbol: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18 },
    ],
  },
  {
    slug: 'arbitrum',
    name: 'Arbitrum',
    chainId: 42161,
    nativeToken: 'Ether',
    tokenSymbol: 'ETH',
    rpc: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    explorerName: 'Arbiscan',
    type: 'L2',
    blurb: 'The leading Optimistic Rollup by TVL. Same EVM toolchain as Ethereum with dramatically lower gas. Our Contract Reader, Vanity Address Generator, and ABI tools work identically on Arbitrum.',
    gasNote: 'Gas ~10-100x cheaper than Ethereum L1',
    popularTokens: [
      { symbol: 'USDC', address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6 },
      { symbol: 'ARB', address: '0x912CE59144191C1204E64559FE8253a0e49E6548', decimals: 18 },
      { symbol: 'WETH', address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', decimals: 18 },
    ],
  },
  {
    slug: 'base',
    name: 'Base',
    chainId: 8453,
    nativeToken: 'Ether',
    tokenSymbol: 'ETH',
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    explorerName: 'Basescan',
    type: 'L2',
    blurb: "Coinbase's OP Stack L2. Fast, cheap, and deeply integrated with Coinbase's user base. All our EVM tools — from the Contract Reader to the Keccak-256 hasher — work natively on Base.",
    gasNote: 'Gas ~100x cheaper than Ethereum L1',
    popularTokens: [
      { symbol: 'USDC', address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 },
      { symbol: 'DEGEN', address: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed', decimals: 18 },
      { symbol: 'WETH', address: '0x4200000000000000000000000000000000000006', decimals: 18 },
    ],
  },
  {
    slug: 'optimism',
    name: 'Optimism',
    chainId: 10,
    nativeToken: 'Ether',
    tokenSymbol: 'ETH',
    rpc: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    explorerName: 'Optimistic Etherscan',
    type: 'L2',
    blurb: 'The original Optimistic Rollup and home of the OP Stack. Our EVM tools handle Optimism contracts identically to Ethereum — same addresses, same ABI encoding, same Keccak-256 hashing.',
    gasNote: 'Gas ~20-100x cheaper than Ethereum L1',
    popularTokens: [
      { symbol: 'USDC', address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', decimals: 6 },
      { symbol: 'OP', address: '0x4200000000000000000000000000000000000042', decimals: 18 },
      { symbol: 'WETH', address: '0x4200000000000000000000000000000000000006', decimals: 18 },
    ],
  },
  {
    slug: 'polygon',
    name: 'Polygon PoS',
    chainId: 137,
    nativeToken: 'POL',
    tokenSymbol: 'POL',
    rpc: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
    explorerName: 'Polygonscan',
    type: 'L1',
    blurb: 'High-throughput sidechain with its own validator set. Polygon uses the same EVM instruction set and address format — every tool here works out of the box.',
    gasNote: 'Gas paid in POL (formerly MATIC)',
    popularTokens: [
      { symbol: 'USDC', address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', decimals: 6 },
      { symbol: 'WETH', address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', decimals: 18 },
      { symbol: 'USDT', address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6 },
    ],
  },
  {
    slug: 'bnb-chain',
    name: 'BNB Smart Chain',
    chainId: 56,
    nativeToken: 'BNB',
    tokenSymbol: 'BNB',
    rpc: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
    explorerName: 'BscScan',
    type: 'L1',
    blurb: 'High-performance EVM chain from Binance. BSC uses the same address derivation (secp256k1 + Keccak-256) and ABI encoding as Ethereum — all our tools are fully compatible.',
    gasNote: 'Gas paid in BNB, ~3-second block time',
    popularTokens: [
      { symbol: 'USDT', address: '0x55d398326f99059fF775485246999027B3197955', decimals: 18 },
      { symbol: 'USDC', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18 },
      { symbol: 'CAKE', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', decimals: 18 },
    ],
  },
  {
    slug: 'avalanche',
    name: 'Avalanche C-Chain',
    chainId: 43114,
    nativeToken: 'AVAX',
    tokenSymbol: 'AVAX',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://snowtrace.io',
    explorerName: 'Snowtrace',
    type: 'L1',
    blurb: 'The EVM-compatible Contract Chain of Avalanche. Fully EVM-equivalent — our Contract Reader, Vanity Address Generator, and all crypto tools work identically.',
    gasNote: 'Gas paid in AVAX, sub-second finality',
    popularTokens: [
      { symbol: 'USDC', address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', decimals: 6 },
      { symbol: 'WAVAX', address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', decimals: 18 },
      { symbol: 'JOE', address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0D80', decimals: 18 },
    ],
  },
  {
    slug: 'zksync',
    name: 'zkSync Era',
    chainId: 324,
    nativeToken: 'Ether',
    tokenSymbol: 'ETH',
    rpc: 'https://mainnet.era.zksync.io',
    explorer: 'https://explorer.zksync.io',
    explorerName: 'zkSync Explorer',
    type: 'L2',
    blurb: 'ZK Rollup with native account abstraction. Same address format and ABI encoding as Ethereum — all EVM tools are compatible.',
    gasNote: 'ZK-proven, cheapest gas among major L2s',
    popularTokens: [
      { symbol: 'USDC', address: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4', decimals: 6 },
      { symbol: 'WETH', address: '0x5AEa5775959fBC2557Cc8789bC1bD90A233D4aA3', decimals: 18 },
    ],
  },
  {
    slug: 'linea',
    name: 'Linea',
    chainId: 59144,
    nativeToken: 'Ether',
    tokenSymbol: 'ETH',
    rpc: 'https://rpc.linea.build',
    explorer: 'https://lineascan.build',
    explorerName: 'Lineascan',
    type: 'L2',
    blurb: 'Consensys ZK-EVM L2. Fully EVM-equivalent — all tools work with Linea contracts out of the box.',
    gasNote: 'ZK-proven, low gas fees',
    popularTokens: [
      { symbol: 'USDC', address: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff', decimals: 6 },
      { symbol: 'WETH', address: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f', decimals: 18 },
    ],
  },
  {
    slug: 'blast',
    name: 'Blast',
    chainId: 81457,
    nativeToken: 'Ether',
    tokenSymbol: 'ETH',
    rpc: 'https://rpc.blast.io',
    explorer: 'https://blastscan.io',
    explorerName: 'Blastscan',
    type: 'L2',
    blurb: 'Optimistic Rollup with native yield for ETH and stablecoins. Standard EVM — all tools compatible.',
    gasNote: 'Native yield on deposited ETH and USDB',
    popularTokens: [
      { symbol: 'USDB', address: '0x4300000000000000000000000000000000000003', decimals: 18 },
      { symbol: 'WETH', address: '0x4300000000000000000000000000000000000004', decimals: 18 },
      { symbol: 'BLAST', address: '0xb4449E48Ff2963A37975c39fDa493D9c8b839249', decimals: 18 },
    ],
  },
  {
    slug: 'mantle',
    name: 'Mantle',
    chainId: 5000,
    nativeToken: 'MNT',
    tokenSymbol: 'MNT',
    rpc: 'https://rpc.mantle.xyz',
    explorer: 'https://mantlescan.xyz',
    explorerName: 'Mantlescan',
    type: 'L2',
    blurb: 'Modular L2 with optimistic rollup architecture. EVM-compatible — tools work out of the box.',
    gasNote: 'Gas paid in MNT',
    popularTokens: [
      { symbol: 'USDC', address: '0x94923CDe329422a3b124Cf6f4632D238B8349143', decimals: 6 },
      { symbol: 'WETH', address: '0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111', decimals: 18 },
    ],
  },
  {
    slug: 'cronos',
    name: 'Cronos',
    chainId: 25,
    nativeToken: 'CRO',
    tokenSymbol: 'CRO',
    rpc: 'https://evm.cronos.org',
    explorer: 'https://cronoscan.com',
    explorerName: 'Cronoscan',
    type: 'L1',
    blurb: 'EVM chain from Crypto.com. Standard EVM compatibility — all tools work with Cronos contracts.',
    gasNote: 'Gas paid in CRO, ~6-second block time',
    popularTokens: [
      { symbol: 'USDC', address: '0xc21223249CA28397B4B6541dfFa8C6886dEA1a1A', decimals: 6 },
      { symbol: 'USDT', address: '0x66e428c3f545EF2E11Dfb9dFbb2b96Fbc06a11f7', decimals: 6 },
    ],
  },
]

export const evmChainTools = [
  { name: 'EVM Contract Reader', route: '/tools/contract-reader', desc: 'Call view functions on any contract via your own RPC' },
  { name: 'Vanity Address Generator', route: '/tools/vanity-eth', desc: 'Generate custom addresses — same key works on every EVM chain' },
  { name: 'Keccak-256 Hasher', route: '/tools/keccak256', desc: 'Hash with the exact algorithm used by the EVM' },
  { name: 'ABI Encoder & Decoder', route: '/tools/abi-encoder', desc: 'Encode calldata for contract interactions' },
  { name: 'EVM Unit Converter', route: '/tools/evm-converter', desc: 'Convert between wei, gwei, and the native token' },
  { name: 'Address Checksum (EIP-55)', route: '/tools/address-checksum', desc: 'Validate and checksum addresses to catch typos' },
  { name: 'Function Selector Calculator', route: '/tools/function-selector', desc: 'Compute 4-byte selectors for function signatures' },
  { name: 'Multi-Chain Wallet Generator', route: '/tools/multi-chain-keys', desc: 'Generate keys and addresses from one mnemonic' },
  { name: 'ENS Namehash Calculator', route: '/tools/ens-namehash', desc: 'Derive EIP-137 namehash values for ENS names' },
  { name: 'Solidity to Opcodes', route: '/tools/solidity-to-opcodes', desc: 'Compile Solidity and inspect the EVM assembly' },
]
