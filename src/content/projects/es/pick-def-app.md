---
title: "Pick Default App"
description: "Una herramienta de escritorio limpia para ver y cambiar qué aplicaciones abren diferentes tipos de archivos en Linux."
date: 2025-09-17
featured: false
tags: ["Rust", "GTK4", "Libadwaita", "Linux", "Desktop"]
github: "https://github.com/ARKye03/pick_def_app"
images: ["pick-def-app.webp"]
lang: "es"
---

## Descripción General

Pick Default App te permite buscar rápidamente cualquier tipo de archivo (tipo MIME) en tu sistema y elegir qué aplicación instalada debe abrirlo. Sin ediciones en la terminal. Sin adivinanzas. Solo elige y aplica.

## Características Principales

- Interfaz moderna al estilo GNOME (GTK4 + Libadwaita)
- Búsqueda difusa (fuzzy search) rápida de tipos MIME y aplicaciones
- Muestra todas las aplicaciones de escritorio que coinciden
- Cambio de la aplicación predeterminada con un solo clic
- Escribe directamente en tu archivo `~/.config/mimeapps.list`
- Actualizaciones en vivo: los cambios son inmediatos

## Cómo Funciona

1. Escanea los archivos `.desktop` instalados
2. Lee las asociaciones actuales
3. Te permite buscar y cambiar
4. Guarda el nuevo mapeo para que tu sesión y otras aplicaciones lo respeten

## Stack Tecnológico

- Rust (Edición 2024)
- GTK4 + Libadwaita para la interfaz de usuario
- freedesktop-desktop-entry para el procesamiento
- fuzzy-matcher para búsquedas rápidas

## ¿Por qué existe?

Cambiar las aplicaciones predeterminadas en Linux puede sentirse oculto o disperso en varios paneles de configuración. Esto reúne todo en una sola ventana enfocada.

## Ideas Futuras

- Tipos recientes / cambiados con frecuencia
- Ajustes para el modo oscuro
- Vista previa en línea de los metadatos de los archivos de escritorio

## Licencia

Licencia MIT. Consulta el archivo LICENSE en el repositorio.

## Nota

Diseñado para escritorios Linux que siguen los estándares de FreeDesktop y admiten asociaciones MIME.
