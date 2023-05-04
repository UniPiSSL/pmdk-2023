import random

# Pick parameters
username = 'admin'
password = 'my_sTr0nG_p4ssWorD'
key = random.randint(2, 10)

# Generate random password
if not password:
	length = random.randint(16, 22)
	password = ''
	for x in range(length):
		password += chr(random.randint(33, 126 - key))


# Load flag from file
with open('./flag.txt') as f:
	flag = f.read().strip()

# Encode password
enc_password = ''
for i in range(len(password)):
	enc_password += chr(ord(password[i]) + (i % key))

# Encode flag
enc_flag = []
flag_len = len(flag)
i = 0
while i < flag_len:
	for j in range(len(username)):
		if i >= flag_len:
			break;
		enc_flag.append(str(ord(flag[i]) ^ ord(username[j])))
		i += 1

	for j in range(len(password)):
		if i >= flag_len:
			break;
		enc_flag.append(str(ord(flag[i]) ^ ord(password[j])))
		i += 1

enc_flag = '{' + ', '.join(enc_flag) + '}'

with open('./source.c', 'w') as source:
	with open('./template.c', 'r') as template:
		source.write(
			template.read()
			.replace('%%ecrypted_flag%%', enc_flag)
			.replace('%%flag_len%%', str(len(flag)))
			.replace('%%username%%', username)
			.replace('%%enc_password%%', enc_password.replace("\\", "\\\\"))
			.replace('%%key%%', str(key))
		)

print(f'''
Generated source for:
    FLAG: {flag}
    USERNAME: {username}
    PASSWORD: {password}
    KEY: {str(key)}
''')
