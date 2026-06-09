import type { Metadata } from "next";

import LetterBody from "../../LetterBody";
import PartnersStrip from "../../PartnersStrip";
import "./print.css";

export const metadata: Metadata = {
  title: "Letter — print",
  robots: { index: false, follow: false },
};

// Bare render of the letter for PDF generation. The generation script
// (scripts/generate-letter-pdf.mjs) loads this route in headless Chrome and
// prints it to public/letter.pdf at US Letter size. Physical page size and
// margins come from the @page rule in print.css. Also handy for previewing the
// print layout directly in a browser.
export default function LetterPrintPage() {
  return (
    <main className="letter-print bg-white text-brand-navy">
      <LetterBody variant="print" />
      <footer className="letter-footer">
        <p className="mb-1 text-left font-serif text-sm font-bold italic">
          In partnership with
        </p>
        <PartnersStrip />
      </footer>
    </main>
  );
}
