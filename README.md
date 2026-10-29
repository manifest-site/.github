# Manifest Sites organization profile

This repository publishes the public profile and community surface for the Manifest Sites GitHub organization.

- `profile/README.md` is rendered on the organization overview. Its absolute public asset URLs work from both the repository and organization profile after merge.
- `assets/manifest-sites-mark.svg` is the canonical A2.1 site-layout and cursor logo for light backgrounds.
- `assets/manifest-sites-mark-on-dark.svg` is its canonical dark-background variant.
- `assets/manifest-sites-avatar.svg` is the canonical rounded-square export; `assets/manifest-sites-avatar.png` is its transparent 512 × 512 PNG export, with a larger centered glyph for GitHub avatar framing. These files do not change the organization avatar setting.
- `brand-kit/asset-provenance.json` pins the source version, commit, path and SHA-256 values. See [the asset guide](brand-kit/README.md).

The organization is **Manifest Sites**. **Manifest Sites Harness** names the shared harness product; the former Manifest CMS name is deprecated. The profile uses GitHub-native typography and theme handling rather than a second custom design system.

## Brand asset workflow

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm verify
```

Copy canonical SVG strings exactly from the pinned brand-kit source; do not recreate paths, masks, colors or transforms. Update provenance and checksums together when an approved source changes. `brand-kit/avatar-export.json` records the avatar-only placement and transparency settings; the canonical SVG bytes remain untouched. The light/dark mark choice is handled by a `picture` element, with a light-background fallback and accessible image text.

The previous HQ mark, old mint/teal favicon and variation-board exports have been retired from this repository. Git history retains them; they are not the Manifest Sites A2.1 identity. No repository, CLI, infrastructure or organization settings are renamed here.
