default: print
	cd src/ && python3 zencrypt.py && zip -r ../dist/crypto_ransomware.zip zencrypt.py *.enc
	@echo Challenge compiled.
print:
	@echo Current Flag: $(shell bash -c 'cat src/app/flag.txt')
change: print changeflag clean default print
changeflag:
	$(shell bash -c 'read -p "New Flag: " flag; echo $$flag > src/app/flag.txt')
	@echo Flag changed.
clean:
	rm -f dist/*.zip
	@echo Challenge cleaned.
