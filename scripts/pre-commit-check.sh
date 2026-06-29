#!/bin/bash

# Pre-commit workflow for Formatho website
# Ensures we check for upstream changes before committing

set -e

echo "🔄 Checking for upstream changes..."

# Fetch latest from remote
git fetch origin

# Check if there are any incoming commits
UPSTREAM=$(git rev-parse '@{u}')
LOCAL=$(git rev-parse HEAD)

if [ "$LOCAL" != "$UPSTREAM" ]; then
    echo "⚠️  WARNING: Your branch is behind the remote branch!"
    echo "   Please pull the latest changes before committing:"
    echo "   git pull origin main"
    echo ""
    echo "   If you want to continue anyway (not recommended):"
    echo "   git commit --no-verify -m \"your message\""
    exit 1
fi

echo "✅ Branch is up to date with remote"

# Continue with lint-staged (original pre-commit behavior)
echo "🔍 Running lint-staged..."
npx lint-staged