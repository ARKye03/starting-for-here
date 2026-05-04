---
title: "Wawkoss"
description: "A modern SoundCloud API wrapper and music streaming interface built with Astro 5, featuring full OAuth 2.1 authentication, server-side actions, and seamless view transitions for an app-like experience."
date: 2026-01-05
featured: true
tags: ["Astro", "AlpineJS", "TailwindCSS", "DaisyUI", "OAuth", "SoundCloud"]
github: "https://github.com/ARKye03/wawkoss"
images:
  [
    "@assets/projects/wawkoss/wawkossRoot.webp",
    "@assets/projects/wawkoss/wawkossSearch.webp",
    "@assets/projects/wawkoss/artistPage.webp",
    "@assets/projects/wawkoss/trackPage.webp",
    "@assets/projects/wawkoss/profilePage.webp",
  ]
lang: "en"
---

## Project Overview

**Wawkoss** is a modern SoundCloud API wrapper and music streaming interface that brings the power of SoundCloud to a clean, performant web application. Built with Astro 5 (the best framework to date, by the way), it combines server-side security with client-side smoothness for an authentic music streaming experience.

The name? It's from the iconic line: **W**hat **A**re **W**e? some **K**ind **O**f **S**uicide **S**quad?, because every side project needs a memorable backstory.

This project serves as a foundation for a future desktop application (ideally a LibAdwaita app), proving that modern web technologies can deliver desktop-quality experiences.

## Key Features

- **Full OAuth 2.1 Authentication**: Complete SoundCloud authentication flow with secure token management
- **Server-Side Security**: All data fetching and mutations handled via Astro Server Actions
- **Seamless Navigation**: View Transitions create an app-like, SPA-style experience
- **Lightweight Interactivity**: AlpineJS provides reactive UI without heavy JavaScript frameworks
- **Modern Design**: Crafted with TailwindCSS v4 and DaisyUI for a polished, accessible interface
- **Type-Safe**: Built with TypeScript in strict mode for robust, maintainable code
- **Quality Assured**: Git pre-push hooks automatically check, format, and lint before deployment

## Technologies Used

- **Framework**: Astro 5.17.1 with SSR and View Transitions
- **Language**: TypeScript 5.9.3 (Strict Mode)
- **Styling**: TailwindCSS v4.1.18 + DaisyUI 5.5.14
- **Interactivity**: AlpineJS 3.15.6 for reactive components
- **API Integration**: SoundCloud API v2 with OAuth 2.1
- **Code Quality**: ESLint 9.39.2, Prettier 3.8.1 with Astro plugin
- **Package Manager**: pnpm for fast, efficient installs

## Architecture Highlights

### Server Actions Pattern

All API interactions are handled server-side for maximum security:

```typescript
// No API keys exposed to client
// Token management stays on server
// Mutations validated before execution
```

This approach ensures:

- SoundCloud credentials never reach the browser
- User tokens are managed securely with HTTP-only cookies
- Data validation happens server-side before mutations
- Reduced client-side bundle size

### View Transitions

Astro's View Transitions create smooth, SPA-like navigation:

- No full page reloads between routes
- Shared elements animate seamlessly
- Instant perceived performance
- Progressive enhancement, works without JavaScript

### AlpineJS Integration

Strategic use of AlpineJS for interactive components:

- Audio player controls with state management
- Search filtering and autocomplete
- Modal dialogs and dropdown menus
- Minimal JavaScript footprint compared to React/Vue

## Features Implemented

### Music Streaming

- Browse tracks, artists, and playlists
- Play tracks with custom audio player
- Search across the entire SoundCloud library
- View detailed artist and track pages

### User Experience

- Responsive design works on all devices
- Dark mode with DaisyUI theming
- Keyboard shortcuts for power users
- Loading states and error handling
- Optimistic UI updates

### Authentication Flow

- OAuth 2.1 redirect flow
- Secure token storage
- Session management
- Protected routes and actions

## Getting Started

```bash
# Clone and install
git clone https://github.com/ARKye03/wawkoss.git
cd wawkoss
pnpm install

# Configure SoundCloud API credentials
# Create .env with:
# SOUNDCLOUD_CLIENT_ID=your_client_id
# SOUNDCLOUD_CLIENT_SECRET=your_client_secret
# SOUNDCLOUD_REDIRECT_URI=http://localhost:4321/api/auth/callback

# Run development server
pnpm dev

# Production build
pnpm build
pnpm preview
```

## Development Workflow

Quality is enforced automatically:

```bash
pnpm check   # TypeScript type checking
pnpm lint    # ESLint validation
pnpm fmt     # Prettier formatting
```

Git pre-push hooks run all checks before pushing to ensure code quality and consistency across the codebase.

## Future Vision

This web application serves as a proof-of-concept for a native desktop app, likely built with LibAdwaita for GNOME integration. The architecture demonstrates that modern web technologies (Astro, Alpine, Tailwind) can deliver desktop-quality experiences without the complexity of Electron.

## Results

- A fully functional SoundCloud client with secure authentication
- Server-side architecture that protects API credentials
- Smooth, app-like navigation with View Transitions
- Lightweight client-side code (AlpineJS) for excellent performance
- Type-safe codebase with automated quality checks
- Foundation for future desktop application development
