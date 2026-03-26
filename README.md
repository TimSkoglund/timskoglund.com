# timskoglund.com

Portfolio and booking website for Tim Skoglund, built as a fast single-page experience with a premium black-and-grey visual direction.

## Overview

The site is built around a focused client journey:

- hero section with clear positioning and booking CTA
- selected tattoo works presented as video cards with lightbox playback
- signature values section describing style and approach
- FAQ with expandable answers, aftercare guide, and pigment documentation
- contact section with direct email, phone, map link, and booking form

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React

## Project Structure

```text
src/
  app/                  App shell
  content/              Centralized site content and data
  features/
    contact/            Contact section
    faq/                FAQ, care guide, and PDF overlays
    landing/            Hero and style sections
    works/              Work gallery and lightbox
  shared/
    lib/                Shared utilities
    ui/                 Shared layout and UI components
  styles/               Global styles

public/
  docs/                 PDF documents used in overlays
  media/                Images and video assets
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Content Management

Most editable content lives in:

`src/content/site-content.ts`

This includes:

- hero copy
- navigation labels
- work gallery items and order
- FAQ entries
- aftercare text
- contact information

To change which tattoo videos are shown, update the `works` array in `site-content.ts`. The order in that array controls the order in the gallery.

## Assets

- videos are served from `public/media/videos`
- documents are served from `public/docs`
- favicon assets are stored in `public/`

## Notes

- `dist/` is build output and should not be edited manually
- the project is designed to be easy to maintain through centralized content data
- PDF-based pigment information is displayed in an on-site overlay for a smoother user experience
