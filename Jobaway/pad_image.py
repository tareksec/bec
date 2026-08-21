from PIL import Image
import os

# Desktop
img_d = Image.open("public/assets/images/New folder/hero/hero/BEC-Hero-Preview/artifacts/bec-hero-preview/public/bec-hero-desktop.png")
navbar_height_d = 140
cropped_d = img_d.crop((0, navbar_height_d, img_d.width, img_d.height))

new_d = Image.new("RGB", (img_d.width, img_d.height), (6, 68, 44))
new_d.paste(cropped_d, (0, navbar_height_d))
new_d.save("public/assets/images/hero-desktop.png")

# Mobile
img_m = Image.open("public/assets/images/New folder/hero/hero/BEC-Hero-Preview/artifacts/bec-hero-preview/public/bec-hero-mobile.png")
navbar_height_m = 160
cropped_m = img_m.crop((0, navbar_height_m, img_m.width, img_m.height))

new_m = Image.new("RGBA", (img_m.width, img_m.height), (255, 255, 255, 0))
new_m.paste(cropped_m, (0, navbar_height_m))
new_m.save("public/assets/images/hero-mobile.png")

print("Images padded and cropped successfully.")
