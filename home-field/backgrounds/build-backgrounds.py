#!/usr/bin/env python3
"""Turns the photos in backgrounds/originals/ into the blurred black and white
backgrounds the Coaches Hub uses, and writes backgrounds/manifest.json.

Add or remove photos in the originals folder, then run this (or let the
GitHub Action run it for you). Needs Pillow:  pip install pillow
"""
import json, re, sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

HERE = Path(__file__).resolve().parent
SRC, DARK, LIGHT = HERE / "originals", HERE / "dark", HERE / "light"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}
# (output width, blur, webp quality). Dark sections are sharper, light sections are softer.
DARK_SET, LIGHT_SET = (960, 4.3, 55), (480, 5.7, 50)

def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "image"

def render(path, out, width, sigma, quality):
    im = ImageOps.exif_transpose(Image.open(path)).convert("L")
    im = ImageEnhance.Contrast(im).enhance(1.12)
    im = im.resize((width, max(1, round(im.height * width / im.width))), Image.LANCZOS)
    im.filter(ImageFilter.GaussianBlur(sigma)).save(out, "WEBP", quality=quality, method=6)

def main():
    for d in (SRC, DARK, LIGHT):
        d.mkdir(exist_ok=True)
    names = {}
    for p in sorted(SRC.iterdir()):
        if p.suffix.lower() in EXTS:
            names[slug(p.stem)] = p
    for folder, cfg in ((DARK, DARK_SET), (LIGHT, LIGHT_SET)):
        for old in folder.glob("*.webp"):            # photo was removed: remove its background
            if old.stem not in names:
                old.unlink(); print("removed", folder.name, old.name)
        for n, p in names.items():
            out = folder / f"{n}.webp"
            if out.exists() and out.stat().st_mtime >= p.stat().st_mtime:
                continue                              # already up to date
            render(p, out, *cfg); print("built", folder.name, out.name)
    (HERE / "manifest.json").write_text(json.dumps({"images": sorted(names)}, indent=2) + "\n")
    # same list as a script, so the page also works when opened straight from a folder (file://)
    (HERE / "manifest.js").write_text("window.CH_BG=" + json.dumps(sorted(names)) + ";\n")
    print(f"{len(names)} photo(s) in manifest")
    if not names:
        sys.exit("No photos found in originals/. The page will show plain color backgrounds.")

if __name__ == "__main__":
    main()
