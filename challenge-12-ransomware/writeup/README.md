# R4NS0MW4R3 Write-Up

<img width="256" src="../../challenges-images/challenge_12.png">

| Δοκιμασία | R4NS0MW4R3 |
| :------- | :----- |
| Δυσκολία | Υπερβολικά δύσκολη |
| Κατηγορία | Κρυπτογραφία (Cryptography) / Προγραμματισμός (Programming) |
| Λύσεις | 6 |
| Πόντοι | 575 |

## Περιγραφή Δοκιμασίας

```
Η εταιρεία μας έπεσε θύμα κυβερνοεπίθεσης κατά την οποία κάποιοι πήραν πρόσβαση στον κεντρικό διακομιστή μας και κρυπτογράφησε όλα τα αρχεία μας. Οι κακοποιοί επικοινώνησαν μαζί μας και μας ζητάνε λίτρα για να μας δώσουν το κλειδί για την αποκρυπτογράφηση, αλλά το ποσό είναι τεράστιο για την εταιρεία μας. Αν δεν μας βοηθήσεις θα χάσουμε όλα μας τα αρχεία για πάντα!
```

### Source Code

```py
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
```

### Output Data

Όλα τα αρχεία με κατάληξη `.enc`.

## Επίλυση
### Με μια πρώτη ματιά

Σε αυτό το challenge μας δίνονται 15 αρχεία:

1. `zencrypt.py` : Πρόκειται για ένα python script το οποίο αποτελεί την κύρια λειτουργικότητα του ransomware.
2. `*.enc` : Τα υπόλοιπα 14 αρχεία είναι αρχεία κειμένου που κρυπτογράφησε το ransomware εκ των οποίων ένα από αυτά είναι μια εικόνα `.png` που εμφανίζει το flag.

Με μια πρώτη ματιά, παρατηρούμε οτι το script βασική λειτουργικότητα ενός ransomware. Διαβάζει όλα τα αρχεία σε ένα directory (στην περίπτωση μας το `plain/`) και τα κρυπτογραφεί. Δημιουργείται αρχικά ένα κλειδί AES μήκους 128 bits και χρησιμοποιείται το ίδιο για κάθε κρυπτογράφηση.

Στην συνέχεια, το ransomware διαβάζει το εκάστοτε αρχείο, το χωρίζει σε blocks των 16 bytes και τα κρυπτογραφεί με AES σε ECB mode.

### Ανάλυση - Εύρεση ευπάθειας - Exploitation

Κατά την εγγραφή του $i$-οστού κρυπτοκειμένου, γράφεται στην αρχή του αρχείου σαν prefix και το $i$-οστό byte του κλειδιού. Αυτό καθιστά την κρυπτογράφηση αδύναμη καθώς κάποιος μπορεί να εξάγει το πρώτο byte από κάθε ένα από τα 14 αρχεία και να ανακτήσει 14 bytes του κλειδιού.

Το μήκος ολόκληρου του κλειδιού είναι 16 bytes αλλά αυτό δεν είναι πρόβλημα καθώς τα υπόλοιπα 2 bytes μπορούν να γίνουν bruteforce.

Αυτό είναι εφικτό καθώς 2 bytes = 8 * 2 = 16 bits. Άρα χρειάζεται να διατρέξουμε μόνο $2^{16}$ τιμές, κάτι που είναι πολύ εύκολο για έναν σύγχρονο υπολογιστή.

Ανακτώντας το κλειδί, έχουμε την δυνατότητα να αποκρυπτογραφήσουμε τα αρχεία με παρόμοιο τρόπο όπως κρυπτογραφήθηκαν. Θα κάνουμε την υπόθεση ότι το flag βρίσκεται στην εικόνα `flag.png`.

### Solver

- Παρατηρούμε ότι το script υλοποιεί standard λειτουργία ransomware.
- Παρατηρούμε ότι ο κακόβουλος χρήστης που έφτιαξε το ransomware, ξέχασε ότι γράφει το εκάστοτε byte του κλειδιού στο κρυπτογραφημένο αρχείο.
- Μπορούμε να ανακτήσουμε τα πρώτα 14 bytes του κλειδιού για να κάνουμε brute force για τα υπόλοιπα δύο.
- Ανακτούμε ολόκληρο το κλειδί και αποκρυπτογραφούμε την εικόνα `flag.png` που μάλλον αυτή θα περιέχει το flag.

Το παρακάτω python script υλοποιεί την επίθεση που περιγράφηκε παραπάνω και ανακτά την εικόνα με το flag.

```py
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
```

## Σημαία

Μπορούμε να ανοίξουμε την εικόνα `flag.png` και να πάρουμε το flag.

```
FLAG{Too_many_leakzzz}
```
