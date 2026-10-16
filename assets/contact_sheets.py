from PIL import Image, ImageDraw, ImageFont
import glob, os

SRC = "/home/z/my-project/assets/cand"
OUT = "/home/z/my-project/assets"
files = sorted(glob.glob(os.path.join(SRC, "*")))
THUMB = (360, 270)
COLS = 4
LABEL_H = 26

try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 17)
except Exception:
    font = ImageFont.load_default()

# split into sheets of 12
chunks = [files[i:i+12] for i in range(0, len(files), 12)]
for si, chunk in enumerate(chunks):
    rows = (len(chunk) + COLS - 1) // COLS
    W = COLS * (THUMB[0] + 8) + 8
    H = rows * (THUMB[1] + LABEL_H + 8) + 8
    sheet = Image.new("RGB", (W, H), "#f5f5f0")
    d = ImageDraw.Draw(sheet)
    for i, fp in enumerate(chunk):
        try:
            im = Image.open(fp).convert("RGB")
        except Exception:
            continue
        im.thumbnail(THUMB)
        x = 8 + (i % COLS) * (THUMB[0] + 8)
        y = 8 + (i // COLS) * (THUMB[1] + LABEL_H + 8)
        sheet.paste(im, (x + (THUMB[0]-im.width)//2, y + (THUMB[1]-im.height)//2))
        name = os.path.basename(fp)
        d.text((x, y + THUMB[1] + 4), name, fill="#111111", font=font)
    out = os.path.join(OUT, f"sheet_{si+1}.jpg")
    sheet.save(out, quality=82)
    print(out, sheet.size)
