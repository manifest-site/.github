import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const mark = await fs.readFile(new URL('../assets/manifest-mark.svg', import.meta.url), 'utf8');
const markPath = mark.match(/<path d="([^"]+)"/)[1];
const selectedAvatar = await fs.readFile(
  new URL('../brand-kit/sources/teal-mint-favicon.svg', import.meta.url),
);

const palette = {
  ink: '#0b1714',
  green: '#0c8462',
  paper: '#f7f8f6',
  mint: '#d9efe6',
};

const banner = `
<svg width="1600" height="520" viewBox="0 0 1600 520" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="520" fill="${palette.paper}"/>
  <g stroke="#d9dfdc" stroke-width="1" opacity="0.7">
    ${Array.from({length: 14}, (_, i) => `<line x1="0" y1="${36 + i * 36}" x2="1600" y2="${36 + i * 36}"/>`).join('')}
  </g>
  <rect x="0" y="0" width="18" height="520" fill="${palette.green}"/>
  <g transform="translate(102 92) scale(3.2)" fill="${palette.ink}">
    <path d="${markPath}"/>
  </g>
  <text x="225" y="150" font-family="Inter, Arial, sans-serif" font-size="76" font-weight="750" fill="${palette.ink}">Manifest</text>
  <text x="555" y="150" font-family="Inter, Arial, sans-serif" font-size="76" font-weight="750" fill="${palette.green}">Sites</text>
  <text x="102" y="302" font-family="Inter, Arial, sans-serif" font-size="88" font-weight="760" fill="${palette.ink}">A clearer path</text>
  <text x="102" y="398" font-family="Inter, Arial, sans-serif" font-size="88" font-weight="760" fill="${palette.green}">to booking.</text>
  <g transform="translate(1215 100)">
    <rect width="280" height="320" fill="#fff" stroke="${palette.ink}" stroke-width="3"/>
    <rect x="20" y="20" width="280" height="320" fill="${palette.mint}" opacity="0.75"/>
    <rect x="54" y="76" width="100" height="9" fill="${palette.green}"/>
    <text x="54" y="142" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="${palette.ink}">BUILT FOR</text>
    <text x="54" y="195" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="750" fill="${palette.ink}">Tour &amp; activity</text>
    <text x="54" y="237" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="750" fill="${palette.ink}">operators.</text>
  </g>
</svg>`;

await sharp(selectedAvatar)
  .flatten({ background: '#F8FBF9' })
  .resize(512, 512)
  .png()
  .toFile(fileURLToPath(new URL('../assets/manifest-sites-avatar.png', import.meta.url)));
await sharp(Buffer.from(banner)).png().toFile(fileURLToPath(new URL('../assets/manifest-sites-banner.png', import.meta.url)));
