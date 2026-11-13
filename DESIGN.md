# Design System

## Direction

A confident student portfolio for a cybersecurity student and working frontend engineer. The scene is a student reviewing their work at a campus desk in daylight, then checking the planner on a phone. Use vivid blue as the identity field, high-contrast white and near-black for reading, and a small citrus accent for actions.

## Color

- Brand blue: `oklch(0.50 0.20 265)`
- Deep blue: `oklch(0.34 0.16 265)`
- Citrus accent: `oklch(0.91 0.20 110)`
- Background: `oklch(1 0 0)`
- Surface: `oklch(0.975 0.006 265)`
- Ink: `oklch(0.19 0.015 265)`
- Muted ink: `oklch(0.43 0.015 265)`
- Rule: `oklch(0.88 0.012 265)`

## Typography

Use a native system sans-serif stack. Use weight, scale, and line length for hierarchy; body copy stays under 70ch. Headings use balanced wrapping and avoid compressed tracking.

## Layout

A narrow shared header, wide editorial main column, and responsive project grid. Use asymmetric hero composition; cards appear only around interactive tasks and project previews. Surfaces use 10–16px radii.

## Motion

Use short color and transform transitions with ease-out timing. Avoid entrance animation that hides content. Respect `prefers-reduced-motion`.

## Components

- Primary action: blue field with white label; citrus is reserved for small emphasis.
- Navigation: text links with an underline/weight active state and a mobile menu button.
- Form controls: full-width, visible labels, error text tied to fields, explicit status region.
- Planner task: native checkbox, task text, and a clearly labeled delete button.
