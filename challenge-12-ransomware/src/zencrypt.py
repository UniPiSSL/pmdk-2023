import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

key = os.urandom(16)
dr = 'plain/'
files = os.listdir(os.curdir+'/'+dr)

for i, f in enumerate(files):
  if f.endswith('.txt') or f.endswith('.png'):
    cipher = AES.new(key, AES.MODE_ECB)
    with open(dr+f, 'rb') as fr:
      with open(f+'.enc', 'wb') as fw:
        padded = pad(fr.read(), 16)
        fw.write(bytes([key[i]]) + cipher.encrypt(padded))