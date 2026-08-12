import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const approvedLogo = await fs.readFile(
  new URL('../assets/manifest-logo-approved.svg', import.meta.url),
);
const approvedLogoSha = createHash('sha256').update(approvedLogo).digest('hex');

assert.equal(
  approvedLogoSha,
  'e099a87e97642bab7f0083c9222b33daf0ea468ede4b967a653b4130e498a898',
  'Approved Manifest logo variation has changed; review and update its expected checksum.',
);

const avatar = sharp(
  fileURLToPath(new URL('../assets/manifest-sites-avatar.png', import.meta.url)),
);
const metadata = await avatar.metadata();

assert.equal(metadata.width, 512, 'Avatar must be 512px wide.');
assert.equal(metadata.height, 512, 'Avatar must be 512px high.');
assert.equal(metadata.hasAlpha, false, 'Avatar must not contain transparency.');

console.log('PASS: approved logo checksum and opaque 512×512 avatar verified');
