---
name: tool-registry
description: Discover available tools with schemas, permissions, and verification status via the formatho.registry meta-tool
---

# Tool Registry

## Overview
List every registered Formatho tool with its JSON Schema, category, version, deterministic flag, permission declarations, and Formatho Verified checklist.

## Usage
Call the `formatho.registry` tool via MCP at `https://mcp.formatho.com/mcp`, or GET `https://mcp.formatho.com/api/tools` via REST.

Each tool entry includes:
- `name` — tool identifier (e.g., `evm.keccak256`)
- `version` — semantic version
- `category` — data, security, web3, defi, dev, network, meta
- `deterministic` — whether output is identical for identical input
- `permissions` — all false by construction (no network, filesystem, secrets, subprocess)
- `verified` — Formatho Verified checklist

## Authentication
See https://formatho.com/auth.md for API key registration.
