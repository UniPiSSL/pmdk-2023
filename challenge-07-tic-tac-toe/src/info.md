# Info on how the flag was encrypted

The flag was XORed with the win message.

You can use the following code to change the flag:
```javascript
let flag = 'FLAG{1826833f155abe1d1655fc2485486b7c}';
let h = [... new TextEncoder().encode('🙀 You Won!' + '🙀 You Won!' + '🙀 You Won!' + '🙀 You Won!' + '🙀 You Won!')].slice(0, flag.length);
let s = Uint8Array.from(new TextEncoder().encode(flag), (v, i) => v ^ h[i]);
s.toString(s);
```

The source code was obfuscated using https://obfuscator.io/
