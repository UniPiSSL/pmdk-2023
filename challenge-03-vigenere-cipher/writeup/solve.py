def vigenere_decrypt(ct, key):
  pt = ''
  for i in range(len(ct)):
    kc = ord(key[i % len(key)]) - 65
    mc = ord(ct[i]) - 65
    pt += chr((mc - kc) % 26 + 65)
  return pt

with open('words.txt') as f:
  words = f.readlines()

with open('ciphertext.txt') as f:
  ciphertext = f.read().strip()

for word in words:
  pt = vigenere_decrypt(ciphertext, word)
  if 'FLAG' in pt:
    print(pt)
