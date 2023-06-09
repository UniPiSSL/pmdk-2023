# Αδύναμες Κλειδαριές Write-Up

<img width="256" src="../../challenges-images/challenge_11.png">

| Δοκιμασία | Αδύναμες Κλειδαριές |
| :------- | :----- |
| Δυσκολία | Δύσκολη |
| Κατηγορία | Κρυπτογραφία (Cryptography) |
| Λύσεις | 6 |
| Πόντοι | 575 |

## Εκφώνηση Δοκιμασίας

Η περιγραφή της δοκιμασίας μας αναφέρει:
```
Το μήνυμα αυτό είναι κρυπτογραφημένο με το RSA δημόσιο κλειδί που δίνεται. Μπορείς να βρεις το ιδιωτικό κλειδί και να αποκρυπτογραφήσεις το μήνυμα;
```

Παράλληλα μας δίνεται ένα zip με 3 αρχεία.

Το αρχείο `script.py` περιέχει μέσα τον κώδικα Python που κρυπτογράφησε την σημαία:
```py
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
```

Το αρχείο `data.txt` περιέχει μέσα το κρυπτογραφημένο μήνυμα:
```py
c = 2094979585608680836233193997487890176040270502324810567700311729514482445310484825255947244508295839865409644945578
```

Ενώ το αρχείο `pubkey.pem` περιέχει μέσα το δημόσιο κλειδί με το οποίο έγινε η κρυπτογράφηση.

## Επίλυση
### Με μια πρώτη ματιά

Όπως αναφέραμε, σε αυτήν την δοκιμασία μας δίνονται 3 αρχεία:

1. `script.py` : Πρόκειται για ένα python script το οποίο κρυπτογραφεί το flag με χρήση του κρυπτοσυστήματος RSA.
2. `pubkey.pem` : Περιέχει το RSA public key $\{n,e\}$ σε μορφή PEM.
3. `data.txt` : Περιέχει το ciphertext που δημιουργήθηκε από το python script.

Με μια πρώτη ματιά, παρατηρούμε ότι ο κώδικας του script αντιπροσωπεύει standard υλοποίηση του RSA κρυπτοσυστήματος, εκτός από τον υπολογισμό του modulus $n$. Κανονικά, στον RSA, γνωρίζουμε ότι το modulo είναι το γινόμενο δύο πρώτων αριθμών, παρ' όλα αυτά εδώ το $n$ είναι το γινόμενο δύο πρώτων αριθμών υψωμένων στο τετράγωνο. Δηλαδή $n = p^2q^2$.

Οι primes που παράγονται έχουν μέγεθος $(1 << 6) + (1 << 5) = 2^6 + 2^5 = 64 + 32 = 96$ bits. Επομένως, το $n$ έχει συνολικό μέγεθος 96 + 96 + 96 + 96 = 384 bits.

Καθώς δεν υπάρχει κάτι άλλο αξιοσημείωτο στην δοκιμασία αυτή, μπορούμε να υποθέσουμε ότι η ευπάθεια θα βρίσκεται στον υπολογισμό του modulo.

### Ανάλυση - Εύρεση ευπάθειας - Exploitation

Προχωράμε με το σκεπτικό ότι το $n$ έχει δημιουργηθεί με ανασφαλή τρόπο. Αρχικά, η τιμή του είναι αρκετά μικρή κι έτσι μπορούμε να χρησιμοποιήσουμε την βιβλιοθήκη sage για να κάνουμε prime factorization. Αν όμως το modulo ήταν λίγο μεγαλύτερο, δεν θα πετύχαινε απαραίτητα η ίδια τεχνική. Ας γράψουμε το $n$ διαφορετικά:

$n = p^2q^2 = (pq)^2$

Με αυτό τον τρόπο, παίρνοντας την τετραγωνική ρίζα του $n$ καταλήγουμε στο γινόμενο $N = pq$ έχοντας ελαττώσει επιπλέον και το μέγεθος σε bits του $n$.

Στην συνέχεια, μπορούμε να κάνουμε factorization το οποίο θα ολοκληρωθεί και ταχύτερα καθώς το μέγεθος σε bits έχει μειωθεί στο υποδιπλάσιο.

Ανακτώντας τα $p,q$, υπολογίζουμε το $φ(n)$ ως:

$φ(n) = φ(p^2q^2) = φ(p^2)*φ(q^2) = p(p-1)q(q-1) = pq(p-1)(q-1) = Nφ(N)$


Τέλος, μπορούμε να αποκρυπτογραφήσουμε το ciphertext και να πάρουμε το flag.

### Solver

- Παρατηρούμε ότι το script υλοποιεί standard RSA εκτός από τον τρόπο που δημιουργείται το $n$.
- Εφόσον όλα φαίνονται συνηθισμένα, θα προσπαθήσουμε να εκμεταλλευτούμε τον τρόπο δημιουργίας του $n$.
- Μπορούμε να μειώσουμε το μέγεθος του $n$ υπολογίζοντας την τετραγωνική ρίζα και κάνοντας μετά factor χρησιμοποιώντας την συνάρτηση `factor()` του sage.
- Υπολογίζουμε το ιδιωτικό κλειδί και αποκρυπτογραφούμε το flag.

Το παρακάτω python script υλοποιεί την επίθεση που περιγράφηκε παραπάνω και εκτυπώνει το flag.

```py
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
```

## Σημαία

```
FLAG{1b0912a1fd127fb9187752d9ed603b7e}
```
