from PIL import Image, ImageDraw, ImageFont
import os
import base64

def generate_assets():
    src_jpg = r"C:\Users\TANUSH YADAV\.gemini\antigravity\brain\2e435472-25e8-4278-837c-ecf9fd4c0310\.user_uploaded\media_1791826503312_6266df4e.jpg"
    img = Image.open(src_jpg).convert("RGB")
    w, h = img.size

    # Exact bounding box of logo content: x:[168, 911], y:[327, 639]
    pad_x = 16
    pad_y = 12
    crop_box = (max(0, 168 - pad_x), max(0, 327 - pad_y), min(w, 911 + pad_x), min(h, 639 + pad_y))
    cropped = img.crop(crop_box)
    
    os.makedirs("public/images", exist_ok=True)
    cropped.save("public/images/dow-consulting-logo.png", format="PNG", optimize=True)
    print("Saved public/images/dow-consulting-logo.png")

    # Generate transparent PNG
    cw, ch = cropped.size
    rgba = cropped.convert("RGBA")
    pixels = rgba.load()

    from collections import deque
    visited = [[False]*ch for _ in range(cw)]
    queue = deque()

    # Outer border pixels as flood-fill seeds
    for x in range(cw):
        for y in (0, ch-1):
            r, g, b, _ = pixels[x, y]
            if r > 240 and g > 240 and b > 240:
                queue.append((x, y))
                visited[x][y] = True

    for y in range(ch):
        for x in (0, cw-1):
            r, g, b, _ = pixels[x, y]
            if r > 240 and g > 240 and b > 240 and not visited[x][y]:
                queue.append((x, y))
                visited[x][y] = True

    while queue:
        cx, cy = queue.popleft()
        pixels[cx, cy] = (255, 255, 255, 0)
        for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
            if 0 <= nx < cw and 0 <= ny < ch and not visited[nx][ny]:
                nr, ng, nb, _ = pixels[nx, ny]
                if nr > 240 and ng > 240 and nb > 240:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    # Anti-aliasing on outer boundary
    for x in range(cw):
        for y in range(ch):
            r, g, b, a = pixels[x, y]
            if a > 0 and not visited[x][y]:
                has_trans = False
                for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
                    if 0 <= nx < cw and 0 <= ny < ch and pixels[nx, ny][3] == 0:
                        has_trans = True
                        break
                if has_trans:
                    lum = (r*0.299 + g*0.587 + b*0.114)
                    if lum > 215:
                        alpha = int(255 * (255 - lum) / 40)
                        pixels[x, y] = (r, g, b, max(0, min(255, alpha)))

    rgba.save("public/images/dow-consulting-logo-transparent.png", format="PNG", optimize=True)
    print("Saved public/images/dow-consulting-logo-transparent.png")

    # Generate Favicon & App Icons
    # Crop the emblem (top 76% contains the DOW + Arrow)
    emblem = rgba.crop((0, 0, cw, int(ch * 0.76)))
    ew, eh = emblem.size

    size = 512
    icon512 = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    target_w = int(size * 0.88)
    target_h = int(eh * (target_w / ew))
    scaled_emblem = emblem.resize((target_w, target_h), Image.Resampling.LANCZOS)
    offset_x = (size - target_w) // 2
    offset_y = (size - target_h) // 2
    icon512.paste(scaled_emblem, (offset_x, offset_y), scaled_emblem)

    icon512.save("public/favicon.png", format="PNG")
    icon512.resize((180, 180), Image.Resampling.LANCZOS).save("public/apple-touch-icon.png", format="PNG")
    icon512.resize((48, 48), Image.Resampling.LANCZOS).save("public/favicon.ico", format="ICO")
    print("Saved favicon.png, apple-touch-icon.png, favicon.ico")

    with open("public/favicon.png", "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="96" fill="#FFFFFF"/>
  <image href="data:image/png;base64,{b64}" width="512" height="512"/>
</svg>
'''
    with open("public/favicon.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)
    with open("src/app/icon.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Saved public/favicon.svg and src/app/icon.svg")

    # Generate Social Preview Card (Open Graph 1200x630)
    og_img = Image.new("RGB", (1200, 630), (255, 255, 255))
    draw = ImageDraw.Draw(og_img)

    # Top brand bar: red on left, blue on right (matching the business card design!)
    draw.rectangle([0, 0, 400, 12], fill=(224, 32, 36)) # Red
    draw.rectangle([400, 0, 1200, 12], fill=(20, 68, 128)) # Navy

    # Center-left: place the real logo scaled to 600px width
    logo_for_og = rgba
    og_logo_w = 640
    og_logo_h = int(ch * (og_logo_w / cw))
    scaled_logo = logo_for_og.resize((og_logo_w, og_logo_h), Image.Resampling.LANCZOS)
    og_img.paste(scaled_logo, (80, 160), scaled_logo)

    # Right side or bottom card: Consultant info matching the business card
    # Bottom stripe: matching business card
    draw.rectangle([80, 480, 1120, 482], fill=(220, 226, 235))
    
    # Save og-preview.png
    og_img.save("public/images/og-preview.png", format="PNG", optimize=True)
    print("Saved public/images/og-preview.png")

if __name__ == "__main__":
    generate_assets()
