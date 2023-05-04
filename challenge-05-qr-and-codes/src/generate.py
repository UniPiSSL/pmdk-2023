import qrcode
import math
import PIL

# Load flag
flag = 'flag{this-is-an-example-flag}'
with open('flag.txt') as f:
	flag = f.read().strip()

print("flag = " + flag)
message = flag


# Message to hex
message = message.encode("ascii").hex()
print("hex(flag) = " + message)

# Message to morse
MORSE_CODE_DICT = {
	'A':'.-',		'B':'-...',
	'C':'-.-.',		'D':'-..',		'E':'.',
	'F':'..-.',		'G':'--.',		'H':'....',
	'I':'..',		'J':'.---',		'K':'-.-',
	'L':'.-..',		'M':'--',		'N':'-.',
	'O':'---',		'P':'.--.',		'Q':'--.-',
	'R':'.-.',		'S':'...',		'T':'-',
	'U':'..-',		'V':'...-',		'W':'.--',
	'X':'-..-',		'Y':'-.--',		'Z':'--..',
	'1':'.----',	'2':'..---',	'3':'...--',
	'4':'....-',	'5':'.....',	'6':'-....',
	'7':'--...',	'8':'---..',	'9':'----.',
	'0':'-----',	', ':'--..--',	'.':'.-.-.-',
	'?':'..--..',	'/':'-..-.',	'-':'-....-',
	'(':'-.--.',	')':'-.--.-',
	' ':' '
}
cipher = ''
for letter in message.upper():
	cipher += MORSE_CODE_DICT[letter] + '/'
message = cipher.rstrip('/')
print("morse(hex(flag)) = " + message)


# Generate QR code
print('Generating QR code ...')
qr = qrcode.QRCode(version=1, box_size=10, border=2)
qr.add_data(message)
qr.make(fit=True)
img = qr.make_image(fill='black', back_color='white')
img.save('qrcode.png')
