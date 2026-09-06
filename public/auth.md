# auth.md

Formatho Runtime — Agent Authentication & Registration

## Agent Audience

AI agents and MCP clients needing programmatic access to Formatho's developer, security, and EVM tools.

## Server

- **MCP Endpoint:** `https://mcp.formatho.com/mcp` (Streamable HTTP)
- **REST API:** `https://mcp.formatho.com/api/tools` (JSON)

## Registration

### Method: API Key (Bearer Token)

**Endpoint:** `mailto:support@formatho.com`

To register for the hosted tier:
1. Email [support@formatho.com](mailto:support@formatho.com) with subject "Agent Registration"
2. Include your agent name and required tool categories
3. Receive an API key mapped to your agent identity

To self-host (no registration needed):
```
docker run -d \
  -e FORMATHO_API_KEYS="your-key:your-agent-name" \
  -p 8787:8787 \
  formatho/formatho-runtime:latest \
  node dist/index.js --http
```

### Method: Anonymous (Rate-Limited)

**Endpoint:** `https://mcp.formatho.com/mcp`

No registration required. Rate limit: 30 requests/minute per IP, burst of 20.

## Credential Use

Include the API key in all requests:
```
Authorization: Bearer <your-api-key>
```

Keys map to agent identities with per-tool policy scope. Self-hosted deployments configure policies via `FORMATHO_POLICY_FILE` (see [policy.example.json](https://github.com/formatho/formatho-runtime/blob/main/policy.example.json)).

## Security

- Tools are pure functions with zero network, filesystem, or secret access
- Audit logs record metadata only (tool, agent, duration, sizes) — never payloads
- Self-hosted: all data stays inside your perimeter

## References

- [Runtime Documentation](https://github.com/formatho/formatho-runtime)
- [Privacy Commitments](https://formatho.com/runtime)
- [MCP Registry Entry](https://registry.modelcontextprotocol.io/v0/servers/com.formatho/runtime)
