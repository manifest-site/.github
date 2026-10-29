import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const provenance = JSON.parse(await fs.readFile(new URL('brand-kit/asset-provenance.json', root)));
for (const [name, expected] of Object.entries(provenance.sha256)) {
  const bytes = await fs.readFile(new URL(`assets/${name}`, root));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected, `${name}: canonical asset diverged`);
  const metadata = await sharp(bytes).metadata();
  assert.equal(metadata.width, 48);
  assert.equal(metadata.height, 48);
}
const avatarBytes = await fs.readFile(new URL('assets/manifest-sites-avatar.png', root));
const metadata = await sharp(avatarBytes).metadata();
assert.equal(metadata.width, 512);
assert.equal(metadata.height, 512);
assert.equal(metadata.hasAlpha, false);
const expectedAvatar = await sharp(await fs.readFile(new URL('assets/manifest-sites-avatar.svg', root)))
  .resize(512, 512).flatten({background:'#ffffff'}).raw().toBuffer();
assert.deepEqual(await sharp(avatarBytes).raw().toBuffer(), expectedAvatar, 'PNG differs from canonical square export');
const profile = await fs.readFile(new URL('profile/README.md', root), 'utf8');
for (const name of ['manifest-sites-mark.svg', 'manifest-sites-mark-on-dark.svg']) {
  assert(profile.includes(`https://raw.githubusercontent.com/manifest-site/.github/main/assets/${name}`));
}
assert(profile.includes('prefers-color-scheme: dark'));
assert(profile.includes('alt="Manifest Sites'));
assert(!profile.includes('manifest-sites-banner.png'));
console.log('PASS: three canonical SVG checksums, SVG dimensions, exact opaque 512 × 512 PNG and theme-aware profile references');
