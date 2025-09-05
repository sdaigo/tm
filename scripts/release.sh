#!/usr/bin/env bash

# Release script for creating and pushing version tags
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if version argument is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Version number required${NC}"
    echo "Usage: ./scripts/release.sh <version>"
    echo "Example: ./scripts/release.sh 1.0.0"
    exit 1
fi

VERSION=$1

# Validate version format (basic semver check)
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9\.\-]+)?(\+[a-zA-Z0-9\.\-]+)?$ ]]; then
    echo -e "${RED}Error: Invalid version format${NC}"
    echo "Please use semantic versioning (e.g., 1.0.0, 1.0.0-beta.1)"
    exit 1
fi

TAG="v$VERSION"

# Check if tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
    echo -e "${RED}Error: Tag $TAG already exists${NC}"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
    read -p "Do you want to continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Release cancelled"
        exit 1
    fi
fi

# Run tests before release
echo -e "${GREEN}Running tests...${NC}"
bun test

echo -e "${GREEN}Running type check...${NC}"
bun run typecheck

echo -e "${GREEN}Running linter...${NC}"
bun run check

# Create and push tag
echo -e "${GREEN}Creating tag $TAG...${NC}"
git tag -a "$TAG" -m "Release version $VERSION"

echo -e "${GREEN}Pushing tag to origin...${NC}"
git push origin "$TAG"

echo -e "${GREEN}✅ Release $VERSION initiated!${NC}"
echo ""
echo "GitHub Actions will now:"
echo "1. Build binaries for all platforms"
echo "2. Create a GitHub release with artifacts"
echo ""
echo "Monitor progress at: https://github.com/<your-username>/tm/actions"
