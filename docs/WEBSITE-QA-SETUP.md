# Website QA Agent Setup

## Overview

The website-qa agent handles QA development work for the formatho/website repository.

## Configuration

- **Agent ID:** website-qa
- **Workspace:** `/Users/studio/.openclaw/workspace-website-qa`
- **Slack Channel:** C0AJYVA1KHA
- **Deployment:** https://qa.formatho.com

## Usage

Mention `@website-qa` in Slack with your task:
```
@website-qa Create a new about page
```

## Workflow

1. Agent receives task
2. Creates Workboard card
3. Pulls latest code
4. Performs work
5. Runs lint + build
6. Commits to main
7. Pushes (triggers CI/CD)
8. Verifies deployment
9. Updates Workboard card
10. Reports to Slack

## Files

- Agent skill: `/Users/studio/.openclaw/agents/website-qa/agent/plugins/qa-website-workflow/`
- Pre-commit hook: `.husky/pre-commit`
- Deployment script: `scripts/verify-qa-deployment.js`
- Agent instructions: `AGENTS.md`

## Troubleshooting

**Agent not responding:**
- Check: `openclaw gateway status`
- Check: `openclaw logs 50`

**Build failing:**
- Run: `npm run build` manually
- Check: `npm run lint`

**Deployment failing:**
- Run: `node scripts/verify-qa-deployment.js`
- Check: CI/CD logs

## Maintenance

- Keep dependencies updated: `npm update`
- Check agent logs regularly
- Monitor Workboard for blocked cards
