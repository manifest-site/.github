# Manifest Sites organization profile

This repository publishes the public profile and community surface for the Manifest Sites GitHub organization.

- `profile/README.md` is rendered on the organization overview.
- `assets/manifest-mark.svg` is a byte-identical copy of the canonical Manifest mark.
- `assets/manifest-logo-approved.svg` is the approved mint rounded-square logo variation.
- `assets/manifest-sites-avatar.png` is a non-transparent PNG rendered from that approved variation.
- `assets/manifest-sites-banner.png` is the organization README banner.
- `scripts/build-brand-assets.mjs` reproducibly builds the raster treatments from the canonical mark.

The canonical mark source is `apps/client/public/icon.svg` in the Manifest CMS repository. When the mark changes, replace `assets/manifest-mark.svg`, verify byte equivalence, review the approved square variation, and rebuild the raster assets.

## Brand asset workflow

```bash
pnpm install
pnpm build
pnpm verify
```

Commit the approved source variation, generated assets, and checksum update together so Git history records the complete branding decision.
