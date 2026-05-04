---
title: "G-Wallac-E"
description: "A GTK4/libadwaita desktop app that runs G#, a pure-functional geometric DSL where programs construct points, lines, circles, and arcs through intersections and measures — no raw coordinates."
date: 2026-05-03
featured: false
tags: ["C++", "GTK4", "libadwaita", "Desktop App", "DSL", "Cairo", "Meson"]
github: "https://github.com/ARKye03/g-wallac-e"
images:
  [
    "@assets/projects/gwallace/gw1.webp",
    "@assets/projects/gwallace/gw2.webp",
    "@assets/projects/gwallace/gw3.webp",
  ]
lang: "en"
---

## Project Overview

**G-Wallac-E** is a native desktop application that brings ruler-and-compass geometry to life through a custom programming language. The app hosts the **G#** interpreter — a pure-functional DSL with Hindley-Milner type inference — and renders every construction live on a Cairo canvas as you write.

What makes it interesting is the constraint: coordinates are completely hidden from the programmer. Every geometric object is declared through constructors, intersections, and measures, mirroring how classical geometric proofs work. The result is a tight feedback loop between writing a program and watching a proof materialize on screen.

## The Problem It Solves

Classical geometry education tools either hide the math behind GUIs or expose raw coordinates that break the ruler-and-compass abstraction. G# occupies the middle ground: it's a real programming language with types and lazy sequences, but its semantics enforce the constraint that you can only construct what is geometrically constructible.

```geo
// Perpendicular bisector of two free points
point p1;
point p2;

l1 = line(p1, p2);
m  = measure(p1, p2);
c1 = circle(p1, m);  c2 = circle(p2, m);

i1, i2, _ = intersect(c1, c2);
l2        = line(i1, i2);
mid, _    = intersect(l1, l2);

draw {p1, p2};
red color;
draw mid "midpoint";
restore;
```

The program above computes the midpoint of two draggable points with no coordinates in sight.

## Key Features

- **G# Language**: Pure-functional DSL with HM type inference and lazy sequences
- **Live Canvas**: Cairo-rendered canvas updates instantly as code changes
- **Free Inputs**: Declare `point p;` and drag it on canvas — all dependent geometry recomputes
- **Geometric Primitives**: Points, lines, circles, arcs, and their intersections as first-class values
- **Color & Labels**: `draw` commands support color modifiers and string labels for annotations
- **Layered Architecture**: UI, renderer, runtime, type checker, parser, and geometry are strict top-down layers
- **Testable Core**: `Engine` interface lets the interpreter run in test suites without any GTK dependency
- **Blueprint UI**: Editor, canvas, and inspector panels built with libadwaita and Blueprint

## Technologies Used

- **Language**: C++23
- **GUI Toolkit**: gtkmm-4.0 + libadwaita ≥ 1.4
- **UI Description**: Blueprint (GTK UI markup)
- **Rendering**: Cairo
- **Build System**: Meson ≥ 1.3 + just
- **Compiler**: clang/clang++ ≥ 17
- **Architecture**: Six-layer stack (ui → render → runtime → sema → syntax → geom)

## Architecture

The interpreter is split into six layers with a strict top-down call discipline:

| Layer      | Role                                                        |
| ---------- | ----------------------------------------------------------- |
| `ui/`      | gtkmm4 + libadwaita + Blueprint — editor, canvas, inspector |
| `render/`  | Cairo painters that convert `DrawList` to pixels            |
| `runtime/` | Evaluator, `Value` type, lazy `Sequence`, `Env`             |
| `sema/`    | Resolver and HM type checker                                |
| `syntax/`  | Lexer → Parser → AST + diagnostics                          |
| `geom/`    | Primitives, constructors, intersection math                 |

The `Engine` class (`src/engine.h`) is the only seam between the GTK frontend and the language stack, keeping the interpreter fully testable in isolation.

## Getting Started

```sh
# Clone and enter
git clone https://github.com/ARKye03/g-wallac-e.git
cd g-wallac-e

# First-time setup (configures meson with clang toolchain)
just setup

# Build and run
just

# Run test suite
just test
```

macOS prerequisites: `brew install gtkmm4 libadwaita just llvm`

## Results

- A fully working geometric construction environment driven entirely by a custom language
- Clean language/UI separation enabling unit tests with no GTK dependency
- HM type inference catches geometric type errors (e.g., passing a circle where a line is expected) at compile time
- Lazy sequences allow infinite geometric constructions without eager evaluation overhead
- Example programs covering classic constructions (midpoint, bisector, inscribed circle) ship in `tests/samples/`
