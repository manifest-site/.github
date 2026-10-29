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
assert.equal(metadata.hasAlpha, true, 'Avatar requires real transparency');
const { data, info } = await sharp(avatarBytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const pixel = (x,y) => [...data.subarray((y*info.width+x)*4,(y*info.width+x)*4+4)];
for (const [x,y] of [[0,0],[511,0],[0,511],[511,511]]) assert.equal(pixel(x,y)[3],0,'Corners must be transparent');
let whiteBox = [512,512,-1,-1], partial = 0;
for (let y=0;y<512;y++) for (let x=0;x<512;x++) {
  const [r,g,b,a] = pixel(x,y);
  if(a>0 && a<255) {
    partial++;
    assert.equal(r,0,'Partial-alpha edge must contain no white matte');
    assert(Math.abs((g-145)*a/255)<=1 && Math.abs((b-99)*a/255)<=1,'Premultiplied edge color must match logo green within8-bit rounding');
  }
  if(a===255 && r===255 && g===255 && b===255) {
    whiteBox=[Math.min(x,whiteBox[0]),Math.min(y,whiteBox[1]),Math.max(x,whiteBox[2]),Math.max(y,whiteBox[3])];
    assert((x-255.5)**2+(y-255.5)**2 < 256**2,'White glyph must fit within a circular avatar crop');
  }
}
assert(partial>0,'Expected antialiased transparent tile edge');
assert(Math.abs((whiteBox[0]+whiteBox[2])/2-255.5)<2,'Glyph must be centered horizontally');
assert(Math.abs((whiteBox[1]+whiteBox[3])/2-255.5)<2,'Glyph must be centered vertically');
assert(whiteBox[2]-whiteBox[0]+1>=378 && whiteBox[2]-whiteBox[0]+1<=382,'Glyph should occupy about74% of width');
for(const size of [32,48,96]) {
  const {data: small,info: sm}=await sharp(avatarBytes).resize(size,size).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  for(const index of [0,size-1,(size-1)*size,size*size-1])assert.equal(small[index*4+3],0,`${size}px corner alpha`);
  assert.equal(sm.channels,4);
}
console.log('Avatar alpha/centering:', JSON.stringify({whiteBox,partialAlphaPixels:partial}));
const profile = await fs.readFile(new URL('profile/README.md', root), 'utf8');
for (const name of ['manifest-sites-mark.svg', 'manifest-sites-mark-on-dark.svg']) {
  assert(profile.includes(`https://raw.githubusercontent.com/manifest-site/.github/main/assets/${name}`));
}
assert(profile.includes('prefers-color-scheme: dark'));
assert(profile.includes('alt="Manifest Sites'));
assert(!profile.includes('manifest-sites-banner.png'));
console.log('PASS: three canonical SVG checksums, SVG dimensions, transparent centered 512 × 512 RGBA PNG and32/48/96px alpha and theme-aware profile references');
