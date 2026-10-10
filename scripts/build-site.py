#!/usr/bin/env python3
"""Package the maintained public snapshot without changing its corpus."""
from pathlib import Path
import shutil, subprocess
root = Path(__file__).resolve().parent.parent
out = root / "dist"
if out.exists(): shutil.rmtree(out)
out.mkdir()
for name in subprocess.check_output(["git", "ls-files"], cwd=root, text=True).splitlines():
    p = root / name
    if name.startswith((".git", ".openai/", "scripts/", "docs/")) or p.suffix == ".md": continue
    if not p.is_file(): continue
    dest = out / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(p, dest)
print(f"Packaged {len(list(out.rglob('*')))} files and directories")
