# diagram-notes

A web app to browse SVG diagrams in a grid, view them full-size, and manage notes.

## Resources

🚀 **Live**: https://kkoisland.github.io/diagram-notes/
📝 **Slides**: (coming soon)

## Features

- Browse SVG diagrams in a responsive Masonry grid
- Click to expand: split view with full-size SVG on the right and scrollable list on the left
- Add memo and done flag per diagram — auto-saved to localStorage
- Done indicator (badge) on cards — toggle directly from the list or in the detail view
- Export / Import notes as `notes.json`
- Search by title and filter by category
- Sort by newest or oldest (toggle button in toolbar)
- 1–5 column layout toggle
- Dark mode with system preference detection and localStorage persistence

## Usage

**`diagrams.json`** — managed in the repository. Edit manually to set titles, categories, and dates. Run `pnpm generate` to add new SVG files automatically (new entries get a UUID and auto-capitalized title from the filename).

**`notes.json`** — your personal data (memos and done flags), stored in localStorage. Use the export button to back up and the import button to restore on another device.

### Using on another machine

Memos and done flags are stored in localStorage, which is local to each browser and device. To carry them over to another machine, export and import `notes.json` manually.

1. On the current machine, export `notes.json` from the toolbar
2. Clone or pull the repository on the new machine
3. `nvm use && pnpm i && pnpm dev`
4. Import the `notes.json` from the toolbar

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- react-masonry-css
- lucide-react
- Biome (Formatter + Linter)
- GitHub Actions + GitHub Pages

## Local Development

```bash
nvm use
pnpm i
pnpm dev
```

http://localhost:5173/

## Project Structure

```
diagram-notes/
├── public/
│   ├── diagrams/          # SVG files
│   └── diagrams.json      # generated at build time
├── src/
│   ├── App.tsx
│   ├── DiagramCard.tsx
│   ├── DetailView.tsx
│   ├── types.ts
│   └── main.tsx
├── generate-diagrams.ts   # SVG list generation script
└── vite.config.ts
```

## Deploy

Automatically deployed to GitHub Pages via GitHub Actions on every push to `main`.
