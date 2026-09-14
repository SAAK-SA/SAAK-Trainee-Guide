# SAAK International — Trainee Guide

An interactive digital Trainee Guide for SAAK International. Not a PDF in a
browser: a premium, motion-driven web experience built around a circuit visual
system that runs through the whole interface.

**Design concept:** Electronics × Engineering × Digital Experience.
The circuitry is not wallpaper — it is the navigation, the progress indicator,
the section transitions and the activation language of the UI.

---

## Stack

| | |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 (central token config) |
| Motion | Framer Motion 11 |
| Icons | lucide-react |

No other runtime dependencies. The 3D-style PCB visual is CSS transforms and
inline SVG — no 3D engine, no model files.

## Getting started

```bash
npm install
npm run dev       # development server
npm run build     # type-check + production build
npm run preview   # serve the production build
npm run lint      # type-check only
```

## Project structure

```
src/
  data/            ← ALL copy and image references live here
    content.ts       bilingual section content (EN + AR)
    ui.ts            interface chrome strings
    images.ts        image manifest
  i18n/            language context, direction handling
  lib/             design-token mirrors: motion, icons, helpers
  hooks/           motion preference, active section tracking
  styles/tokens.css  CSS custom properties (mirrors tailwind.config.ts)
  components/
    circuit/       the circuit visual system
    layout/        navbar, mobile navigation, footer, logo
    ui/            section, headings, cards, images, timeline, data lists
    sections/      the ten page sections
public/images/     drop real photography here (see its README)
```

## Editing content

Everything readable on the page comes from `src/data/content.ts`, authored as
`{ en, ar }` pairs. Components contain no copy. To replace the placeholders,
edit that one file — the layout, motion and circuit system are unaffected.

> All body copy currently in the repository is deliberate placeholder text.
> No company facts, figures, policies or contact details have been invented.

## Adding photography

Drop files into `public/images/` using the names listed in
[`public/images/README.md`](public/images/README.md). Until a file exists, the
`ImagePanel` component renders an engineered placeholder in its place, so the
layout is always complete. No code changes are needed when the real assets
arrive.

## Design system

Tokens are defined once in `tailwind.config.ts` and mirrored as CSS custom
properties in `src/styles/tokens.css`:

- **Colour** — navy `#14396B` (dominant), green `#12A150` (accent only:
  active states, nodes, highlights, progress), white and a light neutral ramp.
- **Typography** — IBM Plex Sans / IBM Plex Sans Arabic / IBM Plex Mono, with a
  fluid scale from `display-xl` down to `meta`. Monospace is reserved for
  technical labels.
- **Spacing** — fluid `--space-section` / `--space-gutter` that step up at the
  `md` and `xl` breakpoints.
- **Radius** — 2–6px. Deliberately tight: engineered, not friendly.
- **Motion** — `--dur-fast|base|slow` with two easings, `technical` and
  `precise`.

## Fonts

IBM Plex Sans / Sans Arabic / Mono load from Google Fonts in `index.html`, with
`system-ui` fallbacks so the page renders correctly (just in the fallback face)
if the CDN is unreachable. To self-host, drop the woff2 files into
`public/fonts/`, replace the `<link>` with `@font-face` rules in
`src/styles/tokens.css`, and keep the family names — nothing else changes.

## The circuit system

| Component | Role |
| --- | --- |
| `CircuitRail` | Fixed spine (desktop). Draws with scroll, carries a travelling signal, activates section nodes, doubles as navigation. |
| `SectionConnector` | Carries the trace across each tonal change between sections. |
| `AnimatedLine` | Trace primitive: right-angle paths that draw on scroll, with junction nodes. |
| `CircuitNode` | The activation unit — idle navy junction, live green node with halo. |
| `CircuitDecoration` | Composed trace presets (corner, branch, field, bracket, ladder). |
| `TechnicalGrid` | Very-low-opacity substrate grid with optional coordinate markers. |
| `PcbVisual` | The 3D-style board in the hero. |

## Bilingual support

English and Arabic are both first-class. The toggle in the header sets
`<html lang>` and `<html dir>`, swaps to the Arabic typeface and applies an
Arabic-specific optical size and leading — layouts are built on CSS logical
properties (`ps-*`, `pe-*`, `start-*`, `end-*`), so RTL is a genuine mirror
rather than a flipped copy. The choice persists in `localStorage`.

## Accessibility and performance

- Semantic landmarks, one `h1`, `aria-labelledby` per section, skip link.
- Full keyboard path; the mobile menu traps focus and restores it on close.
- Visible focus rings that adapt to light and dark plates.
- Contrast: every content-bearing string clears WCAG AA (4.5:1) on its plate —
  body copy sits at 5.3:1 or better, metadata at 4.8:1 or better, and green is
  darkened to `green-700` wherever it is used as text on a light surface. The
  faint values that remain belong to `aria-hidden` circuitry, grid coordinates
  and silkscreen markings, which carry no information.
- Latin references such as `01 / 09` are marked `dir="ltr"` so the bidi
  algorithm does not reorder them inside Arabic text.
- `prefers-reduced-motion` is honoured twice: in CSS, and in TypeScript via
  `useMotionPreference`, which collapses every animation to a plain fade.
  Touch devices additionally run a lighter motion system (no parallax, no
  travelling signal).
- Images lazy-load below the fold with reserved aspect ratios; the hero pair
  loads eagerly. Vendor code is split into `react` and `motion` chunks.
