#!/usr/bin/env bash
# Build the hero poster set from frame 0 of the hero clip.
#
# The browser paints the poster until the clip's first frame decodes
# (preload="metadata", so roughly a second on a cold load). Any difference
# between the two — orientation, aspect, framing — shows up as the figure
# flipping or shrinking at the hand-off. Frame 0 is the only poster that can
# match on all three, so this script derives the posters from the clip itself.
#
# Previous revision: this ran the source art ("stupid-thinker3") through
# ImageMagick, -flop'ing it to face left and -trim'ing the dead ground into a
# transparent knockout. Both steps made it disagree with the clip (which was
# generated unmirrored from the untrimmed art), and the poster's 900x535
# aspect vs the clip's 1376x736 also changed the element's height mid-load.
#
# The clip is white-on-black line art and the video element renders with
# mix-blend-mode: screen, so the black ground drops into the page ink on its
# own — no knockout or alpha channel needed.
#
# Output: static/images/home/stupid-thinker-{600,900,1366}.webp, each the same
# aspect as the clip. The figure is capped at 520 CSS px, so 1366w covers it at
# 2x on every display we care about; no 2048w variant.
set -euo pipefail

CLIP="${1:-static/video/stupid-thinker.mp4}"
OUT="static/images/home"
NAME="stupid-thinker"
mkdir -p "$OUT"

if [ ! -f "$CLIP" ]; then
  echo "missing $CLIP (the hero clip is the poster source)" >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

ffmpeg -y -loglevel error -ss 0 -i "$CLIP" -frames:v 1 "$TMP/frame0.png"

for w in 600 900 1366; do
  ffmpeg -y -loglevel error -i "$TMP/frame0.png" \
    -vf "scale=${w}:-2" \
    -c:v libwebp -lossless 0 -q:v 88 -pix_fmt yuv420p \
    "$OUT/$NAME-$w.webp"
done

for w in 600 900 1366; do
  printf "  %s-%s.webp: " "$NAME" "$w"
  ffprobe -v error -show_entries stream=width,height -of csv=p=0 "$OUT/$NAME-$w.webp"
done
