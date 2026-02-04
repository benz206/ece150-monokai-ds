# ECE150 Catppuccin Mocha

Catppuccin Mocha theme for the ECE150 course pages. Adds a completion checkmark for finished modules/exercises and supports the ECE204 lecture materials page.

![Preview](https://i.imgur.com/msOjl4k.png)

![Preview](https://i.imgur.com/WAvsP61.png)

## Features
- Catppuccin Mocha styling for ECE150
- Completion checkmark for modules and exercises
- ECE204 lecture materials page support

## Installation (unpacked)
1. Download or clone the repository and unzip if needed.
2. Open `chrome://extensions` and enable Developer mode.
3. Click "Load unpacked" and select this folder.

## Publish to Chrome Web Store
1. Create a Chrome Web Store developer account.
2. Zip the **contents** of this folder (must include `manifest.json` at the root).
3. Go to the Developer Dashboard and upload the ZIP.
4. Fill out the listing (name, description, screenshots, icon).
5. Submit for review and publish.

## Permissions
Uses `activeTab` and `scripting` to apply styles on matching ECE course pages.

## Supported pages
- `https://ece.uwaterloo.ca/~ece150/*`
- `https://ece.uwaterloo.ca/~dwharder/nm/*`
