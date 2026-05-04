---
title: "Aella"
description: "Un corrector gramatical offline ultrarrápido construido con Rust, con una elegante aplicación de escritorio y un potente CLI para desarrolladores que escriben rápido y necesitan correcciones instantáneas."
date: 2026-01-10
featured: true
tags: ["Rust", "Iced", "CLI", "Corrector Gramatical", "Turso", "Harper"]
github: "https://github.com/ARKye03/aella"
images:
  [
    "@assets/projects/aella/mainExpanded.webp",
    "@assets/projects/aella/mainCollapsed.webp",
    "@assets/projects/aella/trashView.webp",
  ]
lang: "es"
---

## Descripción del Proyecto

**Aella** es tu corrector gramatical de confianza, construido para velocidad y simplicidad. Nombrado en honor a una guerrera griega, esta herramienta nació de una necesidad real de desarrollador: revisar descripciones de PR más de 50 veces al día sin la sobrecarga de herramientas de IA en la nube.

A diferencia de los correctores gramaticales tradicionales, Aella funciona completamente offline, es ultrarrápido y preserva tu tono de escritura. Ya sea que prefieras una elegante GUI de escritorio o el poder de la línea de comandos, Aella te cubre con ambas interfaces compartiendo el mismo núcleo robusto.

## El Problema que Resuelve

Como desarrollador escribiendo múltiples descripciones de PR diariamente, saltar a ChatGPT para revisiones gramaticales rápidas se vuelve ineficiente. No necesitas reescrituras de IA, solo necesitas atrapar ese apóstrofo o coma faltante mientras escribes rápido. Aella proporciona correcciones instantáneas offline que mantienen tus ideas y tono intactos.

**Ejemplo de flujo de trabajo:**

```bash
# Copiar descripción de PR, corregir gramática, copiar de vuelta
echo "$pbpaste" | aella check | pbcopy
```

Listo. Sin cambio de contexto, sin espera, sin dependencia de la nube.

## Características Clave

- **Revisiones Gramaticales en Tiempo Real**: Atrapa errores mientras escribes en la app de escritorio
- **Soporte de Markdown**: Escribe en tu formato favorito con resaltado de sintaxis completo
- **Auto-Guardado de Historial**: Nunca pierdas un pensamiento, respaldado por base de datos Turso
- **Búsqueda**: Encuentra documentos y correcciones antiguas instantáneamente
- **Offline Primero**: No requiere internet, tus datos permanecen locales
- **Interfaz Dual**: Hermosa GUI basada en iced o potente CLI para scripting
- **Procesamiento por Lotes**: Revisa múltiples archivos a la vez con el CLI
- **Salida Legible por Máquina**: Formato JSON para integración con otras herramientas

## Tecnologías Utilizadas

- **Lenguaje**: Rust (Edición 2021)
- **Motor Gramatical**: harper-core 1.6.0 (revisión gramatical de inglés offline)
- **Framework de Escritorio**: iced 0.14.0 (GUI nativa multiplataforma)
- **Base de Datos**: Turso 0.4.4 (SQLite para historial y búsqueda)
- **Framework CLI**: Construido a medida con la biblioteca estándar de Rust
- **Arquitectura**: Workspace de tres crates (aella-core, aella-desktop, aella-cli)
- **Runtime Asíncrono**: Tokio para operaciones concurrentes

## Capacidades del CLI

La interfaz de línea de comandos está diseñada para desarrolladores que viven en la terminal:

```bash
# Revisión rápida desde stdin
echo "I has a pen. She dont like it." | aella check
# Salida: I have a pen. She doesn't like it.

# Revisar un archivo con vista diff
aella check draft.txt --diff

# Salida JSON para scripting
aella check document.txt --json

# Procesar archivos markdown por lotes
aella check "*.md" --batch -o corrected/

# Guardar en historial con contenido completo
aella check important.txt --save-content

# Revisar correcciones pasadas
aella history --limit 50
```

## Características de la App de Escritorio

La GUI basada en iced proporciona una experiencia de escritura premium:

- **Revisión Gramatical en Vivo**: Subrayados aparecen mientras escribes
- **Renderizado de Markdown**: Vista previa de tu texto formateado junto al editor
- **Historial de Documentos**: Navega y restaura documentos anteriores
- **Gestión de Papelera**: Eliminación suave con opciones de recuperación
- **Atajos de Teclado**: Navegación inspirada en Vim para usuarios avanzados
- **Auto-Guardado**: Nunca guardes manualmente de nuevo, todo persiste automáticamente

## Empezando

```bash
# Clonar el repositorio
git clone https://github.com/ARKye03/aella.git
cd aella

# Ejecutar la app de escritorio
cargo run -p aella-desktop

# O usar el CLI
cargo run -p aella-cli -- check tu-archivo.txt

# Construir para macOS
cargo bundle -p aella-desktop --release
```

## Resultados

- Un corrector gramatical listo para producción usado diariamente en flujos de trabajo de desarrollo reales
- Tiempos de respuesta sub-segundo para documentos de miles de palabras
- Operación completamente offline sin preocupaciones de privacidad
- Biblioteca central compartida que habilita tanto GUI como CLI sin duplicación de código
- Seguimiento completo de historial con archivo buscable de todas las correcciones
- Perfecto para desarrolladores, escritores y cualquiera que valore velocidad y privacidad
