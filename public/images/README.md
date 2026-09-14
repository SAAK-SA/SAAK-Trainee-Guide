# Image assets

Every photograph in the interface is referenced from `src/data/images.ts` and
rendered through `ImagePanel`. Until a file exists here, the panel shows an
engineered placeholder instead — the layout never breaks and nothing needs to
be commented out.

## How to add a real photograph

1. Export the image as a progressive JPEG (or WebP, then update `file`).
2. Save it in this folder using **exactly** the file name below.
3. Update the `alt` text in `src/data/images.ts` — it describes the real shot.

No code changes are required.

## Shot list

| File | Subject | Suggested size |
| --- | --- | --- |
| `saak-building.jpg` | Headquarters exterior | 1600 × 1200 |
| `saak-factory.jpg` | Manufacturing floor, wide | 2400 × 1350 |
| `electronics-assembly.jpg` | Electronics assembly line | 1800 × 1200 |
| `pcb-assembly.jpg` | PCB close-up | 1400 × 1400 |
| `engineers.jpg` | Engineers at work | 1800 × 1200 |
| `technicians.jpg` | Technician portrait, vertical | 1200 × 1500 |
| `machinery.jpg` | Precision machinery | 1600 × 1200 |
| `testing.jpg` | Test and measurement | 1800 × 1200 |
| `inspection.jpg` | Quality inspection | 1400 × 1400 |
| `training.jpg` | Training session | 2000 × 1500 |
| `technical-workspace.jpg` | Workshop / benches | 1800 × 1200 |
| `safety.jpg` | PPE and safety signage | 1600 × 1200 |

## Guidance

- Keep files under ~400 KB each; everything below the fold is lazy-loaded.
- Prefer authentic SAAK photography. Generic stock imagery will fight the
  navy/green identity and the industrial tone of the design.
- Images are cropped by `object-fit: cover`, so leave headroom around the
  subject — several compositions use square and 4:5 crops.

## Logo

The header uses a neutral typographic lockup, not the corporate logo. To use
the official asset, place it at `/public/logo.svg` and swap the inline `<svg>`
in `src/components/layout/Logo.tsx` for an `<img>` tag (a comment in that file
marks the spot).
