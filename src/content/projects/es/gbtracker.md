---
title: "GBTracker"
description: "Una app de escritorio nativa que muestra todos los issues, tareas y épicas de git-bug de todos tus repositorios en una sola ventana, construida con Rust e iced."
date: 2026-11-17
featured: false
tags:
  [
    "Rust",
    "Iced",
    "App de Escritorio",
    "git-bug",
    "Herramientas de Desarrollo",
    "Tokio",
  ]
github: "https://github.com/ARKye03/gbtracker"
images: ["@assets/projects/gbtracker/preview.webp"]
lang: "es"
---

## Descripción del Proyecto

**GBTracker** es una app de escritorio para los issues que [git-bug](https://github.com/git-bug/git-bug) guarda dentro de tus repositorios. Apúntala a tus carpetas de proyectos y lista cada bug, tarea y épica de todos ellos en una sola ventana.

Lee y escribe a través del CLI de `git-bug`, así que no hay una base de datos aparte que mantener sincronizada. Cierra un issue en GBTracker y `git bug` lo ve cerrado.

## El Problema que Resuelve

git-bug guarda los issues en refs de git, lo cual es ideal para tener la propiedad de tus datos y trabajar offline, pero limita todo a un repo a la vez. Con una docena de proyectos, saber qué está abierto significa correr `git bug` en cada uno.

**Ejemplo de flujo de trabajo:**

```bash
# Antes: un repo a la vez
cd ~/code/aella && git bug ls
cd ~/code/ferox && git bug ls

# Después: una ventana, todos los repos
cargo run
```

## Características Clave

- **Resumen**: Una tarjeta por repo con épicas, tareas y bugs abiertos, y cuántos están en progreso o bloqueados
- **Issues entre Repos**: Búsqueda, filtros y una vista de **Trabajo activo** sobre todos los repositorios a la vez
- **Épicas**: Issues hijos agrupados bajo su épica con progreso de cerrados sobre total
- **Nuevo Issue**: Crea un bug, tarea o épica, opcionalmente dentro de una épica existente
- **Check Done**: Encuentra issues abiertos cuyo ID ya aparece en un trailer `Refs:` de un commit en la rama base, para cerrar el trabajo ya entregado. Nunca hace fetch, así que un `origin/<base>` desactualizado oculta trabajo terminado pero nunca lo inventa
- **Reapertura Rápida**: Las listas de issues se cachean en disco y solo se recargan cuando cambian las refs de git-bug del repo
- **Escaneo de Carpetas**: Agrega un proyecto o una carpeta padre escaneada cuatro niveles de profundidad, omitiendo `node_modules` y `target`
- **Teclado Primero**: `Cmd+K` para buscar, `Cmd+N` para un issue nuevo, `J`/`K` para navegar y `X` para cerrar o reabrir

## Tecnologías Utilizadas

- **Lenguaje**: Rust (Edición 2024), con `unsafe_code` prohibido
- **GUI**: iced 0.14 con widgets SVG, markdown y lazy
- **Íconos**: lucide-iced 0.4
- **Runtime Asíncrono**: Tokio, para manejar el CLI de `git-bug`
- **Almacenamiento**: refs de `git-bug` como fuente de verdad, con caché en disco vía `directories`
- **Empaquetado**: `cargo-bundle` para el bundle de la app de macOS

## Convenciones de Etiquetas

GBTracker usa etiquetas planas de git-bug, la misma convención que el plugin roadmap:

- **`kind:bug`, `kind:task`, `kind:epic`**: Tipo de issue
- **`epic:<id>`**: Épica padre
- **`state:in-progress`, `state:blocked`**: Estado de trabajo en un issue abierto

Check Done lee la rama base desde `baseBranch` en `.claude/roadmap.json`, luego recurre a `origin/HEAD`, y después a la primera que exista entre `main`, `trunk`, `master` o `develop`.

## Empezando

```bash
# Clonar el repositorio
git clone https://github.com/ARKye03/gbtracker.git
cd gbtracker

# Requiere git, git-bug y un toolchain de Rust con edición 2024
cargo run

# Forzar modo oscuro por una ejecución
GBTRACKER_THEME=dark cargo run

# Construir el bundle de la app de macOS
cargo install cargo-bundle
cargo bundle --release
```

## Resultados

- Una sola vista de todos los issues abiertos en todos mis repositorios
- Sin una segunda fuente de verdad: todo permanece en git-bug y su CLI
- Arranque rápido incluso con muchos repos, gracias a la invalidación de caché basada en refs
- Cerrar trabajo entregado es fácil, con Check Done comparando trailers `Refs:` contra la rama base
