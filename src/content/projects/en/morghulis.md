---
title: "Morghulis Desktop Shell"
description: "A lightweight, hackable Wayland desktop shell that bridges minimal compositors like Hyprland and River with everyday desktop comforts."
date: 2024-06-24
featured: true
tags:
  [
    "Wayland",
    "Linux",
    "Desktop Shell",
    "Hyprland",
    "River",
    "Vala",
    "Open Source",
  ]
github: "https://github.com/ARKye03/morghulis"
images: ["morghulis.webp"]
lang: "en"
---

## What This Is (Plain Words)

Morghulis is a small brainy helper that gives you “desktop environment” feelings (panels, indicators, little quality-of-life bits) while you keep using lean Wayland compositors like **Hyprland** or **River**. Think: glue + polish, without turning your system into a heavy monster.

## Why It Exists

- Tiling compositors are awesome but spartan.
- Full desktop environments are comfy but often heavy or opinionated
- Morghulis tries to sit in the middle: light, modular, friendly to tinkerers.

## What You Get

- A shell layer: panels / bars / status info (depending on modules you enable)
- Trays / indicators potential (system info, workspaces, etc.)
- Sensible defaults without locking you in
- Plays nicely with Hyprland and River instead of replacing them

## Core Ideas

- Keep it light: only do what a compositor doesn’t.
- Make it scriptable / extensible.
- Stay out of your way (no giant config maze).
- Let advanced users dig in; let casual users just run it.

## Under the Hood (Soft Peek)

- Written mainly in **Vala** (which transpiles to C and hooks into GNOME/GTK style ecosystems).
- Talks Wayland.
- Modular structure so features can evolve without bloat.

## Typical Use Flow

1. You already use Hyprland or River.
2. You want a cleaner “desktop layer” (panels, little helpers).
3. You add Morghulis.
4. You feel less naked, still fast.

## Who Is It For?

- Linux rice enjoyers.
- People building a custom Wayland setup.
- Users who don’t want to run KDE/GNOME but still want niceties.
- Tinkerers who like reading source and adjusting things.

## Philosophy in 7 Words

Stay small. Add polish. Never own you.

## Early Taste (Imagined Examples)

- Workspace indicator
- Clock + system stats
- Quick launcher (future-friendly)
- Theming surface (colors/fonts you control)

## Future Possibilities

- Plugin marketplace style discovery
- More indicators (battery, media, notifications)
- Config hot-reload
- Simple theming packs

## Tech Stack (Simple)

- Language: Vala
- Protocol: Wayland
- Style: Lightweight, modular

## License

MIT — do cool things, share improvements.
