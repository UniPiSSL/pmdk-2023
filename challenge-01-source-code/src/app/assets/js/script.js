(() => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	let w, h, p;
	const resize = () => {
		w = canvas.width = innerWidth;
		h = canvas.height = innerHeight;
		p = Array(Math.ceil(w / 10)).fill(0);
	};
	window.addEventListener("resize", resize);
	resize();

	const random = (items) => items[Math.floor(Math.random() * items.length)];

	const draw = () => {
		ctx.fillStyle = "rgba(0,0,0,.05)";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#0f0";

		for (let i = 0; i < p.length; i++) {
			let v = p[i];
			ctx.fillText(random("0123456789ABCDEF"), i * 10, v);
			p[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + 10;
		}
	};

	for (var i = 100; i >= 0; i--) {
		draw();
	}

	// Flag Part 3: 77e5ebf425e535c8b822fbc}

	let interval = setInterval(draw, 1000 / 30);
})();
