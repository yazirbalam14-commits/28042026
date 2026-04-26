# Design System: High-End Digital Experience

## 1. Overview & Creative North Star: "The Celestial Echo"
This design system is a digital translation of the song 'Arrullo de Estrellas'—a cinematic, romantic, and cosmic experience. The Creative North Star is **"The Celestial Echo"**: an aesthetic that prioritizes depth, resonance, and ethereal beauty over rigid utility. 

To break the "template" look, we move away from standard vertical stacks. We embrace **Intentional Asymmetry** and **Layered Translucency**. Elements should feel as though they are floating in a deep-space vacuum, held together by gravitational pull rather than grid lines. We utilize high-contrast typography scales—pairing massive, delicate headlines with tight, functional labels—to create an editorial feel that is both intimate and vast.

---

## 2. Colors & Atmospheric Depth
The palette is rooted in the infinite void of space, punctuated by the vibrant, neon energy of a nebula.

### Tonal Application
- **The Base:** Use `surface` (#0e0e14) as your canvas. It is not pure black, but a deep midnight that allows for "glow" interactions.
- **The "No-Line" Rule:** Borders are strictly prohibited for defining sections. Use `surface-container-low` vs. `surface-container-high` to create organic zones. Boundaries are felt through shifts in luminosity, not 1px strokes.
- **Surface Hierarchy & Nesting:** Treat the UI as a series of nested glass panes.
    - *Level 0:* `surface-container-lowest` (#000000) for background voids.
    - *Level 1:* `surface` (#0e0e14) for the main stage.
    - *Level 2:* `surface-container` (#191920) for primary content cards.
- **The "Glass & Gradient" Rule:** Floating elements must use Glassmorphism. Apply a backdrop-blur (12px–20px) to `surface-variant` at 40% opacity. 
- **Signature Textures:** Use a linear gradient from `primary` (#ca98ff) to `secondary` (#00fbfb) at a 45-degree angle for high-impact CTAs to simulate the spectrum of a star.

---

## 3. Typography: Editorial Resonance
We use a dual-typeface system to balance cosmic scale with technical precision.

*   **Display & Headlines (Manrope):** Chosen for its geometric purity. Headlines should be set with tight letter-spacing (-0.02em) to feel like a modern film title. Use `display-lg` for "hero" moments where the text acts as a visual texture.
*   **Body & Labels (Be Vietnam Pro):** A highly legible sans-serif that feels engineered yet human. 
*   **The Contrast Principle:** Pair a `display-md` headline in `primary` with a `label-sm` in `on-surface-variant` (all caps, tracked out to +0.1em) to achieve a "Scientific/Romantic" juxtaposition.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows have no place in a cosmic void. We use light and opacity to define height.

- **The Layering Principle:** To lift a card, do not add a shadow. Instead, transition the background from `surface-container` to `surface-bright`. The "glow" of the lighter surface provides the lift.
- **Ambient Glows:** For floating "hero" elements, replace shadows with an "Outer Glow." Use `secondary` (#00fbfb) or `tertiary` (#ff51fa) at 10% opacity with a 40px blur. This mimics light refracting through cosmic dust.
- **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use the `outline-variant` token at 15% opacity. It should be a suggestion of an edge, not a hard stop.
- **Motion as Depth:** Elements should not "pop" in; they should "materialize" using opacity fades and subtle scaling (from 98% to 100%).

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-dim`). No border. High roundedness (`full`). White text (`on-primary-fixed`).
- **Secondary (Glass):** `surface-variant` with 30% opacity and 12px backdrop blur. 1px "Ghost Border" using `primary-fixed-dim` at 20%.
- **Tertiary:** Text-only in `secondary`. On hover, add a subtle `secondary_container` glow behind the text.

### Cards & Lists
- **The "Invisible" List:** List items must not have dividers. Use 16px of vertical whitespace. On hover, the entire list item background shifts to `surface-container-high`.
- **Cosmic Cards:** Use `surface-container-low`. Imagery within cards should have a subtle `magenta` or `cyan` overlay to harmonize with the "Arrullo de Estrellas" theme.

### Inputs & Fields
- **States:** Default state is a bottom-only "Ghost Border." On focus, the border expands to a full glow using `primary` and the label shifts to `title-sm`.
- **Error States:** Use `error` (#ff6e84) for text, but avoid heavy red boxes. A soft `error_container` outer glow is sufficient.

### Custom Component: The "Star-Point" Progress Bar
Instead of a solid bar, use a `secondary` line that is 1px thick, with a 4px circular "star" (`primary`) that glows as it moves, leaving a faint `tertiary` trail.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Negative Space:** Allow elements to breathe. In a cosmic system, the "void" is as important as the content.
*   **Use Intentional Asymmetry:** Offset your headlines. Let a hero image bleed off the edge of the screen to suggest a larger universe.
*   **Layer with Purpose:** Only use Glassmorphism for elements that sit *above* the main content (modals, floating nav, tooltips).

### Don't:
*   **Don't use pure white (#FFFFFF):** Use `on-background` (#f0ecf6) for text to prevent "eye-bleed" against the dark surfaces.
*   **Don't use standard shadows:** If it looks like a "Material Design" drop shadow, delete it. Use tonal shifts or glows.
*   **Don't use dividers:** If you feel the need to separate two sections with a line, try increasing the padding by 24px instead. Use whitespace as your primary separator.