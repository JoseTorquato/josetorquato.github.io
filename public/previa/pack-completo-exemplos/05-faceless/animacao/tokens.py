# Tokens de identidade do canal fictício "Ciência de Cozinha" (paleta, fontes, easing, tempos)
W, H, FPS = 1280, 720, 30
SS = 2  # supersampling
BG = (21, 24, 38)        # #151826 azul-noite
PANEL = (33, 38, 60)
METAL = (176, 186, 204)
METAL_DK = (112, 122, 142)
AGUA = (64, 156, 255)
QUENTE = (255, 122, 48)  # laranja
AMARELO = (255, 214, 64)
BRANCO = (245, 247, 252)
FONT_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_R = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
# cenas (segundos): titulo, ferve, valvula, final
CENAS = [(0, 2.0), (2.0, 5.0), (5.0, 7.0), (7.0, 8.0)]

def ease(t):  # easeInOutCubic
    t = max(0.0, min(1.0, t))
    return 4*t*t*t if t < .5 else 1 - pow(-2*t + 2, 3)/2
