---
title: "Ferox"
description: "A functional programming language interpreter built from scratch in Rust, featuring an interactive REPL and a modern desktop app with live code evaluation."
date: 2026-01-15
featured: true
tags:
  ["Rust", "Tauri", "Leptos", "Interpreter", "Functional Programming", "REPL"]
github: "https://github.com/ARKye03/ferox"
images: ["ferox.webp"]
lang: "en"
---

## Project Overview

**FEROX** (Functional Expression Runtime for Operations and eXecution) is an educational interpreter for a functional programming language built entirely in Rust. This project represents a complete rewrite and modernization of a college project, demonstrating core interpreter implementation concepts while remaining easy to learn and use.

The language combines functional programming concepts with imperative features, offering strong typing, lexical scoping, recursion support, and built-in mathematical functions—all implemented without external dependencies in the core library.

## Key Features

- **Interactive REPL**: Write code and see results instantly with a responsive read-eval-print loop
- **Script Execution**: Run `.frx` files directly from the command line
- **Desktop Application**: Modern Tauri-based app with Leptos for live code editing and real-time evaluation
- **Strong Typing**: Number, String, and Boolean types with clear error messages
- **Zero Dependencies**: Core library uses only Rust's standard library
- **Built-in Math**: Comprehensive math functions including trigonometry and logarithms
- **Live Editor**: Auto-evaluation with 500ms debounce and inline result decorations

## Technologies Used

- **Language**: Rust (Edition 2021)
- **CLI Framework**: Clap for command-line argument parsing
- **REPL**: Rustyline for interactive shell experience
- **Desktop Framework**: Tauri + Leptos for the GUI application
- **Architecture**: Two-crate design (ferox-core + ferox-cli)
- **Parser**: Hand-written recursive descent parser
- **Interpreter**: Tree-walking interpreter with stack-based scoping

## Language Highlights

The FEROX language features an expression-oriented syntax with functional programming paradigms:

```javascript
// Recursive fibonacci
function fib(n) =>
  if (n <= 1) n
  else fib(n - 1) + fib(n - 2);

fib(10);  // => 55

// Let expressions with lexical scoping
let x = 10, y = 20 in x + y;  // => 30

// String concatenation with automatic type coercion
print("Result: " @ fib(5));  // => Result: 5
```

## Getting Started

```bash
# Clone and build
git clone https://github.com/ARKye03/ferox.git
cd ferox
cargo build --release

# Run interactive REPL
cargo run -p ferox-cli

# Execute a script file
cargo run -p ferox-cli -- examples/hello.frx

# Launch desktop app
cd ferox-tauri/src-tauri
cargo tauri dev
```

## Results

- A fully functional interpreter with comprehensive test coverage
- Clean separation between core logic and CLI through a two-crate architecture
- Desktop application with premium live-coding experience comparable to RunJS/Quokka.js
- Educational codebase perfect for learning interpreter construction
- Zero-dependency core library showcasing Rust's standard library capabilities
