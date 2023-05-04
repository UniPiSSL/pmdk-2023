default: print
	cd src/ && python3 script.py && zip -r ../dist/crypto_vigenere.zip script.py ciphertext.txt words.txt
	@echo Challenge compiled.
print:
	@echo Current Flag: $(shell bash -c 'cat src/app/message.txt')
change: print changeflag clean default print
changeflag:
	$(shell bash -c 'read -p "New Flag: " flag; echo $$flag > src/app/message.txt')
	@echo Flag changed.
clean:
	rm -f dist/*.zip
	@echo Challenge cleaned.
