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
		return bytes({{key}})

	print("Failed")
	return False


def getFlag(session):
	key = session
	ciphertext = bytes({{ciphertext}})
	flag = bytes(a ^ b for a, b in zip(ciphertext, key)).decode("utf-8")
	return flag
