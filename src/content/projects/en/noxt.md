---
title: "Noxt"
description: "A fast and modern note-taking application built with Next.js 16, featuring a responsive design and full Markdown support."
date: 2026-01-11
featured: false
tags:
  [
    "Next.js",
    "SQLite",
    "Bun",
    "shadcn/ui",
    "Tailwind CSS",
    "Prisma",
    "Lucia Auth",
    "Vitest",
    "Google OAuth",
  ]
github: "https://github.com/ARKye03/noxt"
images:
  [
    "@assets/projects/noxt/myNotes.webp",
    "@assets/projects/noxt/newNote.webp",
    "@assets/projects/noxt/rustNote.webp",
  ]
lang: "en"
---

## Project Overview

**Noxt** is a high-performance note-taking application built with the latest web technologies including Next.js 16 and React 19. It aims to provide a seamless writing experience with a live Markdown preview, fuzzy search capabilities, and Google OAuth integration for secure access.

The project was born out of a desire to explore the synergy between Next.js, shadcn/ui, and Prisma in a personal capacity. By choosing SQLite and Lucia Auth, the application remains lightweight yet powerful. The use of **Bun** as the runtime and **Tweakcn** for UI refinements adds a modern touch to the development workflow.

## Key Features

- **Google OAuth Integration**: Secure and easy authentication.
- **Markdown Editor**: Write in Markdown with a sleek, live preview mode.
- **Note Management**: Full CRUD operations for organizing your thoughts.
- **Fuzzy Search**: Quickly find notes using Fuse.js for efficient searching.
- **Keyboard Shortcuts**: Enhanced productivity for power users.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Framework**: Next.js 16 & React 19
- **Styling**: Tailwind 4 & shadcn/ui (with Tweakcn)
- **Language**: TypeScript
- **Database**: Prisma with SQLite
- **Runtime**: Bun
- **Testing**: Vitest

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ARKye03/noxt.git
   cd noxt
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Set up environment variables**:
   Follow this [guide](https://developers.google.com/identity/protocols/oauth2) to get Google OAuth credentials. Use `http://localhost:3000/login/google/callback` as the redirect URI.

   ```bash
   cp .env.example .env
   ```

4. **Set up the database**:

   ```bash
   bunx --bun prisma generate
   bunx --bun prisma migrate dev
   ```

5. **Run the development server**:

   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Results

- A fully functional, responsive note-taking application with real-time feedback.
- Seamless integration of Google OAuth for user authentication.
- High-performance search and editor features that rival commercial alternatives.
- A modern tech stack that demonstrates the efficiency of Bun and Next.js 16.
