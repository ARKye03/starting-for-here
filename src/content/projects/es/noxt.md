---
title: "Noxt"
description: "Una aplicación de toma de notas rápida y moderna construida con Next.js 16, con diseño responsive y soporte completo para Markdown."
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
lang: "es"
---

## Descripción del Proyecto

**Noxt** es una aplicación de toma de notas de alto rendimiento construida con las últimas tecnologías web, incluyendo Next.js 16 y React 19. Su objetivo es proporcionar una experiencia de escritura fluida con vista previa de Markdown en tiempo real, capacidades de búsqueda difusa e integración con Google OAuth para un acceso seguro.

El proyecto nació del deseo de explorar la sinergia entre Next.js, shadcn/ui y Prisma a título personal. Al elegir SQLite y Lucia Auth, la aplicación se mantiene ligera pero potente. El uso de **Bun** como entorno de ejecución y **Tweakcn** para refinamientos en la interfaz de usuario añade un toque moderno al flujo de trabajo de desarrollo.

## Características Clave

- **Integración con Google OAuth**: Autenticación segura y sencilla.
- **Editor de Markdown**: Escribe en Markdown con un modo de vista previa elegante y en tiempo real.
- **Gestión de Notas**: Operaciones CRUD completas para organizar tus pensamientos.
- **Búsqueda Difusa**: Encuentra notas rápidamente usando Fuse.js para una búsqueda eficiente.
- **Atajos de Teclado**: Productividad mejorada para usuarios avanzados.
- **Diseño Responsive**: Optimizado tanto para dispositivos de escritorio como móviles.

## Tecnologías Utilizadas

- **Framework**: Next.js 16 & React 19
- **Estilo**: Tailwind 4 & shadcn/ui (con Tweakcn)
- **Lenguaje**: TypeScript
- **Base de Datos**: Prisma con SQLite
- **Runtime**: Bun
- **Pruebas**: Vitest

## Empezando

Para obtener una copia local en funcionamiento, sigue estos pasos:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/ARKye03/noxt.git
   cd noxt
   ```

2. **Instala las dependencias**:

   ```bash
   bun install
   ```

3. **Configura las variables de entorno**:
   Sigue esta [guía](https://developers.google.com/identity/protocols/oauth2) para obtener credenciales de Google OAuth. Usa `http://localhost:3000/login/google/callback` como el URI de redirección.

   ```bash
   cp .env.example .env
   ```

4. **Configura la base de datos**:

   ```bash
   bunx --bun prisma generate
   bunx --bun prisma migrate dev
   ```

5. **Ejecuta el servidor de desarrollo**:

   ```bash
   bun dev
   ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Resultados

- Una aplicación de toma de notas totalmente funcional y responsive con respuesta en tiempo real.
- Integración fluida de Google OAuth para la autenticación de usuarios.
- Funciones de búsqueda y edición de alto rendimiento que compiten con alternativas comerciales.
- Un stack tecnológico moderno que demuestra la eficiencia de Bun y Next.js 16.
