"""Asset pipeline: process selected photos -> public/images (part 1: photos)."""
from PIL import Image
import os

CAND1 = "/home/z/my-project/assets/cand"
CAND2 = "/home/z/my-project/assets/cand2"
PUB = "/home/z/my-project/public/images"
os.makedirs(PUB, exist_ok=True)

def process(src, out, max_w=1920, quality=80, crop_bottom=0.0, crop_top=0.0):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    if crop_bottom or crop_top:
        im = im.crop((0, int(h * crop_top), w, int(h * (1 - crop_bottom))))
    if im.width > max_w:
        im = im.resize((max_w, int(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(out, "JPEG", quality=quality, optimize=True, progressive=True)
    print(out, im.size)

# hero: jungle-view massage, bright
process(f"{CAND2}/a11e194e9858.jpg", f"{PUB}/hero.jpg", 1920, 82)
# services
process(f"{CAND2}/90c79590acef.jpg", f"{PUB}/svc-bali.jpg", 1200, 80)      # balinese: frangipani hair, hands on shoulder
process(f"{CAND2}/1acf7ae2d889.jpg", f"{PUB}/svc-aroma.jpg", 1200, 80)     # copper bowl ritual, sheer curtains
process(f"{CAND1}/3f4dec4b26df.jpg", f"{PUB}/svc-deep.jpg", 1200, 80)      # deep pressure shoulder, bright
process(f"{CAND1}/8fc1c192bdd6.jpeg", f"{PUB}/svc-stone.jpg", 1200, 80)    # hot stones + candles
process(f"{CAND1}/2dbd4b41717d.webp", f"{PUB}/svc-foot.jpg", 1200, 80)     # foot reflexology bright
process(f"{CAND2}/b190961b2b41.jpg", f"{PUB}/svc-couple.jpg", 1200, 80)    # couple side by side
# about / gallery
process(f"{CAND1}/91297edc4f0d.jpg", f"{PUB}/about-bath.jpg", 1100, 80)    # petal bath
process(f"{CAND2}/22da45d6a3f9.jpg", f"{PUB}/about-ritual.jpg", 1100, 80)  # foot ritual traditional
process(f"{CAND1}/30e6e502f7e3.jpg", f"{PUB}/about-minimal.jpg", 1100, 80) # minimal plant window
process(f"{CAND1}/009f8f205528.jpg", f"{PUB}/gallery-pool.jpg", 1100, 80, crop_bottom=0.085)  # pool massage (crop watermark)
process(f"{CAND1}/a42dff775236.jpg", f"{PUB}/gallery-gazebo.jpg", 1100, 80) # gazebo garden
print("photos done")
