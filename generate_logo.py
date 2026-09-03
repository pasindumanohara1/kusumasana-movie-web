import zlib
import struct
import math

def create_logo_png(filename="public/logo.png", size=512):
    width = size
    height = size
    raw_data = bytearray()

    # We will draw a stylish stylized ribbon 'S' with smooth gradients matching the user's logo
    # Emerald-cyan gradient: #34d399 to #0284c7
    for y in range(height):
        raw_data.append(0) # filter type 0 (None)
        for x in range(width):
            # Normalize coordinates to -1.0 to 1.0
            nx = (x - width / 2) / (width / 2)
            ny = (y - height / 2) / (height / 2)

            r, g, b, a = 0, 0, 0, 0

            # Distance and angle
            d_center = math.sqrt(nx*nx + ny*ny)
            
            # Parametric ribbon S curves
            # Upper curve center: (0.1, -0.4), radius ~ 0.45
            d_top_arc = abs(math.sqrt((nx - 0.05)**2 + (ny + 0.38)**2) - 0.42)
            # Lower curve center: (-0.1, 0.4), radius ~ 0.45
            d_bot_arc = abs(math.sqrt((nx + 0.05)**2 + (ny - 0.38)**2) - 0.42)
            
            # Central connecting bar
            d_diag = abs(ny - (-0.75 * nx))
            in_center_zone = (-0.4 < ny < 0.4) and (-0.5 < nx < 0.5)

            # Top wing flourish
            in_top_wing = (nx > 0.15) and (-0.95 < ny < -0.4) and (nx < 0.85)
            d_top_wing = abs(ny - (-0.6 + 0.3 * (nx - 0.5)**2))

            # Bottom wing flourish
            in_bot_wing = (nx < -0.15) and (0.4 < ny < 0.95) and (nx > -0.85)
            d_bot_wing = abs(ny - (0.6 - 0.3 * (nx + 0.5)**2))

            thickness = 0.22
            mask = 0.0

            # Upper loop
            if ny < 0.05 and d_top_arc < thickness and (nx > -0.5):
                dist = d_top_arc / thickness
                mask = max(mask, 1.0 - dist * dist)

            # Lower loop
            if ny > -0.05 and d_bot_arc < thickness and (nx < 0.5):
                dist = d_bot_arc / thickness
                mask = max(mask, 1.0 - dist * dist)

            # Center stroke
            if in_center_zone and d_diag < (thickness * 1.3):
                dist = d_diag / (thickness * 1.3)
                mask = max(mask, 1.0 - dist * dist)

            # Top flourish
            if in_top_wing and d_top_wing < thickness * 0.8:
                dist = d_top_wing / (thickness * 0.8)
                mask = max(mask, 1.0 - dist * dist)

            # Bottom flourish
            if in_bot_wing and d_bot_wing < thickness * 0.8:
                dist = d_bot_wing / (thickness * 0.8)
                mask = max(mask, 1.0 - dist * dist)

            if mask > 0.05:
                # Gradient factor from top (emerald) to bottom (deep turquoise/blue)
                t = (ny + 1.0) / 2.0 # 0 at top, 1 at bottom
                t = max(0.0, min(1.0, t))

                # Color stops:
                # Top: #5eead4 (94, 234, 212) -> #14b8a6 (20, 184, 166) -> #0284c7 (2, 132, 199) -> #0369a1
                if t < 0.5:
                    sub_t = t / 0.5
                    cr = int(60 * (1 - sub_t) + 14 * sub_t)
                    cg = int(220 * (1 - sub_t) + 180 * sub_t)
                    cb = int(200 * (1 - sub_t) + 210 * sub_t)
                else:
                    sub_t = (t - 0.5) / 0.5
                    cr = int(14 * (1 - sub_t) + 2 * sub_t)
                    cg = int(180 * (1 - sub_t) + 132 * sub_t)
                    cb = int(210 * (1 - sub_t) + 199 * sub_t)

                # Add subtle 3D highlight
                highlight = max(0.0, 1.0 - abs(nx + ny * 0.3) * 3) * 40
                cr = min(255, int(cr + highlight))
                cg = min(255, int(cg + highlight))
                cb = min(255, int(cb + highlight))

                alpha = min(255, int(mask * 255))
                r, g, b, a = cr, cg, cb, alpha

            raw_data.extend([r, g, b, a])

    # Compress IDAT chunk
    compressed = zlib.compress(bytes(raw_data), 9)

    def chunk(tag, data):
        return struct.pack("!I", len(data)) + tag + data + struct.pack("!I", zlib.crc32(tag + data) & 0xffffffff)

    png = b"\x89PNG\r\n\x1a\n"
    # IHDR: width, height, bit_depth=8, color_type=6 (RGBA), compression=0, filter=0, interlace=0
    ihdr = struct.pack("!IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png += chunk(b"IHDR", ihdr)
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")

    with open(filename, "wb") as f:
        f.write(png)
    print(f"Generated {filename} successfully ({len(png)} bytes)")

if __name__ == "__main__":
    create_logo_png()
