#!/bin/bash

# Blog publishing workflow with upstream checks
# Usage: ./scripts/blog-publish-check.sh "Your commit message"

set -e

if [ -z "$1" ]; then
    echo "❌ Usage: $0 \"Your commit message\""
    exit 1
fi

COMMIT_MSG="$1"

echo "🚀 Starting blog publishing workflow..."

# Step 1: Check for upstream changes
echo "🔄 Checking for upstream changes..."
git fetch origin

UPSTREAM=$(git rev-parse '@{u}')
LOCAL=$(git rev-parse HEAD)

if [ "$LOCAL" != "$UPSTREAM" ]; then
    echo "⚠️  Branch is behind remote. Pulling latest changes..."
    git pull origin main --no-rebase
    echo "✅ Updated to latest remote changes"
fi

# Step 2: Add relevant files
echo "📝 Staging blog files..."
git add src/data/blogPosts.ts src/data/blogMetadata.ts public/images/blog/blog-*/

# Step 3: Check if there are changes to commit
if git diff --cached --quiet; then
    echo "❌ No changes to commit"
    exit 1
fi

# Step 4: Generate sitemap to verify blog post count
echo "🗺️  Generating sitemap..."
npm run generate-sitemap

# Step 5: Commit with message
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Step 6: Push to remote
echo "🚀 Pushing to remote..."
git push origin main

echo "✅ Blog post published successfully!"
echo "📱 Check live site: https://formatho.com/blog/$(git log -1 --pretty=format:'%s' | sed 's/.*: //' | sed 's/ /-/g' | sed 's/[A-Z]/\L&/g' | sed 's/[^a-z0-9-]//g')"