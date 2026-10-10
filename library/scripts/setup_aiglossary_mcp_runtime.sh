#!/bin/bash
set -euo pipefail
LIBRARY_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LIBRARY_VENV="$LIBRARY_ROOT/.runtime/venv"
LIBRARY_PYTHON="${PYTHON_BIN:-python3}"
"$LIBRARY_PYTHON" -c 'import sys; assert sys.version_info >= (3,10), "Python 3.10+ required"'
if [[ ! -d "$LIBRARY_VENV" ]]; then
  "$LIBRARY_PYTHON" -m venv "$LIBRARY_VENV"
fi
"$LIBRARY_VENV/bin/python" -c 'import sys; assert sys.version_info >= (3,10), "Existing runtime is too old; choose a supported runtime explicitly"'
"$LIBRARY_VENV/bin/python" -m pip install -r "$LIBRARY_ROOT/requirements-mcp.txt"
printf 'Runtime ready at %s/bin/python\n' "$LIBRARY_VENV"
