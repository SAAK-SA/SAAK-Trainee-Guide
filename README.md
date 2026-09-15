# SAAK International — Trainee Guide

An interactive, bilingual (Arabic / English) Trainee Guide for SAAK
International. Clean corporate layout with the SAAK navy + green palette and
a single language toggle in the header — Arabic is the default view.

---

## Stack

| | |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 (central token config) |
| Motion | Framer Motion 11 |
| Icons | lucide-react |

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
  data/
    content.ts       bilingual section content (EN + AR) — source of truth
    ui.ts            interface chrome strings
  i18n/            language context (defaults to Arabic), direction handling
  lib/             icons, class helpers, motion tokens
  hooks/           active-section tracking, motion preference
  styles/tokens.css  CSS custom properties (mirror of tailwind.config.ts)
  components/
    layout/        Navbar, MobileNavigation, Footer, Logo, LanguageToggle
    ui/            Section, SectionHeading, Card, BulletList, DataList, …
    sections/      the 13 page sections
```

## Sections (13)

00. Hero / Welcome
01. About SAAK International
02. Vision, Mission & Values
03. Starting Your Training
04. Your Training Experience
05. Workplace Conduct
06. Safety & Security
07. Confidentiality & Information Security
08. Use of Company Property
09. Guidelines & Compliance
10. Contact & Support
11. Completing Your Training
12. Acknowledgement (with submission form)

## Editing content

All copy lives in `src/data/content.ts`, authored as `{ en, ar }` pairs.
Components contain no copy — replace the strings and the layout takes them
without any component changes.

## Contact placeholders

The Contact & Support section currently shows "To be added / يُضاف لاحقًا"
for the trainee coordinator's name, phone and email. Edit the `rows` array
in `CONTACT` (`src/data/content.ts`) once the real details are approved.

## Acknowledgement form

The final section submits the trainee's name, training period and consent
flag to a form endpoint. **To connect the form:**

1. Create a form endpoint on [Formspree](https://formspree.io) (or a similar
   service, or a Google Forms hidden POST).
2. Paste the endpoint URL into the `FORM_ENDPOINT` constant near the top of
   `src/components/sections/Acknowledgement.tsx`.

Until this is set, the form displays an inline notice ("لم يتم ربط نموذج
الإرسال بعد") when the user submits — nothing is sent.

## Design system

Tokens are defined once in `tailwind.config.ts` and mirrored as CSS custom
properties in `src/styles/tokens.css`:

- **Colour** — navy `#14396B` (dominant) and green `#12A150` (accent only:
  active states, highlights, CTAs), white and a light neutral ramp.
- **Typography** — IBM Plex Sans / IBM Plex Sans Arabic / IBM Plex Mono, with
  a fluid scale from `display-xl` down to `meta`.
- **Spacing** — fluid `--space-section` / `--space-gutter` that step up at the
  `md` and `xl` breakpoints.
- **Motion** — a single `technical` easing with three durations (fast/base/
  slow). Everything collapses to a plain fade under
  `prefers-reduced-motion`.

## Bilingual support

Arabic and English are both first-class. The toggle in the header sets
`<html lang>` and `<html dir>`, swaps to the Arabic typeface and applies an
Arabic-specific optical size and leading. Layouts are built on CSS logical
properties (`ps-*`, `pe-*`, `start-*`, `end-*`), so RTL is a genuine mirror
rather than a flipped copy. The choice persists in `localStorage`; the
default first-load language is **Arabic**.

## Accessibility

- Semantic landmarks, one `h1`, `aria-labelledby` per section, skip link.
- Full keyboard path; the mobile menu traps focus and restores it on close.
- Visible focus rings that adapt to light and dark plates.
- Contrast: every content-bearing string clears WCAG AA on its plate.
- `prefers-reduced-motion` is honoured twice: in CSS and via
  `useMotionPreference`, which collapses every animation to a plain fade.
