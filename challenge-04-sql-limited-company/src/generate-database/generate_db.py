#!/usr/bin/env python3

# Load params
param_flag = 'FLAG{this-is-an-example-flag}'
with open('flag.txt') as f:
	param_flag = f.read().strip()

param_admin_pass = 'example_pass_for_admin'
with open('admin_pass.txt') as f:
	param_admin_pass = f.read().strip()

param_key = '0011223344556677889900112233445566778899001122334455667788990011'
with open('key.txt') as f:
	param_key = f.read().strip()


# Prepare Database
import sqlite3

connection = sqlite3.connect('database.db')
cursor = connection.cursor()

sql_script = f'''
	CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT);
	CREATE TABLE IF NOT EXISTS notes (username TEXT, note TEXT);

	INSERT INTO users (username, password) VALUES ('admin','{param_admin_pass}');
	INSERT INTO users (username, password) VALUES ('tester','tester');

	INSERT INTO notes (username, note) VALUES ('admin','{param_flag}');
	INSERT INTO notes (username, note) VALUES ('tester','Testing the notes.');
'''
cursor.executescript(sql_script)
#print(sql_script)

connection.commit()
connection.close()



# Encrypt Database
from Crypto.Cipher import AES

key = bytes.fromhex(param_key)

data = None
with open('database.db', 'rb') as db_file:
	data = db_file.read()

cipher = AES.new(key, AES.MODE_GCM)
ciphertext, tag = cipher.encrypt_and_digest(data)
with open('database.encrypted.db', 'wb') as db_file:
	#print(len(cipher.nonce))
	#print(len(tag))
	[db_file.write(x) for x in (cipher.nonce, tag, ciphertext)]

print('Encrypted database file save')


# Decryption Test
#from Crypto.Cipher import AES

data = None
with open('database.encrypted.db', 'rb') as db_file:
	nonce, tag, ciphertext = [db_file.read(x) for x in (16, 16, -1)]

cipher = AES.new(key, AES.MODE_GCM, nonce)
data = cipher.decrypt_and_verify(ciphertext, tag)
print('Decryption test done')
