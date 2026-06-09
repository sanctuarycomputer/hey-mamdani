# Letter PDF — design

## Goal

Serve the open letter as a real PDF at `/letter.pdf` so it opens inline in a
browser tab (and can be printed on US Letter paper). Format: **8.5″ × 11″,
portrait, multi-page natural flow.**

## Decisions

- **Static, not live.** The letter is essentially static content (the only
  dynamic bit is the partner-names list from `partners.json`; signatures are
  not part of the letter). We pre-generate the PDF and commit it to
  `public/letter.pdf`, which Next serves directly at `/letter.pdf`. No runtime
  dependency, bulletproof on Vercel.
- **Generate locally on macOS.** The letter uses only system fonts
  (Times New Roman, Arial, Arial Black — see `globals.css`). Generating on the
  author's Mac yields a PDF that matches the browser exactly. We do **not**
  generate in CI (a Linux runner lacks those Microsoft fonts).
- **Repeatable script using system Chrome's headless `--print-to-pdf`** — no
  npm dependency. (Playwright was the original plan, but adding *any* new
  dependency to this repo is currently blocked: `npm install <pkg>` re-resolves
  the tree and fails with `ERESOLVE` on an `@swc/core` ↔ `@swc/helpers` peer
  conflict — and with `--legacy-peer-deps` it then fails with `ETARGET` on a
  non-existent `@next/font@16.2.4`. The existing install is healthy — `npm ci`
  and CI deploys work fine — it's only *new* installs that break. System Chrome
  uses the same engine, needs no install, and is already present.)

## Components

### 1. `src/app/LetterBody.tsx` — single source of truth
Extract the letter content (everything currently inside the
`mode === "letter"` scroll container in `LetterModal.tsx`) into a shared
component. Owns `demands` and `partnerNames()`, previously local to the modal.

Prop: `variant?: "modal" | "print"` (default `"modal"`).
- `print` renders the email line at a **fixed large size** instead of via
  `FitText`/fitty, avoiding JS-timing flakiness during headless capture.
- Links remain real `<a>` elements so they're clickable in the PDF.

No hooks → works as-is in both the client modal and the server print page.

### 2. `src/app/LetterModal.tsx` — consume the shared body
Replace the inline letter JSX with `<LetterBody />`. Keep the modal's scroll
container, close button, and CTA. Remove the now-unused `demands` /
`partnerNames` / `FitText` references.

### 3. `src/app/letter/print/page.tsx` — bare print route
Renders `<LetterBody variant="print" />` on a white background inside a
Letter-width content column. No modal chrome, no CTA, no scroll box. Imports
`print.css`.

### 4. `src/app/letter/print/print.css`
Loaded only by the print route. Owns the printed page geometry and overrides
the root layout's navy background to white for paper output:
```css
@page { size: 8.5in 11in; margin: 0.75in; }
html, body { background: #fff !important; }
.letter-print, .letter-print * { print-color-adjust: exact; } /* navy circles */
```

### 5. `scripts/generate-letter-pdf.mjs` — generation
`npm run letter:pdf`. Locates the system Chrome (overridable via `CHROME`),
then runs it headless against `http://localhost:3000/letter/print` (a running
`next dev`/`next start`):
```
chrome --headless=new --disable-gpu --no-pdf-header-footer \
       --virtual-time-budget=4000 \
       --print-to-pdf=public/letter.pdf  $BASE_URL/letter/print
```
Page size/margins come from the `@page` rule; `--virtual-time-budget` lets
fonts and the apple SVG settle. `BASE_URL` defaults to `http://localhost:3000`.

### 6. `package.json`
- Add `"letter:pdf": "node scripts/generate-letter-pdf.mjs"` to scripts.
- No new dependencies (uses system Chrome).

## Serving / routing

- `public/letter.pdf` → served at `/letter.pdf`, renders inline as a PDF. No
  route handler.
- `/letter/print` stays a normal route (handy for previewing the print layout
  in a browser). The existing `/letter` redirect to `/?letter=open` is
  unchanged.

## Workflow when the letter changes

1. Edit copy in `LetterBody.tsx` (or partners in `partners.json`).
2. `npm run dev` (or build + start).
3. `npm run letter:pdf`.
4. Commit the regenerated `public/letter.pdf`.

## Out of scope

- Live/on-request PDF generation.
- Single-page poster scaling.
- Generating in CI.
