#!/usr/bin/python3
import requests

# Load credentials from the web
def loadCredentials():
	print("Conntecting to the database ...", end =" ")
	r = requests.get('https://en.wikipedia.org/wiki/Python_(programming_language)')
	if r.status_code != 200:
		print("Error! Internet connection is required.")
		return None
	else:
		print("Success")

	# Parse output
	allowed_characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	article = ''.join(filter(lambda x: x in allowed_characters, r.text[len(r.text)//2 : len(r.text)//2 + 256]))

	# User info
	username = 'admin'
	password = article[0:min(len(article), 64)][::-1]
	return [username, password]

def authenticate(username, password):
	credentials = loadCredentials()
	if not credentials:
		return None

	print("Authenticating user ...", end =" ")
	if username == credentials[0] and password == credentials[1]:
		print("Success")
		return bytes([80, 208, 122, 73, 92, 25, 250, 37, 188, 147, 115, 254, 43, 126, 245, 205, 238, 131, 200, 229, 85, 185, 112, 4, 124, 219, 255, 34, 174, 216, 96, 48, 104, 57, 76, 249, 159, 129])

	print("Failed")
	return False


def getFlag(session):
	key = session
	ciphertext = bytes([22, 156, 59, 14, 39, 33, 155, 17, 133, 171, 18, 203, 28, 74, 195, 253, 219, 224, 253, 212, 100, 139, 72, 97, 29, 235, 203, 19, 153, 238, 86, 84, 80, 0, 127, 155, 169, 252])
	flag = bytes(a ^ b for a, b in zip(ciphertext, key)).decode("utf-8")
	return flag
