#!/usr/bin/env node
// Generate the site's default Open Graph image: public/og-default.png
// 1200x630, 8-bit RGB, no external dependencies (uses Node's built-in zlib).
// Design: solid background (#0f172a) with a centered accent card (#2563eb),
// matching the tokens declared in src/consts.ts and prd.md §12.
//
// Regenerate with: node scripts/generate-og.mjs
// The generated PNG is checked in so the build is self-contained.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '..', 'public', 'og-default.png');

// --- Canvas (1200x630) ---
const W = 1200;
const H = 630;
const BG = [0x0f, 0x17, 0x2a]; // #0f172a dark slate (background, prd.md §12)
const CARD = [0x25, 0x6e, 0xeb]; // #2563eb accent blue (card, prd.md §12)
const cardX = 200;
const cardY = 115;
const cardW = 800;
const cardH = 400;

// --- Build raw scanlines: each row = filter byte (0=None) + W*3 RGB bytes ---
const rowLen = 1 + W * 3;
const raw = Buffer.alloc(rowLen * H);
for (let y = 0; y < H; y++) {
  const rowStart = y * rowLen;
  raw[rowStart] = 0;
  const inCardY = y >= cardY && y < cardY + cardH;
  for (let x = 0; x < W; x++) {
    const c = inCardY && x >= cardX && x < cardX + cardW ? CARD : BG;
    const p = rowStart + 1 + x * 3;
    raw[p] = c[0];
    raw[p + 1] = c[1];
    raw[p + 2] = c[2];
  }
}

// --- CRC32 (PNG, polynomial 0xEDB88320, reflected) ---
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

// --- Assemble PNG: signature + IHDR + IDAT + IEND ---
const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); // width
ihdr.writeUInt32BE(H, 4); // height
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type: RGB
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace

const idat = deflateSync(raw);
const png = Buffer.concat([
  sig,
  chunk('IHDR', ihdr),
  chunk('IDAT', idat),
  chunk('IEND', Buffer.alloc(0)),
]);

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, png);
console.log(`Wrote ${outPath} (${png.length} bytes, ${W}x${H} RGB).`);
