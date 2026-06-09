// Generates public/letter.pdf from the /letter/print route using the system
// Chrome's headless print-to-pdf. No npm dependencies.
//
// Usage:
//   1. Start the app:  npm run dev   (or: npm run build && npm run start)
//   2. In another tab: npm run letter:pdf
//
// Run this on macOS so the PDF embeds the same system fonts (Times New Roman,
// Arial, Arial Black) you see in the browser. A Linux/CI runner lacks those.
//
// Env overrides:
//   BASE_URL  target origin (default http://localhost:3000)
//   CHROME    path to the Chrome/Chromium binary (default: macOS Google Chrome)

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const PRINT_URL = `${BASE_URL}/letter/print`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "..", "public", "letter.pdf");

const CHROME_CANDIDATES = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error(
    "Could not find Chrome. Set CHROME=/path/to/Chrome and re-run.\n" +
      `Looked in:\n  ${CHROME_CANDIDATES.join("\n  ")}`,
  );
  process.exit(1);
}

// Page size and margins are set via @page in print.css, so we don't pass them
// here. --virtual-time-budget gives fonts + the apple SVG time to settle.
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=4000",
  `--print-to-pdf=${OUT_PATH}`,
  PRINT_URL,
];

const child = spawn(chrome, args, { stdio: ["ignore", "ignore", "inherit"] });

child.on("error", (err) => {
  console.error(`Failed to launch Chrome: ${err.message}`);
  process.exit(1);
});

child.on("exit", (code) => {
  if (code === 0 && existsSync(OUT_PATH)) {
    console.log(`Wrote ${OUT_PATH}`);
  } else {
    console.error(
      `Chrome exited with code ${code} and no PDF was written.\n` +
        `Is the dev server running at ${BASE_URL}? Start it with "npm run dev".`,
    );
    process.exit(1);
  }
});
