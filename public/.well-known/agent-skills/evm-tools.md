---
name: evm-tools
description: Execute EVM and Web3 tools — keccak-256 hashing, function selectors, CREATE2 addresses, storage slots, calldata decoding, v4 hook permissions
---

# EVM Tools

## Overview
Compute Ethereum-specific values: hashes, selectors, addresses, storage slots. All operations are deterministic and run entirely in your browser or on your infrastructure via the Formatho Runtime MCP server.

## Usage
Connect via MCP at `https://mcp.formatho.com/mcp` and call:
- `evm.keccak256` — Keccak-256 hash (Ethereum flavor, not NIST SHA3)
- `evm.function_selector` — 4-byte function selector from signature
- `evm.create2_address` — deterministic CREATE2 address
- `evm.storage_slot` — Solidity storage slot computation
- `evm.decode_calldata` — selector match + argument decode
- `evm.v4_hook_permissions` — Uniswap v4 hook permission bits
- `evm.checksum_address` — EIP-55 checksum
- `evm.unit_convert` — wei/gwei/ether conversion

## Authentication
See https://formatho.com/auth.md for API key registration.
