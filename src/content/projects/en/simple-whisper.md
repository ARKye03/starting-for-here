---
title: "Simple Whisper"
description: "A desktop app that batch-transcribes video and audio to DOCX, Markdown, TXT, or PDF using Groq Whisper, Google Gemini, or fully offline local inference."
date: 2026-09-16
featured: false
tags: ["Rust", "Tauri", "SvelteKit", "Desktop App", "Whisper", "AI"]
github: "https://github.com/ARKye03/simple-whisper"
images: ["@assets/projects/simple-whisper/main.webp"]
lang: "en"
---

## Project Overview

**Simple Whisper** is a desktop app that turns media into clean text. Drop a queue of videos onto the window — or paste a link and let `yt-dlp` fetch the audio — then pick a provider, model, and language, and hit transcribe. Each item is processed by the chosen backend and exported to the format you need.

What sets it apart is the choice of three transcription providers behind one interface: Groq Whisper for fast pure ASR, Google Gemini for cheaper hourly rates with native speaker diarization, or a fully local `faster-whisper` runtime that needs no API key, no network, and no per-minute cost.

## The Problem It Solves

Transcribing a batch of recordings usually means picking one tool and living with its trade-offs: cloud APIs are fast but cost money and send audio off-device, while local models are private but fiddly to set up. Simple Whisper removes that trade-off by queuing multiple files and letting you switch providers per run, with local mode installing its own isolated Python environment on demand.

```bash
# Drop files, or paste a link
echo "https://example.com/video" # -> yt-dlp fetches audio, auto-added to queue
# Pick provider (Groq / Gemini / Local), format (DOCX/MD/TXT/PDF), hit transcribe
```

## Key Features

- **Three providers**: Groq Whisper (fast pure ASR), Google Gemini (cheaper hourly, native speaker diarization), or Local `faster-whisper` (no API key, no network, no cost)
- **Self-installing local mode**: no bundled Python runtime — Settings offers a one-click install into an isolated venv, pulling `faster-whisper` (~250 MB) plus the chosen Whisper model (75 MB–3 GB)
- **Speaker diarization**: the Gemini path labels turns as `Speaker A/B/C…`, rendered as bold paragraph prefixes in DOCX/MD
- **Multi-file queue**: sequential processing with per-file status, progress, and inline preview
- **Four output formats**: DOCX, Markdown, TXT, and PDF (Latin-1 only)
- **Auto-chunking**: files over a provider's per-request cap are split with FFmpeg and stitched back together (24 MB/90 min for Groq, 14 MB/30 min for Gemini)
- **Transcribe from a link**: paste, type, or drop a URL and `yt-dlp` downloads just the audio, with live progress and playlist expansion
- **Native drag-and-drop**: OS-level file paths via Tauri's webview event, not browser-only
- **Per-provider key storage**: separate macOS Keychain entries for each provider, with an encrypted plugin-store fallback for unsigned dev builds

## Technologies Used

- **Language**: Rust (backend), TypeScript/Svelte (frontend)
- **Frontend**: SvelteKit + Svelte 5 runes, static adapter
- **Desktop Shell**: Tauri 2 (`tauri`, `tauri-plugin-dialog`, `tauri-plugin-store`, `tauri-plugin-opener`)
- **Transcription**: Groq hosted Whisper, Google Gemini, or local `faster-whisper` (CTranslate2)
- **HTTP**: `reqwest` (rustls, multipart for Groq, JSON+base64 for Gemini)
- **Export**: `docx-rs`, `printpdf` 0.7, plain `std::fs` for TXT/MD
- **Secrets**: `keyring` 3.x (macOS Security framework backend), one entry per provider
- **Async Runtime**: Tokio

## Architecture

Each provider follows its own pipeline once audio is extracted with FFmpeg (16 kHz mono, 32 kbps):

- **Groq**: chunk if over 24 MB, POST each chunk to `audio/transcriptions`, join transcripts as plain text
- **Gemini**: chunk if over 14 MB, base64-inline into `generateContent` requests, with a `response_schema` when diarization is on
- **Local**: no chunking — a ~250-line embedded Python script streams NDJSON progress (stage/download/info/segment/done) over stdout, driving a real progress bar with no request cap

All FFmpeg, `yt-dlp`, and Python calls go through `tokio::process::Command` directly, with no shell-plugin dependency.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ARKye03/simple-whisper.git
cd simple-whisper

# Install dependencies
pnpm install

# Run in dev mode
pnpm tauri dev

# Build a release bundle
pnpm tauri build
```

## Results

- A working desktop transcription tool with three interchangeable backends behind one queue
- Local mode gives fully offline, zero-cost transcription with no telemetry
- Auto-chunking makes large files transparent to cloud providers with strict request caps
- Native OS drag-and-drop and link-based transcription remove manual audio extraction steps
- Per-provider secret isolation via the OS keychain, with a safe fallback for unsigned builds
