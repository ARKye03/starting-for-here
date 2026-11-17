---
title: "GBTracker"
description: "A native desktop app that shows every git-bug issue, task and epic across all your repositories in one window, built with Rust and iced."
date: 2026-11-17
featured: false
tags: ["Rust", "Iced", "Desktop App", "git-bug", "Developer Tools", "Tokio"]
github: "https://github.com/ARKye03/gbtracker"
images: ["@assets/projects/gbtracker/preview.webp"]
lang: "en"
---

## Project Overview

**GBTracker** is a desktop app for the issues that [git-bug](https://github.com/git-bug/git-bug) stores inside your repositories. Point it at your project folders and it lists every bug, task and epic across all of them in a single window.

It reads and writes through the `git-bug` CLI, so there is no separate database to keep in sync. Close an issue in GBTracker and `git bug` sees it closed.

## The Problem It Solves

git-bug keeps issues in git refs, which is great for ownership and offline work, but it scopes everything to one repo at a time. With a dozen projects, finding out what is open means running `git bug` in each of them.

**Workflow example:**

```bash
# Before: one repo at a time
cd ~/code/aella && git bug ls
cd ~/code/ferox && git bug ls

# After: one window, every repo
cargo run
```

## Key Features

- **Overview**: One card per repo with open epics, tasks and bugs, plus how many are in progress or blocked
- **Cross-Repo Issues**: Search, filters and an **Active work** view over every repository at once
- **Epics**: Child issues grouped under their epic with closed-out-of-total progress
- **New Issue**: Create a bug, task or epic, optionally under an existing epic
- **Check Done**: Finds open issues whose ID already appears in a `Refs:` commit trailer on the base branch, so shipped work can be closed. It never fetches, so a stale `origin/<base>` hides finished work but never invents it
- **Fast Reopen**: Issue lists are cached on disk and reloaded only when a repo's git-bug refs change
- **Folder Scanning**: Add a single project or a parent folder scanned four levels deep, skipping `node_modules` and `target`
- **Keyboard First**: `Cmd+K` search, `Cmd+N` new issue, `J`/`K` navigation and `X` to close or reopen

## Technologies Used

- **Language**: Rust (Edition 2024), with `unsafe_code` forbidden
- **GUI**: iced 0.14 with SVG, markdown and lazy widgets
- **Icons**: lucide-iced 0.4
- **Async Runtime**: Tokio, for driving the `git-bug` CLI
- **Storage**: `git-bug` refs as the source of truth, with an on-disk cache via `directories`
- **Packaging**: `cargo-bundle` for the macOS app bundle

## Label Conventions

GBTracker uses plain git-bug labels, the same convention as the roadmap plugin:

- **`kind:bug`, `kind:task`, `kind:epic`**: Issue type
- **`epic:<id>`**: Parent epic
- **`state:in-progress`, `state:blocked`**: Work state on an open issue

Check Done reads the base branch from `baseBranch` in `.claude/roadmap.json`, then falls back to `origin/HEAD`, then to the first of `main`, `trunk`, `master` or `develop` that exists.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ARKye03/gbtracker.git
cd gbtracker

# Requires git, git-bug and a Rust toolchain with edition 2024
cargo run

# Force dark mode for one run
GBTRACKER_THEME=dark cargo run

# Build the macOS app bundle
cargo install cargo-bundle
cargo bundle --release
```

## Results

- One view of every open issue across all my repositories
- No second source of truth: everything stays in git-bug and the CLI
- Quick startup even with many repos, thanks to ref-based cache invalidation
- Shipped work is easy to close, with Check Done matching `Refs:` trailers against the base branch
