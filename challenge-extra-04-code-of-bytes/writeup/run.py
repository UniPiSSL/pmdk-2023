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
