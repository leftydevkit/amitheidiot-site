#!/usr/bin/env bash
# Regenerate the parchment background for /bill.
#
#   bash scripts/make-parchment.sh
#
# Writes static/images/bill/parchment.webp (1000x1714) and parchment-sm.webp
# (700x1200). Requires ImageMagick 7 (`magick`).
#
# WHY IT IS GENERATED RATHER THAN A FOUND IMAGE
#
# The first version of the bill page drew its paper with CSS gradients — a
# radial-gradient plus four inset shadows standing in for toning and edge burn.
# At this size that reads as a smooth beige rectangle with a vignette, because a
# gradient has no grain: every pixel of a given radius is the same value, and
# real paper is never that. So the texture is synthesised instead: two octaves
# of noise (a wide, slow blotch layer for the dye unevenness through the sheet,
# and a fine fiber layer for the grain), multiplied together, then tone-mapped
# onto a parchment ramp with -clut.
#
# NON-REPEATING ON PURPOSE
#
# This makes ONE page-sized image, not a seamless tile. Tiling would need the
# opposite edges to match, and getting that right by hand is fiddly (rolling and
# unrolling does not fix it — rolling is its own inverse, so the seam comes
# straight back). A single large background has no seam to fix and also avoids
# the visible repetition a tile produces down a long document, which is the more
# obvious artefact of the two. The cost is a fixed pixel size, which is why
# background-size is `100% 100%` in the page CSS.
set -euo pipefail

cd "$(dirname "$0")/.."
OUT=static/images/bill
mkdir -p "$OUT"

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

# 1. Blotch: low-frequency mottling. Big blur of noise = uneven dye.
magick -size 1400x2400 xc:gray50 \
  -attenuate 1.4 +noise Gaussian -blur 0x22 -normalize "$WORK/blotch.png"

# 2. Fiber: high-frequency grain, kept subtle (0.45 attenuation, 0.7 blur) so it
#    reads as paper tooth rather than TV static. The first attempt used 0.9/0.35
#    and the result was visibly noisy at 100%.
magick -size 1400x2400 xc:gray50 \
  -attenuate 0.45 +noise Gaussian -blur 0x0.7 -normalize -level 45%,55% "$WORK/fiber.png"

# 3. Multiply the two, flatten to a full-range grey ramp.
magick "$WORK/blotch.png" "$WORK/fiber.png" \
  -compose multiply -composite -colorspace Gray -auto-level "$WORK/base.png"

# 4. Map grey -> parchment. A gradient CLUT is what makes this look like paper
#    rather than grey noise with a beige overlay: the shadow end is warm and
#    slightly brown, the highlight end near-white, so the grain carries colour.
magick -size 1x256 gradient:'#cdbb95-#f4eedd' "$WORK/clut.png"
magick "$WORK/base.png" -colorspace Gray "$WORK/clut.png" -clut "$WORK/toned.png"

# 5. Desaturate. The raw CLUT lands around R206 G186 B146, which is a saturated
#    gold; modulate to 55% saturation gives antique cream (R202 G194 B175).
magick "$WORK/toned.png" -modulate 100,55,100 -depth 8 "$WORK/final.png"

magick "$WORK/final.png" -resize 1000x1714 -quality 58 -define webp:method=6 "$OUT/parchment.webp"
magick "$WORK/final.png" -resize 700x1200  -quality 62 -define webp:method=6 "$OUT/parchment-sm.webp"

echo "wrote:"
ls -la "$OUT" | awk 'NR>3 {printf "  %-22s %6.0f KB\n", $9, $5/1024}'
