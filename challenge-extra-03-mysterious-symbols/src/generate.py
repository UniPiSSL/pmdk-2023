import os
import math
from PIL import Image

# Symbols path
symbols_folder = os.path.join(os.path.dirname(__file__), "pigpen")
symbols_ext = ".png"

# Load flag
flag = 'flag{this-is-an-example-flag}'
with open('flag.txt') as f:
	flag = f.read().strip()


# Get symbol size
symbol = Image.open(os.path.join(symbols_folder, "A" + symbols_ext))
symbols_width, symbols_height = symbol.size
print('Symbols width = ' + str(symbols_width) + 'px, height = ' + str(symbols_height) + 'px')

cols = math.ceil(math.sqrt(len(flag)))
rows = math.ceil(len(flag) / cols)
print('Message will be ' + str(cols) + ' x ' + str(rows) + ' symbols')

width = (2 * cols + 1) * symbols_width
height = (2 * rows + 1) * symbols_height
img = Image.new('RGBA', (width, height), color="white")
print('Image will be ' + str(width) + ' x ' + str(height) + ' pixels')


for i in range(len(flag)):
	offset_x = (2 * (i % cols) + 1) * symbols_width
	offset_y = (2 * (i // cols) + 1) * symbols_height
	symbol = Image.open(os.path.join(symbols_folder, flag[i].upper() + symbols_ext))
	img.paste(symbol, (offset_x, offset_y), symbol)

img.save('symbols.png')
print('Image generated')
