import { redirect } from "next/navigation";

// The letter is now a modal mounted in the root layout. Visiting /letter
// redirects to the homepage with ?letter=open so the modal pops on load.
export default function LetterPage() {
  redirect("/?letter=open");
}
