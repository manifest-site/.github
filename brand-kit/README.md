# Manifest Sites brand assets

The current identity is **A2.1**: a site-layout mark with an inner cursor and the original spark/edge. These are exact canonical exports, not traced artwork.

| Asset | Use | Preview |
| --- | --- | --- |
| [Light-background mark](../assets/manifest-sites-mark.svg) | Canonical logo green `#009163` | <img src="../assets/manifest-sites-mark.svg" alt="Manifest Sites A2.1 light-background mark" width="72" height="72"> |
| [Dark-background mark](../assets/manifest-sites-mark-on-dark.svg) | Canonical logo green with the mint `#CBFFEE` cursor | <img src="../assets/manifest-sites-mark-on-dark.svg" alt="Manifest Sites A2.1 dark-background mark" width="72" height="72"> |
| [Square export](../assets/manifest-sites-avatar.svg) | White mark on logo green | <img src="../assets/manifest-sites-avatar.svg" alt="Manifest Sites A2.1 square export" width="72" height="72"> |

The approved source is `packages/brand-showcase/canonical-assets.json` in `manifest-site-dev/manifest-sites-brand-kit`, pinned to merged commit `e6d99efef37ab3b5b25786461dafe24b5969425a`. [Asset provenance](asset-provenance.json) records the exact checksums. Only the three standalone logo exports are copied here; no application mockups or internal review media are included.

The design system distinguishes the logo green from UI teal `#20B58B`, mint `#99FED6`, ink `#0A0A0A` and white surfaces. Stage colors describe work states; the Analyze color is not the universal corporate logo default. GitHub controls profile fonts and interface colors, so the profile uses native headings, paragraphs and links around the theme-aware logo.

The [avatar export settings](avatar-export.json) preserve the canonical square tile and all logo paths/masks/colors. The owner-requested PNG uses a transparent exterior and a centered glyph at 1.5 times the canonical avatar placement scale. Only the outer glyph transform changes for the PNG export; canonical SVGs remain byte-identical. White logo strokes remain opaque.

Run `pnpm build` for the PNG export and `pnpm verify` for SVG identity, dimensions, PNG alpha/centering and profile reference checks. Updating these files does not change the GitHub organization avatar setting.
