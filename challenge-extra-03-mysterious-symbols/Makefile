default:
	cd src && python3 -m pip install -r requirements.txt
	cd src && python3 ./generate.py
	cd src && zip -r ../dist/misc_mysterious_symbols.zip symbols.png

clean:
	rm -f dist/misc_mysterious_symbols.zip
	rm -f src/symbols.png
