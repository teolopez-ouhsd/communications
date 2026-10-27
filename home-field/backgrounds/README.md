# Coaches Hub backgrounds

Drop photos into `originals/`. Delete a photo from `originals/` to retire it.
JPG, PNG or WebP, any size (landscape photos with the action off to one side look best).

## Automatic (recommended)
Commit and push the change to GitHub. The "Coaches Hub backgrounds" action
(`.github/workflows/home-field-backgrounds.yml`) builds the blurred black and white
versions and updates `manifest.json` and `manifest.js` for you. The live page picks them up within a
few minutes. Nothing else to edit.

## Manual
Run `python3 build-backgrounds.py` in this folder, then commit `dark/`, `light/`, `manifest.json` and `manifest.js`.

## How the page uses them
Each visit shuffles the photos. The top of the page never repeats the photo from your last visit,
and every section gets a different one. Sections load their photo only as you scroll near them.
`dark/` and `light/` are generated, do not edit them by hand.
