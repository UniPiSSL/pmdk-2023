#!/usr/bin/python3
import os
import json
import secrets

# Load flag
flag = 'flag{this-is-an-example-flag}'
with open('flag.txt', 'r') as f:
	flag = f.read().strip()

plaintext = bytes(flag, 'utf-8')
key = secrets.token_bytes(len(plaintext))
ciphertext = bytes(a ^ b for a, b in zip(plaintext, key))

with open('code.template.py', 'r') as code_template_py:
	code = code_template_py.read()
	code = code.replace('{{key}}', json.dumps(list(key)))
	code = code.replace('{{ciphertext}}', json.dumps(list(ciphertext)))
	with open('code.py', 'w') as code_py:
		code_py.write(code)
