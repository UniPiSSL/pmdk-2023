# 1 αδιάβαστο μήνυμα από τον χρήστη Βιζενέριο Write-Up

<img width="256" src="../../challenges-images/challenge_03.png">

| Δοκιμασία | 1 αδιάβαστο μήνυμα από τον χρήστη Βιζενέριο |
| :------- | :----- |
| Δυσκολία | Εύκολη |
| Κατηγορία | Κρυπτογραφία (Cryptography) |
| Λύσεις | 21 |
| Πόντοι | 200 |

## Περιγραφή Δοκιμασίας

Η περιγραφή της δοκιμασίας αναφέρει:
```
Βοήθησε με να καταλάβω τι γράφει αυτό το μήνυμα. Χρειάζομαι το κλειδί και ελπίζω να μην ψάχνω βελόνα στα άχυρα.
```
Επιπλέον μας δίνετε ένα zip αρχείο με 3 αρχεία.

### Ο κώδικας κρυπτογράφησης (Python3)

```py
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
```

## Επίλυση

### Με μια πρώτη ματιά

Αρχικά, βλέπουμε πως στο zip του challenge περιλαμβάνονται 3 αρχεία.

1. `script.py` : Είναι το κύριο script του challenge που περιλαμβάνει τον κώδικα.
2. `words.txt` : Περιέχει μια λίστα με 200 αγγλικές λέξεις
3. `ciphertext.txt` : Περιέχει το κρυπτογραφημένο μήνυμα το οποίο κρυπτογραφήθηκε με το κύριο script.

Ας αναλύσουμε πρώτα το κύριο αρχείο `script.py`. Με μια πρώτη ματιά βλέπουμε ότι περιέχει μια συνάρτηση `vigenere_encrypt` οπότε υποψιαζόμαστε ότι το μήνυμα έχει κρυπτογραφηθεί με την χρήση του Vigenere cipher. Πρόκειται για standard υλοποίηση του cipher οπότε δεν υπάρχει κάποιο ενδιαφέρον να την διερευνήσουμε περαιτέρω. Για περισσότερες πληροφορίες, δείτε [εδώ](https://pages.mtu.edu/~shene/NSF-4/Tutorial/VIG/Vig-Base.html).

Μετά, το script φορτώνει τις λέξεις από το αρχείο `words.txt` καθώς και το plaintext μήνυμα από το αρχείο `message.txt` το οποίο βρισκόταν στον ίδιο φάκελο την ώρα που έτρεξε το script.

Στην συνέχεια, κόβονται από το μήνυμα όσοι χαρακτήρες δεν είναι γράμματα ή αριθμοί και τα γράμματα μετατρέπονται σε κεφαλαία.

Τέλος, το μήνυμα κρυπτογραφείται με την συνάρτηση `vigenere_encrypt` χρησιμοποιώντας ως κλειδί μια τυχαία λέξη του αρχείου `words.txt`. Αφού κρυπτογραφηθεί, το κρυπτογραφημένο μήνυμα γράφεται στο αρχείο `ciphertext.txt`.

### Ανάλυση και Εύρεση ευπάθειας

Εάν δεν μας δινόταν το αρχείο `words.txt` με όλα τα πιθανά κλειδιά τότε η λύση θα ήταν λίγο πιο δύσκολη καθώς θα έπρεπε να σπάσουμε το cipher χρησιμοποιώντας frequency analysis και άλλες τεχνικές κρυπτανάλυσης.

Ωστόσο, μας δίνεται το αρχείο και έτσι η δουλειά μας γίνεται πιο εύκολη τώρα. Το μόνο που έχουμε να κάνουμε είναι να προσπελάσουμε και τις 200 λέξεις μέχρι να βρούμε ένα μήνυμα που να μας βγάζει νόημα. Μία λύση είναι να εκτυπώσουμε στην κονσόλα και τα 200 μηνύματα και να αρχίσουμε να ψάχνουμε για κάποιο που να βγάζει νόημα. Αυτό όμως θα ήταν αρκετά χρονοβόρο. Μπορούμε να μειώσουμε τον αριθμό μηνυμάτων που θα εκτυπωθούν ψάχνοντας για κάποιο γνωστό substring που ξέρουμε ότι θα υπάρχει στο μήνυμα.

Εφόσον το flag θα υπάρχει στο μήνυμα και το flag format είναι `FLAG{...}` μπορούμε να ψάξουμε απλά για το substring `FLAG`.

**Προσοχή**: Ψάχνουμε το `FLAG` και όχι το `FLAG{` καθώς τα ειδικά σύμβολα έχουν γίνει replace με την παρακάτω γραμμή:

```py
message = re.sub(r'[^a-zA-Z0-9]', '', message.upper())
```

### Κώδικας επίλυσης

Ας καταγράψουμε συνοπτικά την ροή της σκέψης μας για να φτάσουμε στην επίλυση.

- Παρατηρήσαμε ότι πρόκειται για standard κρυπτογράφηση με το Vigenere cipher.
- Το κλειδί έχει επιλεχθεί τυχαία από μια λίστα 200 λέξεων.
- Η λίστα είναι μικρή οπότε μπορούμε να προσπελάσουμε όλες τις λέξεις και να κάνουμε decrypt το ciphertext.
- Γνωρίζουμε ότι το flag format είναι `FLAG{...}` καθώς και ότι κατά πάσα πιθανότητα το flag θα ανήκει στο plaintext μήνυμα. Έτσι μπορούμε να περιορίσουμε τον αριθμό των αποκρυπτογραφημένων μηνυμάτων που θα εκτυπώσουμε ψάχνοντας για το substring `FLAG`.

```py
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
```

## Output

```txt
ADVANCEDEXTENDEDDOUBTFULHEHEBLESSINGTOGETHERINTRODUCEDFARLAWGAYCONSIDEREDFREQUENTLYENTREATIESDIFFICULTYEATHIMFOURARERICHNORCALMBYANPACKAGESREJOICEDEXERCISETOOUGHTONAMMARRYROOMSDOUBTMUSICMENTIONENTEREDANTHROUGHCOMPANYASUPARRIVEDNOPAINFULBETWEENITDECLAREDISPROSPECTANINSISTEDPLEASURETHISISJUSTRANDOMTEXTHEREISYOURFLAGDONOTFORGETTOWRAPITWITHCURLYBRACKETSFLAGWOWYOUAREREALLYGOODYOUFOUNDME
```

# Flag

```
FLAG{WOWYOUAREREALLYGOODYOUFOUNDME}
```
