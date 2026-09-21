#!/usr/bin/env bash
# Post-process the home figure ("stupid-thinker3") into a production WebP.
#
# v3 is the same thinker with a much larger, empty cloud thought bubble in the
# source's upper-right; after the -flop below it sits upper-left in the output,
# which is where the page overlays the thought text (see +page.svelte). The
# bigger bubble gives the cycling comments room to breathe.
#
# The source is a white-on-dark line drawing on a solid warm-grey ground
# (#24201F, ~14% luminance). The page ground is ink (#16130E), so the drawing
# ships as a knockout rather than a rectangle: the ground is crushed to zero and
# becomes the alpha channel, then the remaining RGB is flattened to paper
# (#F1ECE0) so the art sits on the page as line work. Doing it in that order
# (alpha first, colour last) keeps the antialiasing smooth and — because the RGB
# is one flat colour — lets the resize step interpolate without dark fringing.
#
#   -flop     the source faces right. The figure is placed to the right of the
#             hero copy, so it is mirrored to face the wordmark and look back
#             into the page. This also moves the thought bubble to the left.
#   -trim     the source carries ~40% dead ground around the subject; trimmed
#             away so the delivered width is the art's width (matches the way
#             scripts/process-images.sh frames the origin beats).
#
# Output: static/images/home/stupid-thinker-{600,900,1366}.webp. The figure is
# capped at 520 CSS px, so 1366w covers it at 2x on every display we care
# about; no 2048w variant.
set -euo pipefail

PAPER="#F1ECE0"

SRC="${1:-imgs/stupid-thinker3.jpg}"
OUT="static/images/home"
NAME="stupid-thinker"
mkdir -p "$OUT"

if [ ! -f "$SRC" ]; then
  echo "missing $SRC (source art is gitignored — see the note in .gitignore)" >&2
  exit 1
fi

MASTER="/tmp/$NAME-master.png"
magick "$SRC" -flop \
  \( +clone -colorspace gray -level 24%,90% \) -alpha off \
  -compose CopyOpacity -composite \
  -fuzz 2% -trim +repage \
  -fill "$PAPER" -colorize 100 \
  "$MASTER"

for w in 600 900 1366; do
  magick "$MASTER" -resize "${w}x" -quality 88 -define webp:method=6 "$OUT/$NAME-$w.webp"
done

magick identify -format "master: %wx%h (trimmed from source)\n" "$MASTER"
for w in 600 900 1366; do
  magick "$OUT/$NAME-$w.webp" -format "  $NAME-$w.webp: %wx%h  %b\n" info:
done