#!/usr/bin/env bash
# Post-process the v3 generator PNGs into production WebP beat images.
#
# The image is rendered as a band under the copy (see routes/origin), so it is
# tightly framed: the subject is scaled to a uniform height and centred on a
# short canvas — no big empty field, so the band shows the art, not dead space.
#   1. trim to the subject (fuzz tuned so faint dark grounds are removed);
#   2. scale to a fixed height (uniform across beats — "fit in a box" made wide
#      subjects shrink and tall ones dominate);
#   3. bed on a #000000 canvas and snap to the exact brand hexes (which also
#      re-hardens the edges the upscale softened);
#   4. encode WebP 600/900/1366/2048w.
set -euo pipefail

INK="#000000"
PAPER="#F1ECE0"
BLOOD="#FF5A5F"
GOLD="#E5C158"

SRC="imgs/v3"
OUT="static/images/origin"
CW=2048          # canvas width
CH=440           # canvas height — tight around the subject
SUBJ_H=340       # every subject is scaled to this height
SUBJ_W=1500      # width cap (only matters for the very wide subjects)
mkdir -p "$OUT"

declare -A PALETTE=(
  [beat-1]="$INK $PAPER $GOLD"
  [beat-2]="$INK $PAPER"
  [beat-3]="$INK $PAPER $BLOOD"
  [beat-4]="$INK $GOLD $BLOOD"
  [beat-5]="$INK $PAPER $BLOOD"
  [beat-6]="$INK $BLOOD $PAPER"
  [beat-7]="$INK $PAPER $GOLD"
  [og-origin]="$INK $PAPER $BLOOD"
)

for id in beat-1 beat-2 beat-3 beat-4 beat-5 beat-6 beat-7; do
  args=()
  for c in ${PALETTE[$id]}; do args+=("xc:$c"); done
  magick "${args[@]}" +append "/tmp/pal-$id.png"

  magick -size "${CW}x${CH}" xc:"$INK" \
    \( "$SRC/$id.png" -fuzz 18% -trim +repage -filter Lanczos -resize "x${SUBJ_H}" -resize "${SUBJ_W}x>" \) \
    -gravity center -composite \
    -dither none -remap "/tmp/pal-$id.png" \
    "/tmp/$id-master.png"

  for w in 600 900 1366 2048; do
    magick "/tmp/$id-master.png" -resize "${w}x" -quality 88 -define webp:method=6 "$OUT/$id-$w.webp"
  done
  rm -f "/tmp/pal-$id.png" "/tmp/$id-master.png"
  echo "processed $id"
done

# OG share card: straight from the source (its own composition, bold type).
magick "$SRC/og-origin.png" -resize 1200x630^ -gravity center -extent 1200x630 \
  -quality 88 "$OUT/og-origin.jpg"
echo "processed og-origin"

echo "=== per-file 2048w + OG ==="
du -h "$OUT"/beat-*-2048.webp "$OUT"/og-origin.jpg
echo "=== combined 2048w ==="
du -ch "$OUT"/beat-*-2048.webp | tail -1
