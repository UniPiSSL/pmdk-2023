import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

files = os.listdir(os.curdir)

key = b''

for f in files:
  if f.endswith('.enc'):
    with open(f, 'rb') as fr:
      key += fr.read()[:1]
for b1 in range(256):
  for b2 in range(256):
    test_key = key + bytes([b1]) + bytes([b2])
    cipher = AES.new(test_key, AES.MODE_ECB)
    with open('flag.png.enc', 'rb') as f:
      pt = cipher.decrypt(f.read()[1:])
    if pt.startswith(b'\x89PNG'):
      print(f'RECOVERED KEY = {test_key}')
      with open('flag.png', 'wb') as f:
        f.write(unpad(pt, 16))
        exit(0)