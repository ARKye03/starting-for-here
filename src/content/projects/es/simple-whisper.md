---
title: "Simple Whisper"
description: "Una app de escritorio que transcribe video y audio por lotes a DOCX, Markdown, TXT o PDF usando Groq Whisper, Google Gemini, o inferencia local completamente offline."
date: 2026-09-16
featured: false
tags: ["Rust", "Tauri", "SvelteKit", "App de Escritorio", "Whisper", "IA"]
github: "https://github.com/ARKye03/simple-whisper"
images: ["@assets/projects/simple-whisper/main.webp"]
lang: "es"
---

## Descripción del Proyecto

**Simple Whisper** es una app de escritorio que convierte medios en texto limpio. Arrastra una cola de videos a la ventana — o pega un link y deja que `yt-dlp` descargue el audio — luego elige proveedor, modelo e idioma, y transcribe. Cada elemento se procesa con el backend elegido y se exporta al formato que necesites.

Lo que la distingue es la elección entre tres proveedores de transcripción detrás de una sola interfaz: Groq Whisper para ASR puro y rápido, Google Gemini con tarifas por hora más baratas y diarización de hablantes nativa, o un runtime local `faster-whisper` completamente offline que no necesita clave de API, red, ni costo por minuto.

## El Problema que Resuelve

Transcribir un lote de grabaciones usualmente implica elegir una sola herramienta y vivir con sus compromisos: las APIs en la nube son rápidas pero cuestan dinero y envían el audio fuera del dispositivo, mientras que los modelos locales son privados pero complicados de configurar. Simple Whisper elimina ese compromiso permitiendo encolar múltiples archivos y cambiar de proveedor por corrida, con el modo local instalando su propio entorno de Python aislado bajo demanda.

```bash
# Suelta archivos, o pega un link
echo "https://example.com/video" # -> yt-dlp obtiene el audio, se agrega a la cola
# Elige proveedor (Groq / Gemini / Local), formato (DOCX/MD/TXT/PDF), transcribe
```

## Características Clave

- **Tres proveedores**: Groq Whisper (ASR puro y rápido), Google Gemini (más barato por hora, diarización de hablantes nativa), o Local `faster-whisper` (sin clave de API, sin red, sin costo)
- **Modo local autoinstalable**: sin runtime de Python incluido — Ajustes ofrece una instalación de un clic en un venv aislado, descargando `faster-whisper` (~250 MB) más el modelo Whisper elegido (75 MB–3 GB)
- **Diarización de hablantes**: la ruta de Gemini etiqueta los turnos como `Hablante A/B/C…`, renderizados como prefijos en negrita en DOCX/MD
- **Cola multi-archivo**: procesamiento secuencial con estado, progreso y vista previa por archivo
- **Cuatro formatos de salida**: DOCX, Markdown, TXT y PDF (solo Latin-1)
- **Auto-fragmentación**: archivos que superan el límite por solicitud de un proveedor se dividen con FFmpeg y se reensamblan (24 MB/90 min para Groq, 14 MB/30 min para Gemini)
- **Transcribir desde un link**: pega, escribe o suelta una URL y `yt-dlp` descarga solo el audio, con progreso en vivo y expansión de playlists
- **Arrastrar y soltar nativo**: rutas de archivo a nivel de sistema operativo vía el evento webview de Tauri, no solo del navegador
- **Almacenamiento de claves por proveedor**: entradas separadas en el Keychain de macOS para cada proveedor, con respaldo cifrado en plugin-store para builds de desarrollo sin firmar

## Tecnologías Utilizadas

- **Lenguaje**: Rust (backend), TypeScript/Svelte (frontend)
- **Frontend**: SvelteKit + Svelte 5 runes, adaptador estático
- **Shell de Escritorio**: Tauri 2 (`tauri`, `tauri-plugin-dialog`, `tauri-plugin-store`, `tauri-plugin-opener`)
- **Transcripción**: Groq Whisper alojado, Google Gemini, o `faster-whisper` local (CTranslate2)
- **HTTP**: `reqwest` (rustls, multipart para Groq, JSON+base64 para Gemini)
- **Exportación**: `docx-rs`, `printpdf` 0.7, `std::fs` plano para TXT/MD
- **Secretos**: `keyring` 3.x (backend del framework Security de macOS), una entrada por proveedor
- **Runtime Asíncrono**: Tokio

## Arquitectura

Cada proveedor sigue su propia canalización una vez extraído el audio con FFmpeg (16 kHz mono, 32 kbps):

- **Groq**: fragmenta si supera 24 MB, envía cada fragmento por POST a `audio/transcriptions`, une las transcripciones como texto plano
- **Gemini**: fragmenta si supera 14 MB, incluye base64 en línea en solicitudes a `generateContent`, con un `response_schema` cuando la diarización está activa
- **Local**: sin fragmentación — un script de Python embebido de ~250 líneas transmite progreso NDJSON (stage/download/info/segment/done) por stdout, alimentando una barra de progreso real sin límite de solicitud

Todas las llamadas a FFmpeg, `yt-dlp` y Python pasan directamente por `tokio::process::Command`, sin dependencia de plugin de shell.

## Empezando

```bash
# Clonar el repositorio
git clone https://github.com/ARKye03/simple-whisper.git
cd simple-whisper

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm tauri dev

# Construir un bundle de release
pnpm tauri build
```

## Resultados

- Una herramienta de transcripción de escritorio funcional con tres backends intercambiables detrás de una sola cola
- El modo local ofrece transcripción totalmente offline, sin costo y sin telemetría
- La auto-fragmentación hace transparentes los archivos grandes ante proveedores en la nube con límites estrictos de solicitud
- El arrastrar y soltar nativo del sistema y la transcripción desde links eliminan pasos manuales de extracción de audio
- Aislamiento de secretos por proveedor vía el keychain del sistema operativo, con respaldo seguro para builds sin firmar
