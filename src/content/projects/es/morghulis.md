---
title: "Morghulis Desktop Shell"
description: "Un shell de escritorio Wayland ligero y hackeable que sirve de puente entre compositores minimalistas como Hyprland y River con las comodidades cotidianas del escritorio."
date: 2024-06-24
featured: true
tags:
  [
    "Wayland",
    "Linux",
    "Desktop Shell",
    "Hyprland",
    "River",
    "Vala",
    "Open Source",
  ]
github: "https://github.com/ARKye03/morghulis"
images: ["morghulis.webp"]
lang: "es"
---

## ¿Qué es esto? (En palabras simples)

Morghulis es un pequeño ayudante inteligente que te brinda sensaciones de "entorno de escritorio" (paneles, indicadores, pequeños detalles de calidad de vida) mientras sigues usando compositores Wayland ligeros como **Hyprland** o **River**. Piénsalo como: pegamento + pulido, sin convertir tu sistema en un monstruo pesado.

## ¿Por qué existe?

- Los compositores de mosaico (tiling) son geniales pero espartanos.
- Los entornos de escritorio completos son cómodos pero a menudo pesados o demasiado dogmáticos.
- Morghulis intenta situarse en el medio: ligero, modular y amigable para los que les gusta experimentar.

## Lo que obtienes

- Una capa de shell: paneles / barras / información de estado (según los módulos que habilites).
- Potencial para bandejas / indicadores (información del sistema, áreas de trabajo, etc.).
- Valores predeterminados sensatos sin encerrarte.
- Funciona bien con Hyprland y River en lugar de reemplazarlos.

## Ideas Centrales

- Mantenerlo ligero: solo hacer lo que un compositor no hace.
- Hacerlo programable / extensible.
- Mantenerse fuera de tu camino (sin laberintos gigantes de configuración).
- Permitir que los usuarios avanzados profundicen; que los usuarios casuales simplemente lo ejecuten.

## Bajo el Capó (Un vistazo suave)

- Escrito principalmente en **Vala** (que se transpila a C y se conecta con ecosistemas de estilo GNOME/GTK).
- Habla Wayland.
- Estructura modular para que las funciones puedan evolucionar sin sobrecarga.

## Flujo de Uso Típico

1. Ya usas Hyprland o River.
2. Quieres una "capa de escritorio" más limpia (paneles, pequeños ayudantes).
3. Añades Morghulis.
4. Te sientes menos "desnudo", pero sigues siendo rápido.

## ¿Para quién es esto?

- Amantes del "rice" en Linux.
- Personas que construyen una configuración personalizada de Wayland.
- Usuarios que no quieren ejecutar KDE/GNOME pero sí quieren comodidades.
- Experimentadores a los que les gusta leer el código fuente y ajustar cosas.

## Filosofía en 7 Palabras

Sé pequeño. Añade pulido. Nunca te poseerá.

## Un Adelanto (Ejemplos imaginados)

- Indicador de área de trabajo
- Reloj + estadísticas del sistema
- Lanzador rápido (amigable para el futuro)
- Superficie de tematización (colores/fuentes que tú controlas)

## Posibilidades Futuras

- Descubrimiento de plugins estilo mercado
- Más indicadores (batería, multimedia, notificaciones)
- Recarga en caliente de la configuración
- Packs de temas sencillos

## Stack Tecnológico (Simple)

- Lenguaje: Vala
- Protocolo: Wayland
- Estilo: Ligero, modular

## Licencia

MIT, haz cosas geniales, comparte las mejoras.
