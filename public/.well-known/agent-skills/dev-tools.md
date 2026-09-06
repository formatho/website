---
name: dev-tools
description: Execute developer tools — JSON formatting, Base64, URL encoding, hashing, JWT decode, regex testing, case conversion, timestamps
---

# Developer Tools

## Overview
General-purpose developer utilities: format, encode, decode, hash, and convert. All tools are pure functions with zero network access.

## Usage
Connect via MCP at `https://mcp.formatho.com/mcp` and call:
- `json.format` / `json.validate` / `json.minify`
- `base64.encode` / `base64.decode`
- `url.encode` / `url.decode`
- `hash.text` (md5, sha1, sha256, sha384, sha512)
- `jwt.decode`
- `regex.test`
- `case.convert`
- `timestamp.convert`
- `hex.encode`
- `slug.generate`

## Authentication
See https://formatho.com/auth.md for API key registration.
