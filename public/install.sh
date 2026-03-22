#!/usr/bin/env bash
#
# tarmac install script
# Usage: curl -fsSL https://tarmac.musicsian.com/install.sh | bash
#
# Installs tarmac and tarmacctl to /usr/local/bin.
# Optionally installs ers (window border renderer).

set -euo pipefail

REPO="gardesk/tarmac"
ERS_REPO="gardesk/ers"
INSTALL_DIR="/usr/local/bin"

info() { printf '\033[0;34m%s\033[0m\n' "$1"; }
warn() { printf '\033[0;33m%s\033[0m\n' "$1"; }
error() { printf '\033[0;31m%s\033[0m\n' "$1" >&2; exit 1; }

# Check platform
OS=$(uname -s)
ARCH=$(uname -m)

if [ "$OS" != "Darwin" ]; then
  error "tarmac only runs on macOS. Detected: $OS"
fi

case "$ARCH" in
  arm64|aarch64) ARCH_LABEL="aarch64-apple-darwin" ;;
  x86_64)        ARCH_LABEL="x86_64-apple-darwin" ;;
  *) error "Unsupported architecture: $ARCH" ;;
esac

info "tarmac installer"
info "  OS:   $OS"
info "  Arch: $ARCH ($ARCH_LABEL)"
echo ""

# Check for required tools
for cmd in curl tar; do
  if ! command -v "$cmd" &>/dev/null; then
    error "Required tool not found: $cmd"
  fi
done

# Get latest release tag
info "Fetching latest release..."
LATEST=$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$LATEST" ]; then
  error "Could not determine latest release. Check https://github.com/$REPO/releases"
fi

info "Latest release: $LATEST"

# Download and install tarmac
TARBALL_URL="https://github.com/$REPO/releases/download/$LATEST/tarmac-$LATEST-$ARCH_LABEL.tar.gz"

info "Downloading tarmac..."
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

if curl -fsSL "$TARBALL_URL" -o "$TMPDIR/tarmac.tar.gz"; then
  tar xzf "$TMPDIR/tarmac.tar.gz" -C "$TMPDIR"

  info "Installing to $INSTALL_DIR (may require sudo)..."
  if [ -w "$INSTALL_DIR" ]; then
    cp "$TMPDIR/tarmac" "$INSTALL_DIR/"
    cp "$TMPDIR/tarmacctl" "$INSTALL_DIR/" 2>/dev/null || true
  else
    sudo cp "$TMPDIR/tarmac" "$INSTALL_DIR/"
    sudo cp "$TMPDIR/tarmacctl" "$INSTALL_DIR/" 2>/dev/null || true
  fi
  sudo chmod +x "$INSTALL_DIR/tarmac" "$INSTALL_DIR/tarmacctl" 2>/dev/null || true

  info "tarmac installed to $INSTALL_DIR/tarmac"
else
  warn "Could not download pre-built binary."
  warn "You may need to build from source:"
  warn "  git clone https://github.com/$REPO.git"
  warn "  cd tarmac && cargo build --release"
  exit 1
fi

# Offer to install ers
echo ""
info "ers (window border renderer) is optional but recommended."
info "Install ers? [Y/n]"
read -r INSTALL_ERS </dev/tty 2>/dev/null || INSTALL_ERS="y"
INSTALL_ERS=${INSTALL_ERS:-y}

if [[ "$INSTALL_ERS" =~ ^[Yy] ]]; then
  ERS_LATEST=$(curl -fsSL "https://api.github.com/repos/$ERS_REPO/releases/latest" 2>/dev/null | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/' || echo "")

  if [ -n "$ERS_LATEST" ]; then
    ERS_URL="https://github.com/$ERS_REPO/releases/download/$ERS_LATEST/ers-$ERS_LATEST-$ARCH_LABEL.tar.gz"
    if curl -fsSL "$ERS_URL" -o "$TMPDIR/ers.tar.gz" 2>/dev/null; then
      tar xzf "$TMPDIR/ers.tar.gz" -C "$TMPDIR"
      if [ -w "$INSTALL_DIR" ]; then
        cp "$TMPDIR/ers" "$INSTALL_DIR/"
      else
        sudo cp "$TMPDIR/ers" "$INSTALL_DIR/"
      fi
      sudo chmod +x "$INSTALL_DIR/ers" 2>/dev/null || true
      info "ers installed to $INSTALL_DIR/ers"
    else
      warn "Could not download ers binary. Install manually:"
      warn "  brew tap gardesk/tap && brew install ers"
    fi
  else
    warn "Could not find ers releases. Install manually:"
    warn "  brew tap gardesk/tap && brew install ers"
  fi
fi

echo ""
info "Installation complete."
echo ""
echo "Next steps:"
echo "  1. Grant Accessibility permission to tarmac:"
echo "     System Settings → Privacy & Security → Accessibility"
echo "  2. Run tarmac:"
echo "     tarmac"
echo "  3. Read the docs:"
echo "     https://tarmac.musicsian.com/docs"
echo ""
