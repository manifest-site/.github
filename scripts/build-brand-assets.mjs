import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const settings = JSON.parse(await fs.readFile(new URL('brand-kit/avatar-export.json', root)));
const canonical = await fs.readFile(new URL(settings.source, root), 'utf8');
const from = `transform="${settings.canonicalOuterTransform}"`;
assert.equal(canonical.split(from).length, 2, 'Expected canonical outer placement exactly once');
// Owner-requested export layout only. Canonical source and all paths/masks/colors stay intact.
const exportSvg = canonical.replace(from, `transform="${settings.exportOuterTransform}"`);
await sharp(Buffer.from(exportSvg)).resize(settings.size, settings.size).ensureAlpha().png()
  .toFile(fileURLToPath(new URL(settings.output, root)));
