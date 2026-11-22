import math, random, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont
from tokens import *

random.seed(7)
here = os.path.dirname(os.path.abspath(__file__))
frames = os.path.join(here, "frames")
os.makedirs(frames, exist_ok=True)
_f = {}
def font(path, size):
    k = (path, size)
    if k not in _f: _f[k] = ImageFont.truetype(path, int(size*SS))
    return _f[k]
def S(v): return v*SS

def text(d, xy, s, size, fill, bold=True, anchor="la"):
    d.text((S(xy[0]), S(xy[1])), s, font=font(FONT_B if bold else FONT_R, size), fill=fill, anchor=anchor)

def rrect(d, box, r, fill, outline=None, w=0):
    d.rounded_rectangle([S(v) for v in box], radius=S(r), fill=fill, outline=outline, width=S(w))

def lerp(a, b, t): return a + (b-a)*t
def mix(c1, c2, t): return tuple(int(lerp(a, b, t)) for a, b in zip(c1, c2))

def panela(d, cx, cy, shake=0, temp_t=0.0, vapor=0.0, valvula=0.0):
    """Panela de pressão em corte. temp_t 0..1 colore a água; vapor 0..1 controla bolhas."""
    ox = math.sin(shake*40)*2*valvula if valvula else 0
    cx += ox
    # corpo
    rrect(d, (cx-170, cy-90, cx+170, cy+120), 26, METAL, METAL_DK, 4)
    # interior (corte)
    rrect(d, (cx-150, cy-70, cx+150, cy+100), 18, (40, 46, 72))
    # água
    agua = mix(AGUA, QUENTE, temp_t*0.35)
    rrect(d, (cx-150, cy+10, cx+150, cy+100), 18, agua)
    d.rectangle([S(cx-150), S(cy+10), S(cx+150), S(cy+40)], fill=agua)
    # bolhas
    for i in range(int(14*vapor)+1):
        bx = cx-130 + (i*53 % 260)
        by = cy+90 - ((shake*90 + i*17) % 80)
        r = 4 + (i % 3)*2
        d.ellipse([S(bx-r), S(by-r), S(bx+r), S(by+r)], outline=BRANCO, width=S(2))
    # tampa
    rrect(d, (cx-185, cy-125, cx+185, cy-85), 16, METAL_DK, (80, 88, 106), 3)
    # alças
    rrect(d, (cx-250, cy-60, cx-170, cy-35), 10, BG, METAL_DK, 3)
    rrect(d, (cx+170, cy-60, cx+250, cy-35), 10, BG, METAL_DK, 3)
    # válvula (pino)
    d.rectangle([S(cx-8), S(cy-150), S(cx+8), S(cy-125)], fill=METAL_DK)
    rrect(d, (cx-18, cy-170, cx+18, cy-148), 6, QUENTE if valvula else METAL, METAL_DK, 3)
    return cx

def vapor_valvula(d, cx, cy, t):
    for i in range(7):
        ph = (t*1.4 + i/7.0) % 1.0
        x = cx + math.sin(ph*6 + i)*18 + ph*40
        y = cy - 175 - ph*120
        r = 8 + ph*22
        a = int(190*(1-ph))
        d.ellipse([S(x-r), S(y-r), S(x+r), S(y+r)], fill=(235, 240, 250, a))

def termometro(d, x, y, frac, temp):
    rrect(d, (x-18, y-170, x+18, y+130), 18, PANEL, METAL_DK, 3)
    h = 260*frac + 20
    cor = mix(AGUA, QUENTE, frac)
    rrect(d, (x-10, y+120-h, x+10, y+120), 10, cor)
    d.ellipse([S(x-30), S(y+100), S(x+30), S(y+160)], fill=cor, outline=METAL_DK, width=S(3))
    text(d, (x+44, y-20), f"{temp:.0f} °C", 54, BRANCO, anchor="lm")
    text(d, (x+44, y+30), "dentro da panela", 22, METAL, bold=False, anchor="lm")

def frame(i):
    t = i/FPS
    img = Image.new("RGB", (S(W), S(H)), BG)
    d = ImageDraw.Draw(img, "RGBA")
    # grade sutil
    for gx in range(0, W, 80): d.line([S(gx), 0, S(gx), S(H)], fill=(255, 255, 255, 10), width=S(1))
    for gy in range(0, H, 80): d.line([0, S(gy), S(W), S(gy)], fill=(255, 255, 255, 10), width=S(1))

    if t < 2.0:       # cena 1: título
        a = ease(t/0.6)
        sl = (1-ease(t/0.8))*60
        panela(d, 400, 400 + sl, shake=t)
        text(d, (780, 260), "Por que a panela", 52, BRANCO, anchor="lm")
        text(d, (780, 325), "de pressão", 52, BRANCO, anchor="lm")
        text(d, (780, 400), "não explode?", 66, QUENTE, anchor="lm")
        d.rectangle([S(780), S(450), S(780+int(300*ease((t-0.5)/0.8))), S(456)], fill=AMARELO)
    elif t < 5.0:     # cena 2: ferve mais quente
        k = ease((t-2.0)/2.4)
        temp = lerp(100, 120, k)
        panela(d, 400, 400, shake=t, temp_t=k, vapor=min(1, (t-2)/1.0))
        termometro(d, 800, 380, k, temp)
        text(d, (W/2, 70), "Mais pressão = a água ferve mais quente", 38, BRANCO, anchor="mm")
        text(d, (W/2, 112), "valores aproximados, só para ilustrar", 20, METAL, bold=False, anchor="mm")
        # selo "100 °C: panela aberta"
        rrect(d, (700, 560, 1100, 620), 14, PANEL, METAL_DK, 2)
        text(d, (900, 590), "panela aberta: ~100 °C ao nível do mar", 19, METAL, bold=False, anchor="mm")
    elif t < 7.0:     # cena 3: válvula
        u = t-5.0
        cx = panela(d, 400, 400, shake=t, temp_t=1, vapor=1, valvula=ease(u/0.4))
        vapor_valvula(d, cx, 400, t)
        pulso = 1 + 0.04*math.sin(u*10)
        text(d, (900, 300), "A válvula", int(54*pulso), QUENTE, anchor="mm")
        text(d, (900, 365), "libera o excesso", 40, BRANCO, anchor="mm")
        text(d, (900, 420), "de vapor", 40, BRANCO, anchor="mm")
        d.line([S(430), S(232), S(760), S(285)], fill=AMARELO+(255,), width=S(4))
    else:             # cena 4: encerramento
        a = ease((t-7.0)/0.4)
        text(d, (W/2, 290), "Ciência de Cozinha", 64, BRANCO, anchor="mm")
        d.rectangle([S(W/2-120), S(335), S(W/2+120), S(341)], fill=QUENTE)
        text(d, (W/2, 400), "Exemplo fictício feito com o Pack Completo", 28, AMARELO, anchor="mm")
        text(d, (W/2, 450), "canal de demonstração · não existe", 20, METAL, bold=False, anchor="mm")
    out = img.convert("RGB").resize((W, H), Image.LANCZOS)
    out.save(os.path.join(frames, f"f{i:04d}.png"))
    return out

if __name__ == "__main__":
    n = int(8*FPS)
    last = None
    for i in range(n):
        last = frame(i)
    # poster: frame da cena de válvula
    frame(int(5.9*FPS)).save(os.path.join(here, "..", "poster.png"))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(frames, "f%04d.png"),
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart",
                    os.path.join(here, "..", "animacao.mp4")], check=True)
    print("ok")
