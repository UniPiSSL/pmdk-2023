default: print
	cd src/ && python3 generate.py
	gcc -w -static -O2 -o src/authenticate src/source.c
	cd src/ && zip -r ../dist/rev_encrypted_password.zip authenticate
	@echo Challenge compiled.

print:
	@echo Current Flag: $$(cat src/flag.txt)

change: print changeflag clean default print

changeflag:
	$(shell bash -c 'read -p "New Flag: " flag; echo $$flag > src/flag.txt')
	@echo Flag changed.

clean:
	-rm -f dist/rev_encrypted_password.zip
	-rm -f src/authenticate
	-rm -f src/source.c
	@echo Challenge cleaned.
