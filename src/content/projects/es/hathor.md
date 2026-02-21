---
title: "Hathor"
description: "Una interfaz de escritorio para FFmpeg — codifica, recorta, fusiona y normaliza sin memorizar un solo comando."
date: 2025-06-01
featured: true
tags: ["Tauri", "SvelteKit", "Rust", "Svelte 5", "FFmpeg", "Bun", "TypeScript"]
github: "https://github.com/ARKye03/hathor"
images: ["hathor/main.webp", "hathor/mainOneQueue.webp"]
lang: "es"
---

## Descripción del Proyecto

**Hathor** es una aplicación de escritorio nativa que envuelve FFmpeg en una interfaz limpia e intuitiva. Gestiona los flujos de trabajo más comunes de video y audio sin requerir conocimientos de línea de comandos.

Alertas inteligentes detectan incompatibilidades de códec/contenedor y sugieren remux cuando no es necesario recodificar. Los nombres de archivo de salida siguen plantillas configurables.

## Características Clave

- **Flujos de video**: codificar, recortar, transformar, fusionar, comprimir, remuxear
- **Flujos de audio**: extraer, reemplazar pista, normalizar volumen, controles de canal
- **Alertas inteligentes**: detecta incompatibilidades de códec/contenedor, sugiere remux
- **Plantillas de salida personalizables**: patrones de nombre de archivo configurables
- **Sin CLI requerida**: todo el poder de FFmpeg a través de una UI nativa

## Tecnologías Utilizadas

- **Shell**: Tauri v2 (backend en Rust, integración nativa con el SO)
- **Frontend**: SvelteKit en modo SPA con runas de Svelte 5
- **FFmpeg**: lanzado como proceso hijo desde Rust
- **Toolchain**: Bun para compilación del frontend

## Empezando

**Requisitos**: FFmpeg en `PATH`, Bun, toolchain de Rust.

```sh
bun tauri dev
```
