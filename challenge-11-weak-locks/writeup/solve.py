from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes
from sage.all import *
from gmpy2 import iroot

with open('pubkey.pem') as f:
  key = RSA.import_key(f.read())

n = key.n
e = key.e

N = iroot(n, 2)[0]
facs = factor(N)
p, q = facs[0][0], facs[1][0]

assert n == p**2 * q**2

phi = N * (p-1)*(q-1)
d = power_mod(e, -1, phi)

with open('data.txt') as f:
  c = int(f.read().strip().split(' = ')[1])

m = power_mod(c, d, n)

print(long_to_bytes(m).decode())