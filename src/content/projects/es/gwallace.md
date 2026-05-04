---
title: "G-Wallac-E"
description: "App de escritorio GTK4/libadwaita que ejecuta G#, un DSL geométrico puramente funcional donde los programas construyen puntos, líneas, círculos y arcos mediante intersecciones y medidas — sin coordenadas explícitas."
date: 2026-05-03
featured: false
tags:
  ["C++", "GTK4", "libadwaita", "App de Escritorio", "DSL", "Cairo", "Meson"]
github: "https://github.com/ARKye03/g-wallac-e"
images: ["gwallace/gw1.webp", "gwallace/gw2.webp", "gwallace/gw3.webp"]
lang: "es"
---

## Descripción del Proyecto

**G-Wallac-E** es una aplicación de escritorio nativa que da vida a la geometría de regla y compás a través de un lenguaje de programación propio. La app aloja el intérprete de **G#** — un DSL puramente funcional con inferencia de tipos Hindley-Milner — y renderiza cada construcción en vivo sobre un canvas Cairo mientras escribís.

Lo que lo hace interesante es la restricción: las coordenadas están completamente ocultas para el programador. Todo objeto geométrico se declara mediante constructores, intersecciones y medidas, reflejando cómo funcionan las demostraciones geométricas clásicas. El resultado es un ciclo de retroalimentación estrecho entre escribir un programa y ver una demostración materializarse en pantalla.

## El Problema que Resuelve

Las herramientas educativas de geometría clásica o bien ocultan la matemática detrás de interfaces gráficas, o exponen coordenadas brutas que rompen la abstracción de regla y compás. G# ocupa el punto medio: es un lenguaje de programación real con tipos y secuencias perezosas, pero su semántica impone la restricción de que solo se puede construir lo que es geométricamente construible.

```geo
// Mediatriz de dos puntos libres
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

El programa anterior calcula el punto medio de dos puntos arrastrables sin una sola coordenada a la vista.

## Características Clave

- **Lenguaje G#**: DSL puramente funcional con inferencia de tipos HM y secuencias perezosas
- **Canvas en Vivo**: El canvas renderizado con Cairo se actualiza instantáneamente al cambiar el código
- **Entradas Libres**: Declarás `point p;` y lo arrastrás en el canvas — toda la geometría dependiente se recalcula
- **Primitivas Geométricas**: Puntos, líneas, círculos, arcos y sus intersecciones como valores de primera clase
- **Color y Etiquetas**: Los comandos `draw` admiten modificadores de color y etiquetas de texto para anotaciones
- **Arquitectura en Capas**: UI, renderizador, runtime, verificador de tipos, parser y geometría son capas estrictamente top-down
- **Núcleo Testeable**: La interfaz `Engine` permite ejecutar el intérprete en suites de tests sin ninguna dependencia de GTK
- **UI con Blueprint**: Paneles de editor, canvas e inspector construidos con libadwaita y Blueprint

## Tecnologías Utilizadas

- **Lenguaje**: C++23
- **Toolkit GUI**: gtkmm-4.0 + libadwaita ≥ 1.4
- **Descripción de UI**: Blueprint (markup de interfaz GTK)
- **Renderizado**: Cairo
- **Sistema de Build**: Meson ≥ 1.3 + just
- **Compilador**: clang/clang++ ≥ 17
- **Arquitectura**: Stack de seis capas (ui → render → runtime → sema → syntax → geom)

## Arquitectura

El intérprete está dividido en seis capas con disciplina de llamada estrictamente top-down:

| Capa       | Rol                                                         |
| ---------- | ----------------------------------------------------------- |
| `ui/`      | gtkmm4 + libadwaita + Blueprint — editor, canvas, inspector |
| `render/`  | Pintores Cairo que convierten `DrawList` en píxeles         |
| `runtime/` | Evaluador, tipo `Value`, `Sequence` perezosa, `Env`         |
| `sema/`    | Resolver y verificador de tipos HM                          |
| `syntax/`  | Lexer → Parser → AST + diagnósticos                         |
| `geom/`    | Primitivas, constructores, matemáticas de intersección      |

La clase `Engine` (`src/engine.h`) es el único punto de contacto entre el frontend GTK y el stack del lenguaje, manteniendo el intérprete completamente testeable en aislamiento.

## Empezando

```sh
# Clonar y entrar
git clone https://github.com/ARKye03/g-wallac-e.git
cd g-wallac-e

# Configuración inicial (configura meson con el toolchain de clang)
just setup

# Compilar y ejecutar
just

# Ejecutar suite de tests
just test
```

Prerequisitos en macOS: `brew install gtkmm4 libadwaita just llvm`

## Resultados

- Un entorno de construcción geométrica completamente funcional impulsado íntegramente por un lenguaje propio
- Separación limpia entre lenguaje y UI que permite tests unitarios sin dependencia de GTK
- La inferencia de tipos HM detecta errores de tipo geométrico (p. ej., pasar un círculo donde se espera una línea) en tiempo de compilación
- Las secuencias perezosas permiten construcciones geométricas infinitas sin overhead de evaluación eager
- Programas de ejemplo que cubren construcciones clásicas (punto medio, bisectriz, círculo inscrito) incluidos en `tests/samples/`
