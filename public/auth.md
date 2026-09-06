# auth.md

Formatho Runtime — Agent Authentication & Registration

## Audience

AI agents and MCP clients that need programmatic access to Formatho's developer, security, and EVM tools via the MCP (Model Context Protocol) server or REST API.

## Server

- **MCP Endpoint:** `https://mcp.formatho.com/mcp` (Streamable HTTP)
- **REST API:** `https://mcp.formatho.com/api/tools` (JSON)
- **Protocol:** Model Context Protocol (MCP) 2024-11-05

## Authentication Methods

### API Key (Bearer Token)

All authenticated requests require an API key passed as a Bearer token:

```
Authorization: Bearer <your-api-key>
```

API keys map to named agent identities. Each identity can be scoped to specific tool categories via a policy file (wildcards supported: `evm.*`, `json.*`).

#### Registration

For the hosted tier at `mcp.formatho.com`:

1. Contact [support@formatho.com](mailto:support@formatho.com) to request an API key
2. Specify your agent name and required tool categories
3. You'll receive a key mapped to your agent identity

For self-hosted deployments (recommended for production):

1. Deploy the runtime: `docker run -d formatho/formatho-runtime:latest node dist/index.js --http`
2. Generate keys in `FORMATHO_API_KEYS="key:agent-name"` environment variable
3. Optionally scope tools via `FORMATHO_POLICY_FILE` (see [policy.example.json](https://github.com/formatho/formatho-runtime/blob/main/policy.example.json))

See [Self-Hosted Quickstart](https://github.com/formatho/formatho-runtime#quick-start) for full setup.

### Anonymous (Rate-Limited)

The hosted tier allows anonymous access with strict rate limits:
- 20 requests burst, 30 requests/minute per IP
- Full tool catalog available
- No registration required
- 429 responses include `Retry-After` header

## Credential Use

| Method | Header | Format | Scope |
|--------|--------|--------|-------|
| API Key | `Authorization` | `Bearer <key>` | Per-agent policy (tools, rate limits) |
| Anonymous | — | — | Rate-limited, all tools |

## Security Model

- Tools are **pure functions** with zero network, filesystem, or secret access
- Audit logs record tool name, agent identity, duration, and byte sizes — never payloads
- Per-agent policies enforce least-privilege tool access
- Self-hosted deployments keep all data inside your perimeter

## Token Lifecycle

API keys do not expire automatically. To rotate or revoke:

- **Hosted tier:** Contact support with your agent name
- **Self-hosted:** Update `FORMATHO_API_KEYS` and restart the container

## See Also

- [Formatho Runtime README](https://github.com/formatho/formatho-runtime)
- [Privacy Commitments](https://formatho.com/runtime#privacy-commitments-self-hosted-bundle)
- [MCP Registry Entry](https://registry.modelcontextprotocol.io/v0/servers/com.formatho/runtime)
