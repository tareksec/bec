from PIL import Image

img_d = Image.open("public/assets/images/New folder/hero/hero/BEC-Hero-Preview/artifacts/bec-hero-preview/public/bec-hero-desktop.png")
cropped_d = img_d.crop((0, 140, img_d.width, img_d.height))
cropped_d.save("public/assets/images/hero-desktop.png")

img_m = Image.open("public/assets/images/New folder/hero/hero/BEC-Hero-Preview/artifacts/bec-hero-preview/public/bec-hero-mobile.png")
cropped_m = img_m.crop((0, 160, img_m.width, img_m.height))
cropped_m.save("public/assets/images/hero-mobile.png")
print("Images cropped successfully.")
