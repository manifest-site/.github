# Organization profile brand refresh verification

Source revision: initial branding commit `32b305a`; the final change adds a path-safe PNG output conversion and this evidence. Canonical source and hashes are recorded in `brand-kit/asset-provenance.json`.

## Visual evidence

These are **local draft previews** of GitHub Markdown API output, wrapped in minimal GitHub-like light/dark CSS. They are not screenshots of the live organization profile or proof of a merged update. Only asset URLs were remapped to the exact local copies for this preview; source Markdown points to public `main` paths for use after merge.

- [Light, 1100 px](profile-light.png)
- [Dark, 1100 px](profile-dark.png)
- [Dark, 390 px](profile-mobile-dark.png)

Isolated headless Chromium confirmed the light/dark picture switches to the expected file, both images have natural dimensions 48 × 48 and display at 96 × 96, and the 390 px preview has no horizontal overflow (document width 390 px). Visual inspection confirms the full site-layout/cursor mark is visible without distortion or cropping. GitHub's Markdown API retained `picture`, `source`, alt text and explicit dimensions.

## Delivery and source checks

[HTTP results](http-checks.json) record HTTP 200 for all three preserved public navigation links and all three draft-branch SVG URLs. SVGs return `image/svg+xml` and byte-match the local canonical copies. These branch delivery checks do not claim the new `main` URLs exist before merge.

All three copies pass `verify_svg_asset.py` against independently extracted canonical strings. `node scripts/verify-brand-assets.mjs` verifies SHA-256, dimensions, exact PNG pixels/opacity and profile references. `git diff --check` passes.

Independent AI source review checked exact logo bytes, public-only scope, preserved profile text/links, theme markup, provenance and stale references. Its sole Low finding (URL pathname encoding in the PNG output path) was fixed with `fileURLToPath`; a generated fixture in a directory containing a space also builds successfully. This review is not human approval. No repository-specific AGENTS or protected-main requirements were found.

The existing Sharp dependency is unchanged; no heavy build or new browser dependency was installed. No organization avatar/settings, merge, infrastructure or CLI changes were made. Git history retains retired branding.
