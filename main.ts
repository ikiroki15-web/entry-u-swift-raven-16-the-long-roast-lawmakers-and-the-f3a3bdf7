// main.ts — entry for "The Long Roast: Lawmakers and the File They Cannot Convert".
//
// The program writes exactly one satirical sentence to /output/entry.txt:
// a roast of lawmakers who would regulate AI, crypto or the internet while
// being unable to convert a file to PDF. The gate requires 1..320 characters
// of UTF-8 text, so the sentence is checked for length before it is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ROAST =
  "The committee writing the rules for artificial intelligence paused its hearing so a staffer could show the chairman where the 'Save as PDF' button has been hiding for eleven years.";

const MAX_CHARS = 320;

function main(): void {
  const text = ROAST.trim();
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`roast must be 1..${MAX_CHARS} characters, got ${text.length}`);
  }
  // Exactly one sentence: a single sentence-ending mark, at the very end.
  const endings = text.match(/[.!?]/g) ?? [];
  if (endings.length !== 1 || !/[.!?]$/.test(text)) {
    throw new Error("roast must be exactly one sentence");
  }
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, text, "utf8");
  console.log(`wrote ${text.length} characters to ${outPath}`);
}

main();
