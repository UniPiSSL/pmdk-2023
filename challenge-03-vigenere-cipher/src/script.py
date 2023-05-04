import random, re

def vigenere_encrypt(msg, key):
  ct = ''
  for i in range(len(msg)):
    kc = ord(key[i % len(key)]) - 65
    mc = ord(msg[i]) - 65
    ct += chr((mc + kc) % 26 + 65)
  return ct

with open('words.txt') as f:
  words = f.readlines()

with open('message.txt') as f:
  message = f.read()

message = re.sub(r'[^a-zA-Z0-9]', '', message.upper())

key = random.choice(words)

ciphertext = vigenere_encrypt(message, key)

with open('ciphertext.txt', 'w') as f:
    f.write(f'{ciphertext}\n')
