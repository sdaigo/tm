# tm

[![CI](https://github.com/sdaigo/tm/actions/workflows/ci.yml/badge.svg)](https://github.com/sdaigo/tm/actions/workflows/ci.yml)
[![Release](https://github.com/sdaigo/tm/actions/workflows/release.yml/badge.svg)](https://github.com/sdaigo/tm/actions/workflows/release.yml)

A tiny terminal timer built with @opentui/react and Redux Toolkit, compiled to a single executable with Bun.

## Installation

### Download Pre-built Binary

Download the latest release for your platform from the [releases page](https://github.com/sdaigo/tm/releases).

```bash
# macOS (Apple Silicon)
curl -L https://github.com/sdaigo/tm/releases/latest/download/tm-darwin-arm64 -o tm
chmod +x tm
./tm

# Linux
curl -L https://github.com/sdaigo/tm/releases/latest/download/tm-linux-x64 -o tm
chmod +x tm
./tm
```

### Build from Source

```bash
# Clone the repository
git clone https://github.com/sdaigo/tm.git
cd tm

# Install dependencies
bun install

# Run in development mode
bun run dev

# Build executable
bun run compile
./dist/tm
```

## Usage

```bash
tm  # Start the timer
```

### Keyboard Controls

- **ESC**: Quit application
- **S**: Start timer
- **P**: Pause timer
- **R**: Resume timer
- **X**: Stop/Reset timer

## Development

```bash
bun install          # Install dependencies
bun run dev          # Run with watch mode
bun test             # Run tests
bun run typecheck    # Type checking
bun run check        # Lint check
bun run format       # Format code
```

## Release

```bash
bun run release 1.0.0  # Create and push a new release tag
```

GitHub Actions will automatically build binaries for all platforms and create a release.

## License

MIT
