default:
	cd src && python3 -m pip install -r requirements.txt
	cd src && python3 ./generate.py
	cd src && zip -r ../dist/misc_qr_and_codes.zip qrcode.png

clean:
	rm -f dist/misc_qr_and_codes.zip
	rm -f src/qrcode.png
