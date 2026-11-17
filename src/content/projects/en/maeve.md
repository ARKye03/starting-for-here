---
title: "Maeve"
description: "A desktop app that compares Mercado Libre Uruguay and TEMU listings by true landed cost, then lets two Gemini models argue and pick the winner."
date: 2026-11-17
featured: false
tags: ["Rust", "Iced", "Python", "Gemini", "Web Scraping", "Desktop App", "Browser Extension"]
github: "https://github.com/ARKye03/maeve"
images: ["@assets/projects/maeve/preview.webp"]
lang: "en"
---

## Project Overview

**Maeve** compares product listings from Mercado Libre Uruguay and TEMU and tells you which one to buy. It reads each link and works out what the product really costs delivered in Uruguay: shipping, IVA or the simplified import regime, and the exchange rate.

Then Gemini argues for each product and a judge model picks the winner. Comparisons are saved on your computer, so nothing leaves it except the calls to Gemini.

## The Problem It Solves

A TEMU price and a Mercado Libre price are not comparable. One includes local shipping and tax, the other adds import fees, a customs regime and a dollar-to-peso conversion at checkout. The cheaper sticker is often the more expensive purchase.

**Workflow example:**

```bash
# Paste two links into the app, get a landed-cost verdict
cargo run --release
```

TEMU also tends to answer scrapers with a captcha. Maeve ships a browser extension that forwards the pages you open in your own browser, so the failed row fills in after you solve it once.

## Key Features

- **Landed Cost**: Shipping, IVA or the simplified import regime, and the exchange rate folded into one comparable price
- **Argue and Judge**: Gemini makes the case for each product, then a separate judge model picks the winner
- **Scraper Sidecar**: A Python process using Scrapling and its own Chromium build, driven over JSON lines
- **Browser Extension**: Works in Brave, Chrome, Edge and Firefox, and gets around TEMU captchas using your own session
- **Local History**: Comparisons are stored on your machine with Turso
- **Secure Key Storage**: The Gemini API key is validated against Gemini and kept in the macOS Keychain
- **Locked-Down Receiver**: Listens only on `127.0.0.1:47821` and rejects requests without the extension's header
- **Themes and Languages**: Every theme and language combination is covered by demo-data snapshots

## Technologies Used

- **Language**: Rust (Edition 2024) and Python 3.11+
- **GUI**: iced 0.14 with canvas and image support
- **Local Server**: axum 0.8, receiving pages from the extension
- **Database**: Turso 0.8 for saved comparisons
- **HTTP**: reqwest 0.13 with rustls
- **Scraper**: Scrapling, managed with `uv`
- **Secrets**: keyring, backed by the macOS Keychain
- **Testing**: wiremock for Gemini calls, pytest for the scraper
- **Packaging**: `cargo-bundle` for `.app` and `.deb`

## Browser Extension

The extension in `extension/` sends the product pages you open to Maeve, which fills in the failed row:

- **Chromium browsers**: Load `extension/` unpacked from `brave://extensions` or `chrome://extensions`
- **Firefox**: Load `extension/manifest.json` as a temporary add-on from `about:debugging`
- **Feedback**: The toolbar icon shows ✓ once Maeve has the page

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ARKye03/maeve.git
cd maeve

# Install the scraper sidecar (downloads Chromium on first use)
cd scraper && uv sync && cd ..

# Run the app, then paste a Gemini API key in Ajustes
cargo run --release

# Build the macOS app bundle
cargo install cargo-bundle
cargo bundle --release
```

## Results

- A clear buy decision based on delivered price, not sticker price
- Reliable TEMU data even when the scraper hits a captcha
- Private by design: local history, Keychain-stored key and a locked-down local receiver
- A Rust core with a Python sidecar, tested with `cargo test` and `pytest`
