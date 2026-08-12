import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const selectedLogo = await fs.readFile(
  new URL('../brand-kit/sources/teal-mint-favicon.svg', import.meta.url),
);
const selectedLogoSha = createHash('sha256').update(selectedLogo).digest('hex');

assert.equal(
  selectedLogoSha,
  'c16838291733b04aa5f3aa80a6a4493c15def30ae385b548c8e069b961f48c3a',
  'Selected teal-and-mint Manifest logo has changed; review and update its expected checksum.',
);

const avatar = sharp(
  fileURLToPath(new URL('../assets/manifest-sites-avatar.png', import.meta.url)),
);
const metadata = await avatar.metadata();

assert.equal(metadata.width, 512, 'Avatar must be 512px wide.');
assert.equal(metadata.height, 512, 'Avatar must be 512px high.');
assert.equal(metadata.hasAlpha, false, 'Avatar must not contain transparency.');

console.log('PASS: selected teal-and-mint logo checksum and opaque 512×512 avatar verified');
