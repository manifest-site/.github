import fs from 'node:fs/promises';
import sharp from 'sharp';

// Render the complete canonical export; never extract or reconstruct its geometry.
const avatar = await fs.readFile(new URL('../assets/manifest-sites-avatar.svg', import.meta.url));
await sharp(avatar)
  .resize(512, 512)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(new URL('../assets/manifest-sites-avatar.png', import.meta.url).pathname);
