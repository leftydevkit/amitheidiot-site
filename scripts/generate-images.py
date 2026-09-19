#!/usr/bin/env python3
"""Generate the /origin beat images via OpenRouter (Gemini image model).

v3 (2026-09-18): American civic iconography, one image per beat, each backing
that beat's line. Flat near-black #16130E ground, full opacity (no CSS dimming),
flat vector-quality shapes. Output PNGs land in imgs/v3/; scripts/process-images.sh
then snaps them to the exact brand hexes and encodes the WebP set.

Key: OPENROUTER_API_KEY (the live one is exported from ~/.bashrc).

    python3 scripts/generate-images.py            # all eight
    python3 scripts/generate-images.py beat-3     # one
"""
import base64
import concurrent.futures
import json
import os
import pathlib
import re
import sys
import urllib.request

MODEL = "google/gemini-3-pro-image"  # ~$0.14/image at time of writing
OUT = pathlib.Path(__file__).resolve().parent.parent / "imgs" / "v3"

STYLE = (
    "High-contrast flat LINE-ART poster, screen-print / woodcut, in the American civic poster "
    "tradition. The ENTIRE background is flat solid PURE BLACK #000000 — true black, NOT grey, "
    "NOT brown, no gradient, no vignette, no texture, no grain, no paper, no blur. Draw the subject "
    "as clean thin confident OUTLINE line-work, never as big solid filled blocks, so the frame stays "
    "mostly empty black. Shapes have hard crisp vector edges: no shading, no soft shadows, no glow, "
    "no 3D, no photorealism, no halftone. Palette strictly pure black ground plus at most two of "
    "bone #F1ECE0, blood red #FF5A5F, gold #E5C158, flag blue #4169E1. "
    "The subject is small and sits low in the frame, fully inside the frame and never cropped; keep "
    "the top two-thirds as empty black space. Absolutely NO text, NO words, NO lettering, NO numbers "
    "and no signage text anywhere in the image. "
    "Landscape 16:9. Render large and sharp. "
)

SUBJECTS = {
    "beat-1": (
        "Subject: a single steel ballot drop-box, sealed slot, drawn as flat bone-grey panels with a thin "
        "gold ballot edge showing at the slot. One object only, low and centred, vast empty black above it. "
        "Colours: near-black, bone-grey, one thin gold accent."
    ),
    "beat-2": (
        "Subject: the front of a shuttered American house at night — a closed front door, drawn blinds, a "
        "porch light switched off, and an empty flag bracket mounted beside the door with no flag in it. "
        "Drawn as flat bone line-work, no people, no street, no car. Colours: near-black and bone only."
    ),
    "beat-3": (
        "Subject: rows of folding chairs at a town-hall meeting, every chair filled with a flat bone "
        "silhouette figure except one single empty chair, which is outlined in blood red. Colours: "
        "near-black, bone, that one red outline."
    ),
    "beat-4": (
        "Subject: the Liberty Bell, cracked — drawn as flat gold line-work with the crack rendered as one "
        "blood-red seam. The bell alone, centred low, nothing else in the frame. Colours: near-black, gold, red."
    ),
    "beat-5": (
        "Subject: three lawn signs in a row on the ground — the left sign filled and crisp, the middle sign "
        "faded and torn, the right sign completely blank — with a single thin blood-red line running "
        "horizontally through all three like a timeline. Colours: near-black, bone for the signs, red for "
        "the line. No text or lettering on the signs."
    ),
    "beat-6": (
        "Subject: a single faceless human figure standing at a lectern, arms crossed, drawn as one flat "
        "blood-red silhouette with no interior detail, standing on a bone-coloured horizontal line that "
        "crosses the whole frame. No face, no features, nothing else in the frame. Colours: near-black, "
        "red, bone."
    ),
    "beat-7": (
        "Subject: a classical government portico doorway seen head-on — tall columns flanking a doorway "
        "that opens onto a flat gold rectangle of light. The columns and frame are hard near-black "
        "silhouette outlined in bone; no figure stands in the doorway. Colours: near-black, bone, gold."
    ),
    "og-origin": (
        "Subject: the word IDIOT in massive flat bone slab-serif capitals filling most of the frame, "
        "crossed by one blood-red stripe. Colours: near-black, bone, one red stripe. Nothing else."
    ),
}


def api_key() -> str:
    key = os.environ.get("OPENROUTER_API_KEY")
    if key:
        return key
    # Fall back to the exported key in ~/.bashrc (the one in .credentials.yaml is stale).
    m = re.search(r'OPENROUTER_API_KEY\s*=\s*["\']?(sk-or-[^"\'\s]+)', (pathlib.Path.home() / ".bashrc").read_text())
    if not m:
        sys.exit("no OPENROUTER_API_KEY found")
    return m.group(1)


def generate(ident: str) -> tuple[str, str, float]:
    payload = {
        "model": MODEL,
        "messages": [{"role": "user", "content": STYLE + SUBJECTS[ident]}],
        "modalities": ["image", "text"],
    }
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {api_key()}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=240) as r:
            data = json.load(r)
        images = data["choices"][0]["message"].get("images") or []
        if not images:
            return ident, "no image in response", 0.0
        url = images[0]["image_url"]["url"]
        raw = base64.b64decode(url.split(",", 1)[1])
        (OUT / f"{ident}.png").write_bytes(raw)
        return ident, f"ok ({len(raw)//1024} KB)", data.get("usage", {}).get("cost", 0.0)
    except Exception as exc:  # noqa: BLE001 — surface any failure per image
        return ident, f"ERR {exc}", 0.0


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    wanted = sys.argv[1:] or list(SUBJECTS)
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(wanted)) as pool:
        results = list(pool.map(generate, wanted))
    for ident, status, cost in results:
        print(f"{ident:12s} {status}  ${cost:.4f}")
    print(f"total ${sum(c for _, _, c in results):.4f}")


if __name__ == "__main__":
    main()
