default: print
	cd src && gcc updater.c -o updater -lcurl -lcjson
	cd src && zip -r ../dist/misc_pboard.zip updater
	@echo Challenge compiled.

dependancies:
	#@echo No dependencies.
	# For building
	apt-get install libcurl4-openssl-dev
	@echo Dependencies were installed.

print:
	@echo Current Flag: $(shell bash -c 'cat src/board-files/flag.txt')

change: print changeflag clean default print

changeflag:
	$(shell bash -c 'read -p "New Flag: " flag; echo $$flag > src/board-files/flag.txt')
	@echo Flag changed.

clean:
	-rm -f dist/misc_pboard.zip
	@echo Challenge cleaned.
