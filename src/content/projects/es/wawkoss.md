---
title: "Wawkoss"
description: "Un wrapper moderno de la API de SoundCloud y una interfaz de streaming de música construida con Astro 5, con autenticación OAuth 2.1 completa, acciones del lado del servidor y transiciones de vista fluidas para una experiencia tipo aplicación."
date: 2026-01-05
featured: true
tags: ["Astro", "AlpineJS", "TailwindCSS", "DaisyUI", "OAuth", "SoundCloud"]
github: "https://github.com/ARKye03/wawkoss"
images:
  [
    "wawkoss/wawkossRoot.webp",
    "wawkoss/wawkossSearch.webp",
    "wawkoss/artistPage.webp",
    "wawkoss/trackPage.webp",
    "wawkoss/profilePage.webp",
  ]
lang: "es"
---

## Descripción del Proyecto

**Wawkoss** es un wrapper moderno de la API de SoundCloud y una interfaz de streaming de música que trae el poder de SoundCloud a una aplicación web limpia y eficiente. Construida con Astro 5 (el mejor framework hasta la fecha, por cierto), combina seguridad del lado del servidor con fluidez del lado del cliente para una experiencia auténtica de streaming de música.

¿El nombre? Viene de la icónica línea: **W**hat **A**re **W**e? some **K**ind **O**f **S**uicide **S**quad?, porque cada proyecto paralelo necesita una historia memorable.

Este proyecto sirve como base para una futura aplicación de escritorio (idealmente una app LibAdwaita), demostrando que las tecnologías web modernas pueden ofrecer experiencias de calidad de escritorio.

## Características Clave

- **Autenticación OAuth 2.1 Completa**: Flujo completo de autenticación de SoundCloud con gestión segura de tokens
- **Seguridad del Lado del Servidor**: Toda la obtención de datos y mutaciones manejadas vía Astro Server Actions
- **Navegación Fluida**: View Transitions crean una experiencia tipo aplicación, estilo SPA
- **Interactividad Ligera**: AlpineJS proporciona UI reactiva sin frameworks JavaScript pesados
- **Diseño Moderno**: Elaborado con TailwindCSS v4 y DaisyUI para una interfaz pulida y accesible
- **Tipado Seguro**: Construido con TypeScript en modo estricto para código robusto y mantenible
- **Calidad Asegurada**: Hooks git pre-push verifican, formatean y validan automáticamente antes del despliegue

## Tecnologías Utilizadas

- **Framework**: Astro 5.17.1 con SSR y View Transitions
- **Lenguaje**: TypeScript 5.9.3 (Modo Estricto)
- **Estilos**: TailwindCSS v4.1.18 + DaisyUI 5.5.14
- **Interactividad**: AlpineJS 3.15.6 para componentes reactivos
- **Integración de API**: API de SoundCloud v2 con OAuth 2.1
- **Calidad de Código**: ESLint 9.39.2, Prettier 3.8.1 con plugin de Astro
- **Gestor de Paquetes**: pnpm para instalaciones rápidas y eficientes

## Aspectos Destacados de la Arquitectura

### Patrón de Server Actions

Todas las interacciones con la API se manejan del lado del servidor para máxima seguridad:

```typescript
// Sin claves de API expuestas al cliente
// Gestión de tokens permanece en el servidor
// Mutaciones validadas antes de la ejecución
```

Este enfoque asegura:

- Las credenciales de SoundCloud nunca llegan al navegador
- Los tokens de usuario se gestionan de forma segura con cookies HTTP-only
- La validación de datos ocurre del lado del servidor antes de las mutaciones
- Tamaño reducido del bundle del cliente

### View Transitions

Las View Transitions de Astro crean navegación fluida tipo SPA:

- Sin recargas completas de página entre rutas
- Elementos compartidos se animan sin problemas
- Rendimiento percibido instantáneo
- Mejora progresiva, funciona sin JavaScript

### Integración de AlpineJS

Uso estratégico de AlpineJS para componentes interactivos:

- Controles del reproductor de audio con gestión de estado
- Filtrado de búsqueda y autocompletado
- Diálogos modales y menús desplegables
- Huella de JavaScript mínima comparado con React/Vue

## Características Implementadas

### Streaming de Música

- Navegar pistas, artistas y listas de reproducción
- Reproducir pistas con reproductor de audio personalizado
- Buscar en toda la biblioteca de SoundCloud
- Ver páginas detalladas de artistas y pistas

### Experiencia de Usuario

- Diseño responsivo funciona en todos los dispositivos
- Modo oscuro con tematización de DaisyUI
- Atajos de teclado para usuarios avanzados
- Estados de carga y manejo de errores
- Actualizaciones optimistas de UI

### Flujo de Autenticación

- Flujo de redirección OAuth 2.1
- Almacenamiento seguro de tokens
- Gestión de sesiones
- Rutas y acciones protegidas

## Empezando

```bash
# Clonar e instalar
git clone https://github.com/ARKye03/wawkoss.git
cd wawkoss
pnpm install

# Configurar credenciales de la API de SoundCloud
# Crear .env con:
# SOUNDCLOUD_CLIENT_ID=tu_client_id
# SOUNDCLOUD_CLIENT_SECRET=tu_client_secret
# SOUNDCLOUD_REDIRECT_URI=http://localhost:4321/api/auth/callback

# Ejecutar servidor de desarrollo
pnpm dev

# Build de producción
pnpm build
pnpm preview
```

## Flujo de Trabajo de Desarrollo

La calidad se aplica automáticamente:

```bash
pnpm check   # Verificación de tipos TypeScript
pnpm lint    # Validación ESLint
pnpm fmt     # Formateo Prettier
```

Los hooks git pre-push ejecutan todas las verificaciones antes de empujar para asegurar calidad y consistencia de código en toda la base de código.

## Visión Futura

Esta aplicación web sirve como prueba de concepto para una aplicación de escritorio nativa, probablemente construida con LibAdwaita para integración con GNOME. La arquitectura demuestra que las tecnologías web modernas (Astro, Alpine, Tailwind) pueden ofrecer experiencias de calidad de escritorio sin la complejidad de Electron.

## Resultados

- Un cliente de SoundCloud completamente funcional con autenticación segura
- Arquitectura del lado del servidor que protege credenciales de API
- Navegación fluida tipo aplicación con View Transitions
- Código ligero del lado del cliente (AlpineJS) para excelente rendimiento
- Base de código con tipado seguro y verificaciones de calidad automatizadas
- Fundación para desarrollo futuro de aplicaciones de escritorio
