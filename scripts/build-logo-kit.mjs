import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sourceDir = path.join(root, 'brand-kit', 'sources');
const output = path.join(root, 'brand-kit', 'manifest-logo-variations.png');
const width = 1800;
const height = 1760;

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const variants = [
  { file: 'approved-mint-avatar.svg', title: 'Mint square', status: 'APPROVED · CURRENT GITHUB', note: 'Opaque, high-contrast avatar export', bg: '#F3F7F5' },
  { file: 'glyph-on-light.svg', title: 'Glyph on light', status: 'PRODUCTION · MANIFEST SITES', note: 'Header and light-surface app mark', bg: '#F8FBF9' },
  { file: 'glyph-on-dark.svg', title: 'Glyph on dark', status: 'PRODUCTION · MANIFEST SITES', note: 'Footer and dark-surface app mark', bg: '#0B1714' },
  { file: 'canonical-mark.svg', title: 'Canonical mark', status: 'CANONICAL · MANIFEST CMS', note: 'Single-color currentColor master glyph', bg: '#CDF4E5', currentColor: '#0B1714' },
  { file: 'transparent-black-mark.svg', title: 'Transparent mark', status: 'APPROVED EXPORT', note: 'Flexible mark; weak as a GitHub avatar', bg: 'checker' },
  { file: 'teal-mint-favicon.svg', title: 'Teal + mint', status: 'RECOVERED · DESIGN SYSTEM', note: 'Two-color favicon variation', bg: '#F8FBF9' },
  { file: 'rainbow-experimental.svg', title: 'Rainbow mark', status: 'EXPERIMENTAL · DESIGN SYSTEM', note: 'Multi-color campaign/favicon variation', bg: '#F8FBF9' },
  { lockup: 'light', title: 'Manifest Sites lockup', status: 'PRODUCTION · MARKETING HEADER', note: 'Live HTML lockup: black + brand green', bg: '#F8FBF9' },
  { lockup: 'dark', title: 'Manifest Sites lockup', status: 'PRODUCTION · MARKETING FOOTER', note: 'Live HTML lockup: white + mint', bg: '#0B1714' },
];

const checker = (x, y, w, h) => {
  const cells = [];
  const size = 24;
  for (let yy = y; yy < y + h; yy += size) for (let xx = x; xx < x + w; xx += size) {
    const odd = ((xx - x) / size + (yy - y) / size) % 2;
    cells.push(`<rect x="${xx}" y="${yy}" width="${size}" height="${size}" fill="${odd ? '#DDE3E0' : '#F6F8F7'}"/>`);
  }
  return cells.join('');
};

const lockupGlyphs = {
  light: (await fs.readFile(path.join(sourceDir, 'glyph-on-light.svg'))).toString('base64'),
  dark: (await fs.readFile(path.join(sourceDir, 'glyph-on-dark.svg'))).toString('base64'),
};

const lockupSvg = dark => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="410" height="150" viewBox="0 0 410 150">
  <rect width="410" height="150" fill="none"/>
  <g transform="translate(8 50)">
    <image href="data:image/svg+xml;base64,${dark ? lockupGlyphs.dark : lockupGlyphs.light}" x="0" y="0" width="66" height="66"/>
    <text x="84" y="48" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="650" fill="${dark ? '#FFFFFF' : '#0B1714'}">Manifest</text>
    <text x="254" y="48" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="650" fill="${dark ? '#CBFFEE' : '#009163'}">Sites</text>
  </g>
</svg>`);

const placements = [];
const cardW = 520;
const cardH = 430;
const gapX = 40;
const gapY = 34;
const startX = 80;
const startY = 300;

for (let i = 0; i < variants.length; i++) {
  const item = variants[i];
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = startX + col * (cardW + gapX);
  const y = startY + row * (cardH + gapY);
  const stageX = x + 24;
  const stageY = y + 104;
  const stageW = cardW - 48;
  const stageH = 230;
  let source;
  if (item.lockup) source = lockupSvg(item.lockup === 'dark');
  else {
    let svg = await fs.readFile(path.join(sourceDir, item.file), 'utf8');
    if (item.currentColor) svg = svg.replaceAll('currentColor', item.currentColor);
    source = Buffer.from(svg);
  }
  const fit = item.lockup ? { width: 410, height: 150 } : { width: 164, height: 164 };
  placements.push({ input: await sharp(source).resize(fit.width, fit.height, { fit: 'contain' }).png().toBuffer(), left: Math.round(stageX + (stageW - fit.width) / 2), top: Math.round(stageY + (stageH - fit.height) / 2) });
}

let cards = '';
for (let i = 0; i < variants.length; i++) {
  const item = variants[i];
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = startX + col * (cardW + gapX);
  const y = startY + row * (cardH + gapY);
  const stageX = x + 24;
  const stageY = y + 104;
  const stageW = cardW - 48;
  const stageH = 230;
  const titleColor = '#0B1714';
  cards += `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="22" fill="#FFFFFF" stroke="#D9E4DF"/>
    <text x="${x + 28}" y="${y + 43}" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1.4" fill="#167A60">${esc(item.status)}</text>
    <text x="${x + 28}" y="${y + 80}" font-family="Arial, sans-serif" font-size="27" font-weight="700" fill="${titleColor}">${esc(item.title)}</text>
    ${item.bg === 'checker' ? checker(stageX, stageY, stageW, stageH) : `<rect x="${stageX}" y="${stageY}" width="${stageW}" height="${stageH}" fill="${item.bg}"/>`}
    <rect x="${stageX}" y="${stageY}" width="${stageW}" height="${stageH}" rx="14" fill="none" stroke="#DDE6E2"/>
    <text x="${x + 28}" y="${y + 380}" font-family="Arial, sans-serif" font-size="17" fill="#4B5F58">${esc(item.note)}</text>`;
}

const base = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#F0F6F3"/>
  <text x="80" y="92" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2.4" fill="#009163">MANIFEST BRAND MEDIA KIT</text>
  <text x="80" y="157" font-family="Arial, sans-serif" font-size="52" font-weight="750" fill="#0B1714">Logo variations</text>
  <text x="80" y="204" font-family="Arial, sans-serif" font-size="22" fill="#4B5F58">Source-traced from production Sites code, the canonical CMS mark, approved exports, and prior design-system sessions.</text>
  <text x="80" y="246" font-family="Arial, sans-serif" font-size="17" fill="#64766F">Current GitHub avatar remains unchanged. “Recovered” and “experimental” options require approval before public use.</text>
  ${cards}
</svg>`);

await sharp(base).composite(placements).png({ compressionLevel: 9 }).toFile(output);
console.log(`Built ${path.relative(root, output)}`);
