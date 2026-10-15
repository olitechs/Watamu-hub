#!/usr/bin/env node
/**
 * Generates src/lib/lqip.ts — tiny base64 JPEG blur placeholders for every
 * image under public/images/ (recursively). Run after adding or replacing
 * images:
 *
 *   node scripts/generate-lqip.mjs
 *
 * Uses ffmpeg (already required for video work). Keeps blur-up
 * placeholders out of hand-maintained data files.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const root = process.cwd();
const imagesDir = join(root, "public", "images");
const outFile = join(root, "src", "lib", "lqip.ts");

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if ([".jpg", ".jpeg"].includes(extname(entry).toLowerCase())) out.push(p);
  }
  return out;
}

const entries = [];
for (const file of walk(imagesDir).sort()) {
  const b64 = execFileSync(
    "ffmpeg",
    ["-v", "error", "-i", file, "-vf", "scale=20:-1", "-q:v", "6", "-f", "image2pipe", "-vcodec", "mjpeg", "-"],
    { maxBuffer: 1 << 24 },
  ).toString("base64");
  const publicPath = "/" + relative(join(root, "public"), file).split("\\").join("/");
  entries.push(`  ${JSON.stringify(publicPath)}: "data:image/jpeg;base64,${b64}",`);
  console.log(`${publicPath} -> ${b64.length} chars`);
}

const content = `// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/generate-lqip.mjs
// Tiny (20px) base64 JPEG blur-up placeholders keyed by public path.

export const lqip: Record<string, string> = {
${entries.join("\n")}
};

/** Blur data URL for a public image path ("" when unknown). */
export function blurFor(src: string): string {
  return lqip[src] ?? "";
}
`;

writeFileSync(outFile, content);
console.log(`wrote ${relative(root, outFile)} (${entries.length} images)`);
