---
title: "Maeve"
description: "Una app de escritorio que compara publicaciones de Mercado Libre Uruguay y TEMU por su costo real puesto en casa, y deja que dos modelos Gemini debatan y elijan al ganador."
date: 2026-11-17
featured: false
tags:
  [
    "Rust",
    "Iced",
    "Python",
    "Gemini",
    "Web Scraping",
    "App de Escritorio",
    "Extensión de Navegador",
  ]
github: "https://github.com/ARKye03/maeve"
images: ["@assets/projects/maeve/preview.webp"]
lang: "es"
---

## Descripción del Proyecto

**Maeve** compara publicaciones de Mercado Libre Uruguay y TEMU y te dice cuál comprar. Lee cada enlace y calcula lo que realmente cuesta el producto entregado en Uruguay: envío, IVA o el régimen simplificado de importación, y el tipo de cambio.

Luego Gemini defiende cada producto y un modelo juez elige al ganador. Las comparaciones se guardan en tu computadora, así que nada sale de ella salvo las llamadas a Gemini.

## El Problema que Resuelve

El precio de TEMU y el de Mercado Libre no son comparables. Uno incluye envío local e impuestos, el otro suma costos de importación, un régimen aduanero y una conversión de dólares a pesos al pagar. El precio de etiqueta más bajo suele ser la compra más cara.

**Ejemplo de flujo de trabajo:**

```bash
# Pega dos enlaces en la app y obtén un veredicto por costo final
cargo run --release
```

TEMU además suele responder a los scrapers con un captcha. Maeve incluye una extensión de navegador que reenvía las páginas que abres en tu propio navegador, así la fila fallida se completa después de resolverlo una vez.

## Características Clave

- **Costo Final**: Envío, IVA o el régimen simplificado de importación, y el tipo de cambio unificados en un precio comparable
- **Debate y Juez**: Gemini defiende cada producto y luego un modelo juez aparte elige al ganador
- **Sidecar de Scraping**: Un proceso Python con Scrapling y su propia build de Chromium, controlado mediante JSON lines
- **Extensión de Navegador**: Funciona en Brave, Chrome, Edge y Firefox, y evita los captchas de TEMU usando tu propia sesión
- **Historial Local**: Las comparaciones se guardan en tu máquina con Turso
- **Almacenamiento Seguro de Claves**: La API key de Gemini se valida contra Gemini y se guarda en el Keychain de macOS
- **Receptor Blindado**: Escucha solo en `127.0.0.1:47821` y rechaza solicitudes sin el header de la extensión
- **Temas e Idiomas**: Cada combinación de tema e idioma está cubierta por snapshots con datos de demostración

## Tecnologías Utilizadas

- **Lenguaje**: Rust (Edición 2024) y Python 3.11+
- **GUI**: iced 0.14 con soporte de canvas e imágenes
- **Servidor Local**: axum 0.8, que recibe las páginas de la extensión
- **Base de Datos**: Turso 0.8 para las comparaciones guardadas
- **HTTP**: reqwest 0.13 con rustls
- **Scraper**: Scrapling, gestionado con `uv`
- **Secretos**: keyring, respaldado por el Keychain de macOS
- **Pruebas**: wiremock para las llamadas a Gemini, pytest para el scraper
- **Empaquetado**: `cargo-bundle` para `.app` y `.deb`

## Extensión de Navegador

La extensión en `extension/` envía a Maeve las páginas de producto que abres, y Maeve completa la fila fallida:

- **Navegadores Chromium**: Carga `extension/` sin empaquetar desde `brave://extensions` o `chrome://extensions`
- **Firefox**: Carga `extension/manifest.json` como complemento temporal desde `about:debugging`
- **Indicador**: El ícono de la barra muestra ✓ cuando Maeve ya tiene la página

## Empezando

```bash
# Clonar el repositorio
git clone https://github.com/ARKye03/maeve.git
cd maeve

# Instalar el sidecar de scraping (descarga Chromium en el primer uso)
cd scraper && uv sync && cd ..

# Ejecutar la app y pegar una API key de Gemini en Ajustes
cargo run --release

# Construir el bundle de la app de macOS
cargo install cargo-bundle
cargo bundle --release
```

## Resultados

- Una decisión de compra clara basada en el precio entregado, no en el precio de etiqueta
- Datos confiables de TEMU incluso cuando el scraper se topa con un captcha
- Privado por diseño: historial local, clave en el Keychain y un receptor local blindado
- Un núcleo en Rust con un sidecar en Python, probado con `cargo test` y `pytest`
