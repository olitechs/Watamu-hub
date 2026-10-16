#!/usr/bin/env node
/**
 * Generates clearly-marked placeholder JPGs for activity photos that don't
 * have a real image yet.
 *
 * Usage: node scripts/gen-activity-placeholders.mjs
 */

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const OUT = join(ROOT, "public", "images", "activities");

const placeholders = [
  ["marine-park-snorkelling", 1],
  ["marine-park-snorkelling", 2],
  ["marine-park-snorkelling", 3],
  ["marine-park-snorkelling", 4],
  ["dhow-sunset-cruise", 1],
  ["dhow-sunset-cruise", 2],
  ["dhow-sunset-cruise", 3],
  ["dhow-sunset-cruise", 4],
  ["deep-sea-fishing", 1],
  ["deep-sea-fishing", 2],
  ["deep-sea-fishing", 3],
  ["deep-sea-fishing", 4],
  ["kitesurfing-lessons", 1],
  ["kitesurfing-lessons", 2],
  ["kitesurfing-lessons", 3],
  ["kitesurfing-lessons", 4],
  ["mida-creek-bird-walk", 1],
  ["mida-creek-bird-walk", 2],
  ["mida-creek-bird-walk", 3],
  ["mida-creek-bird-walk", 4],
  ["turtle-rescue-centre", 1],
  ["turtle-rescue-centre", 2],
  ["turtle-rescue-centre", 3],
  ["turtle-rescue-centre", 4],
  ["gedi-ruins-tour", 1],
  ["gedi-ruins-tour", 2],
  ["gedi-ruins-tour", 3],
  ["gedi-ruins-tour", 4],
  ["arabuko-sokoke-forest-trip", 1],
  ["arabuko-sokoke-forest-trip", 2],
  ["arabuko-sokoke-forest-trip", 3],
  ["arabuko-sokoke-forest-trip", 4],
  ["malindi-night-market", 1],
  ["malindi-night-market", 2],
  ["malindi-night-market", 3],
  ["malindi-night-market", 4],
  ["malindi-gedi-museum", 1],
  ["malindi-gedi-museum", 2],
  ["malindi-gedi-museum", 3],
  ["malindi-gedi-museum", 4],
  ["marafa-stone-forest", 1],
  ["marafa-stone-forest", 2],
  ["marafa-stone-forest", 3],
  ["marafa-stone-forest", 4],
  ["marafa-creek-boardwalk", 1],
  ["marafa-creek-boardwalk", 2],
  ["marafa-creek-boardwalk", 3],
  ["marafa-creek-boardwalk", 4],
];

const W = 1200, H = 900;
for (const [slug, n] of placeholders) {
  const dir = join(OUT, slug);
  mkdirSync(dir, { recursive: true });
  const outPath = join(dir, `${n}.jpg`);
  const safeSlug = slug;
  const cmd = [
    "ffmpeg", "-v", "error", "-f", "lavfi", "-i", `color=c=0xb2a488:s=${W}x${H}:d=1`,
    "-vf", `drawtext=text='${safeSlug}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2,drawtext=text='Photo ${n} of 4':fontcolor=white:fontsize=32:x=(w-text_w)/2:y=(h-text_h)/2+80,drawtext=text='PLACEHOLDER add real photo':fontcolor=0xff6b4a:fontsize=28:x=(w-text_w)/2:y=(h-text_h)/2+150`,
    "-frames:v", "1", "-c:v", "mjpeg", "-q:v", "3", outPath,
  ].join(" ");
  execSync(cmd, { stdio: "pipe" });
  console.log(`wrote ${outPath}`);
}
console.log("done");
