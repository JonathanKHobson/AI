#!/bin/bash
set -euo pipefail
LIBRARY_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LIBRARY_PYTHON="${AIGLOSSARY_MCP_PYTHON:-$LIBRARY_ROOT/.runtime/venv/bin/python}"
if [[ ! -x "$LIBRARY_PYTHON" ]]; then
  echo "Runtime missing. Run scripts/setup_aiglossary_mcp_runtime.sh first." >&2
  exit 1
fi
exec "$LIBRARY_PYTHON" "$LIBRARY_ROOT/ai_glossary_mcp_server.py" --root "$LIBRARY_ROOT" "$@"
