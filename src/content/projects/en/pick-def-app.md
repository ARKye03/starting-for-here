---
title: "Pick Default App"
description: "A clean desktop tool to see and change which apps open different file types on Linux."
date: 2025-09-17
featured: false
tags: ["Rust", "GTK4", "Libadwaita", "Linux", "Desktop"]
github: "https://github.com/ARKye03/pick_def_app"
images: ["@assets/projects/pick-def-app.webp"]
lang: "en"
---

## Overview

Pick Default App lets you quickly look up any file type (MIME type) on your system and choose which installed application should open it. No terminal edits. No guessing. Just pick and apply.

## Core Features

- Modern GNOME-style interface (GTK4 + Libadwaita)
- Fast fuzzy search for MIME types and apps
- Shows all matching desktop applications
- One-click change of the default app
- Writes directly to your `~/.config/mimeapps.list`
- Live updates, changes are immediate

## How It Works

1. Scans installed `.desktop` files
2. Reads current associations
3. Lets you search and switch
4. Saves the new mapping for your session and other apps to respect

## Tech Stack

- Rust (2024 Edition)
- GTK4 + Libadwaita for UI
- freedesktop-desktop-entry for parsing
- fuzzy-matcher for fast search

## Why It Exists

Changing default apps on Linux can feel hidden or scattered across settings panels. This brings everything into one focused window.

## Future Ideas

- Recent / frequently changed types
- Dark mode tweaks
- Inline preview of desktop file metadata

## License

MIT License. See LICENSE in the repository.

## Note

Designed for Linux desktops that follow FreeDesktop standards and support MIME associations.
