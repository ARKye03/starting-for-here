---
title: "Hathor"
description: "A desktop GUI for FFmpeg, encode, trim, merge, and normalize without memorizing a single command."
date: 2025-06-01
featured: true
tags: ["Tauri", "SvelteKit", "Rust", "Svelte 5", "FFmpeg", "Bun", "TypeScript"]
github: "https://github.com/ARKye03/hathor"
images: ["hathor/main.webp", "hathor/mainOneQueue.webp"]
lang: "en"
---

## Project Overview

**Hathor** is a native desktop application that wraps FFmpeg in a clean, intuitive interface. It handles the most common video and audio workflows without requiring any command-line knowledge.

Smart warnings flag codec/container mismatches and suggest remux when re-encoding isn't needed. Output filenames follow customizable templates.

## Key Features

- **Video workflows**: encode, trim, transform, merge, compress, remux
- **Audio workflows**: extract, replace track, loudness normalize, volume/channel controls
- **Smart warnings**: detects codec/container mismatches, suggests remux over re-encode
- **Custom output templates**: configurable filename patterns
- **No CLI required**: full FFmpeg power through a native UI

## Technologies Used

- **Shell**: Tauri v2 (Rust backend, native OS integration)
- **Frontend**: SvelteKit in SPA mode with Svelte 5 runes
- **FFmpeg**: spawned as a child process from Rust
- **Toolchain**: Bun for frontend builds

## Getting Started

**Requirements**: FFmpeg in `PATH`, Bun, Rust toolchain.

```sh
bun tauri dev
```
