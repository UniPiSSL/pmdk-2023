# Κώδικας από byte Write-Up

<img width="256" src="../../challenges-images/challenge_extra_04.png">

| Δοκιμασία | Κώδικας από byte |
| :------- | :----- |
| Δυσκολία | Μέτρια |
| Κατηγορία | Αντίστροφη Μηχανική (Reverse Engineering) |
| Λύσεις | 15 |
| Πόντοι | 404 |

## Επισκόπηση Δοκιμασίας

```
Κάποιος έγραψε αυτό το πρόγραμμα python, και έκρυψε μέσα ένα μήνυμα. Δυστυχώς δεν έχουμε όλο τον πηγαίο κώδικα και δεν ξέρουμε τι πρέπει να κάνουμε για να το ανακτήσουμε. Καμιά ιδέα;
```

## Επίλυση

Βλέπουμε πως μας δίνεται ένας κώδικας python:
```python
#!/usr/bin/python3
import code

# Lets print credentials
print(dir(code))
print(code.loadCredentials())

# Get credentials
print("Please insert your credentials:")
username = input("username: ")
password = input("password: ")

# Try to authenticate
session = code.authenticate(username, password)
if session:
	flag = code.getFlag(session)
	print('Good job here is your flag: ' + flag)
else:
	print('Try again.')
```
που χρησιμοποιεί και έναν εξωτερικό byte κώδικα python (τον οποίο δεν μπορούμε να τον διαβάσουμε).

Πρώτα ας ελέγξουμε τι functions είναι διαθέσιμα μέσα στον κωδικα της που δεν μπορούμε να διαβάσουμε:

```python
import code
print(dir(code))
```

Και παίρνουμε σαν έξοδο:
```
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'authenticate', 'getFlag', 'loadCredentials', 'requests']
```

Μπορούμε να δούμε ότι εκτός από τις συναρτήσεις `authenticate` και `getFlag`, υπάρχει και μια συνάρτηση `loadCredentials`.

Έτσι, ας το καλέσουμε την συνάρτηση `loadCredentials` και ας δούμε τι μας γυρνάει:
```python
import code
print(code.loadCredentials())
```

Και παίρνουμε σαν έξοδο:
```
['admin', 'ilkcabeticwmssalcnaps701etoneticdiililnapsnaps8893Zssalc92egaugn']
```

Τώρα ας προσπαθήσουμε να τα χρησιμοποιήσουμε για να αυθεντικοποιηθούμε:
```
Please insert your credentials:
username: admin
password: ilkcabeticwmssalcnaps701etoneticdiililnapsnaps8893Zssalc92egaugn
Conntecting to the database ... Success
Authenticating user ... Success
Good job here is your flag: FLAG{8a498a574605c51128ea041766d893b6}
```

## Σημαία

```
FLAG{8a498a574605c51128ea041766d893b6}
```

