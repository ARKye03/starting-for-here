---
title: "Ferox"
description: "Un intérprete de lenguaje de programación funcional construido desde cero en Rust, con un REPL interactivo y una aplicación de escritorio moderna con evaluación de código en vivo."
date: 2026-01-15
featured: true
tags:
  ["Rust", "Tauri", "Leptos", "Intérprete", "Programación Funcional", "REPL"]
github: "https://github.com/ARKye03/ferox"
images: ["ferox.webp"]
lang: "es"
---

## Descripción del Proyecto

**FEROX** (Functional Expression Runtime for Operations and eXecution) es un intérprete educativo para un lenguaje de programación funcional construido completamente en Rust. Este proyecto representa una reescritura y modernización completa de un proyecto universitario, demostrando conceptos fundamentales de implementación de intérpretes mientras permanece fácil de aprender y usar.

El lenguaje combina conceptos de programación funcional con características imperativas, ofreciendo tipado fuerte, alcance léxico, soporte para recursión y funciones matemáticas integradas, todo implementado sin dependencias externas en la biblioteca principal.

## Características Clave

- **REPL Interactivo**: Escribe código y ve resultados instantáneamente con un bucle read-eval-print responsivo
- **Ejecución de Scripts**: Ejecuta archivos `.frx` directamente desde la línea de comandos
- **Aplicación de Escritorio**: Aplicación moderna basada en Tauri con Leptos para edición de código en vivo y evaluación en tiempo real
- **Tipado Fuerte**: Tipos Number, String y Boolean con mensajes de error claros
- **Cero Dependencias**: La biblioteca principal usa solo la biblioteca estándar de Rust
- **Matemáticas Integradas**: Funciones matemáticas completas incluyendo trigonometría y logaritmos
- **Editor en Vivo**: Auto-evaluación con debounce de 500ms y decoraciones de resultados en línea

## Tecnologías Utilizadas

- **Lenguaje**: Rust (Edición 2021)
- **Framework CLI**: Clap para análisis de argumentos de línea de comandos
- **REPL**: Rustyline para experiencia de shell interactivo
- **Framework de Escritorio**: Tauri + Leptos para la aplicación GUI
- **Arquitectura**: Diseño de dos crates (ferox-core + ferox-cli)
- **Parser**: Parser de descenso recursivo escrito a mano
- **Intérprete**: Intérprete tree-walking con alcance basado en pila

## Aspectos Destacados del Lenguaje

El lenguaje FEROX presenta una sintaxis orientada a expresiones con paradigmas de programación funcional:

```javascript
// Fibonacci recursivo
function fib(n) =>
  if (n <= 1) n
  else fib(n - 1) + fib(n - 2);

fib(10);  // => 55

// Expresiones let con alcance léxico
let x = 10, y = 20 in x + y;  // => 30

// Concatenación de strings con coerción de tipos automática
print("Resultado: " @ fib(5));  // => Resultado: 5
```

## Empezando

```bash
# Clonar y construir
git clone https://github.com/ARKye03/ferox.git
cd ferox
cargo build --release

# Ejecutar REPL interactivo
cargo run -p ferox-cli

# Ejecutar un archivo de script
cargo run -p ferox-cli -- examples/hello.frx

# Lanzar aplicación de escritorio
cd ferox-tauri/src-tauri
cargo tauri dev
```

## Resultados

- Un intérprete completamente funcional con cobertura de pruebas completa
- Separación limpia entre lógica central y CLI a través de una arquitectura de dos crates
- Aplicación de escritorio con experiencia de codificación en vivo premium comparable a RunJS/Quokka.js
- Base de código educativa perfecta para aprender construcción de intérpretes
- Biblioteca principal sin dependencias que muestra las capacidades de la biblioteca estándar de Rust
