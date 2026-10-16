"""Brand assets: frangipani favicon set + OG image 1200x630 (part 2)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os, math

PUB = "/home/z/my-project/public/images"
ASSETS = "/home/z/my-project/public/assets"
FONTS = "/home/z/my-project/src/fonts"
APP = "/home/z/my-project/src/app"
os.makedirs(ASSETS, exist_ok=True)

EMERALD = (12, 59, 46)        # deep emerald
EMERALD_DK = (9, 44, 35)
CREAM = (250, 249, 242)
BRASS = (176, 141, 87)
BRASS_LT = (201, 162, 100)

def var_font(path, size, axes=None):
    f = ImageFont.truetype(path, size)
    if axes:
        try:
            f.set_variation_by_axes(axes)  # plain values in axis order
        except Exception as e:
            print("variation warn:", e)
    return f

# Fraunces axis order: opsz(9-144), wght(100-900), SOFT(0-100), WONK(0-1)
# Inter axis order: opsz(14-32), wght(100-900)

def fraunces(size, wght=600, opsz=144):
    return var_font(FRAUNCES, size, [opsz, wght, 0, 0])

def inter(size, wght=500, opsz=32):
    return var_font(INTER, size, [opsz, wght])

def draw_frangipani(size, petal_color, center_color, bg=None, padding=0.14):
    """Draw a 5-petal frangipani mark with separated, tapered petals (point-rotation)."""
    S = size
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0) if bg is None else bg)
    d = ImageDraw.Draw(im)
    cx, cy = S / 2, S / 2
    R = S / 2 * (1 - 2 * padding)   # petal tip radius
    gap = R * 0.30                  # inner gap between center and petal base
    petal_len = R - gap
    max_w = R * 0.46                # widest petal width
    N = 48
    for i in range(5):
        a = math.radians(i * 72 - 90)
        ca, sa = math.cos(a), math.sin(a)
        pts = []
        for k in range(N + 1):
            t = k / N
            w = max_w * math.sin(math.pi * (t ** 0.75))
            y = -gap - petal_len * t
            pts.append((-w / 2, y))
        for k in range(N, -1, -1):
            t = k / N
            w = max_w * math.sin(math.pi * (t ** 0.75))
            y = -gap - petal_len * t
            pts.append((w / 2, y))
        rot = [(cx + x * ca - y * sa, cy + x * sa + y * ca) for x, y in pts]
        d.polygon(rot, fill=petal_color)
    r = R * 0.16
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=center_color)
    return im

FRAUNCES = f"{FONTS}/Fraunces-Variable.ttf"
INTER = f"{FONTS}/Inter-Variable.ttf"

# ---------------- favicon / icons ----------------
icon_master = draw_frangipani(1024, CREAM + (255,), BRASS_LT + (255,), bg=EMERALD + (255,))
# rounded corners for master (squircle-ish radius 22%)
rad = int(1024 * 0.22)
mask = Image.new("L", (1024, 1024), 0)
md = ImageDraw.Draw(mask)
md.rounded_rectangle([0, 0, 1024, 1024], radius=rad, fill=255)
out = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
out.paste(icon_master, (0, 0), mask)

sizes = {"icon-512.png": 512, "icon-192.png": 192, "apple-icon.png": 180, "icon-32.png": 32}
os.makedirs(APP, exist_ok=True)
for name, s in sizes.items():
    img = out.resize((s, s), Image.LANCZOS)
    path = os.path.join(APP, name)
    if name == "icon-32.png":
        img.save(os.path.join(APP, "favicon-32.png"))
    img.save(path)
    if name == "icon-32.png":
        os.remove(path)
    print("saved", name, s)
# favicon.ico (16+32+48)
ico_sizes = [(16, 16), (32, 32), (48, 48)]
out.save(os.path.join(APP, "favicon.ico"), format="ICO", sizes=ico_sizes)
print("saved favicon.ico")
# transparent frangipani for site decor
mark = draw_frangipani(512, CREAM + (255,), BRASS_LT + (255,))
mark.save(f"{ASSETS}/frangipani-cream.png")
mark_dark = draw_frangipani(512, EMERALD + (255,), BRASS + (255,))
mark_dark.save(f"{ASSETS}/frangipani-emerald.png")
print("saved marks")

# ---------------- OG image 1200x630 ----------------
W, H = 1200, 630
og = Image.new("RGB", (W, H), EMERALD)
d = ImageDraw.Draw(og)

# subtle texture: large translucent frangipani outline top-left
deco = draw_frangipani(760, (250, 249, 242, 9), (201, 162, 100, 12))
og.paste(deco, (-190, -180), deco)

# right photo panel
photo = Image.open(f"{PUB}/hero.jpg").convert("RGB")
# crop photo to right panel 500x630 from center-right
panel_w, panel_h = 500, 630
pw, ph = photo.size
target_ratio = panel_w / panel_h
src_ratio = pw / ph
if src_ratio > target_ratio:
    new_w = int(ph * target_ratio)
    x0 = (pw - new_w) // 2
    photo = photo.crop((x0, 0, x0 + new_w, ph))
else:
    new_h = int(pw / target_ratio)
    y0 = (ph - new_h) // 3
    photo = photo.crop((0, y0, pw, y0 + new_h))
photo = photo.resize((panel_w, panel_h), Image.LANCZOS)
photo = ImageEnhance.Color(photo).enhance(0.82)
photo = ImageEnhance.Brightness(photo).enhance(0.96)
# emerald duotone wash
wash = Image.new("RGB", (panel_w, panel_h), EMERALD)
photo = Image.blend(photo, wash, 0.18)
og.paste(photo, (W - panel_w, 0))
# brass hairline between panels
d.rectangle([W - panel_w - 2, 0, W - panel_w, H], fill=BRASS)

# left text block
f_kicker = inter(21, 600)
# letter-spaced kicker
kicker = "H O M E   M A S S A G E   B A L I"
d.text((84, 108), kicker, font=f_kicker, fill=BRASS_LT)

f_word = fraunces(148, 620)
d.text((76, 150), "Amerta", font=f_word, fill=CREAM)

f_sub = inter(30, 430)
d.text((84, 340), "Pijat profesional, datang ke vila Anda.", font=f_sub, fill=(226, 232, 220))

# brass divider
d.rectangle([86, 408, 240, 410], fill=BRASS)

f_area = inter(23, 500)
d.text((84, 442), "Canggu  ·  Seminyak  ·  Berawa  ·  Kerobokan", font=f_area, fill=(191, 209, 190))

f_foot = inter(19, 500)
d.text((84, 540), "Terapis bersertifikat  ·  Respon WhatsApp < 5 menit", font=f_foot, fill=(160, 180, 160))

# small frangipani mark at top-right of text panel (clear of text)
mk = draw_frangipani(72, CREAM + (255,), BRASS_LT + (255,))
og.paste(mk, (W - panel_w - 100, 84), mk)

og.save("/home/z/my-project/public/og-image.jpg", "JPEG", quality=88, optimize=True)
print("saved og-image.jpg", og.size)
