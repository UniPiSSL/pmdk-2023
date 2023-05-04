from Crypto.PublicKey import RSA
from Crypto.Util.number import getPrime, long_to_bytes, bytes_to_long

FLAG = b'??????????????????????????????????????'

p, q = getPrime((1 << 6) + (1 << 5)), getPrime((1 << 6) + (1 << 5))

n = p**2 * q**2
e = 65537

key = RSA.construct((n, e))

with open('pubkey.pem', 'wb') as f:
    f.write(key.exportKey()+b'\n')

m = bytes_to_long(FLAG)

c = pow(m, e, n)

with open('data.txt', 'w') as f:
    f.write(f'c = {c}\n')
