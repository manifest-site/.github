# Manifest Sites organization profile

This repository publishes the public profile and community surface for the Manifest Sites GitHub organization.

- `profile/README.md` is rendered on the organization overview.
- `assets/manifest-mark.svg` is a byte-identical copy of the canonical Manifest mark.
- `assets/manifest-sites-avatar.png` is the square GitHub avatar treatment.
- `assets/manifest-sites-banner.png` is the organization README banner.
- `scripts/build-brand-assets.mjs` reproducibly builds the raster treatments from the canonical mark.

The canonical source is `apps/client/public/icon.svg` in the Manifest CMS repository. When the mark changes, replace `assets/manifest-mark.svg`, verify byte equivalence, and rebuild the raster assets.
