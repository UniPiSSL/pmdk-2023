default: print
	cd src && python3 -m pip install -r requirements.txt
	cd src && python3 ./generate.py
	cd src && python3 -m compileall code.py
	cd src && cp __pycache__/code.*.pyc code.pyc
	cd src && rm -rf __pycache__
	cd src && zip -r ../dist/rev_codeofbytes.zip run.py code.pyc
	@echo Challenge compiled.

print:
	@echo Current Flag: $(shell bash -c 'cat src/flag.txt')

change: print changeflag clean default print

changeflag:
	$(shell bash -c 'read -p "New Flag: " flag; echo $$flag > src/flag.txt')
	@echo Flag changed.

clean:
	-rm -f dist/rev_codeofbytes.zip
	-rm -f src/code.py
	-rm -rf src/__pycache__
	@echo Challenge cleaned.
