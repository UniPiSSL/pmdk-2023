
(() => {

	let title = document.createElement('div');
	title.className = 'title';
	title.textContent = 'Τρίλιζα';
	document.body.appendChild(title);

	// prepare board

	let board = [];
	let turn = 0;
	let gameover = false;

	let getInfo = () => {
		let stats = {'x' : 0, 'o' : 0, 'e' : 0};
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				stats[board[i][j]] ++;
			}
		}

		let row = [];
		let col = [];
		for (let i = 0; i < 3; i++) {
			row.push({'x' : 0, 'o' : 0, 'e' : 0});
			col.push({'x' : 0, 'o' : 0, 'e' : 0});
			for (let j = 0; j < 3; j++) {
				row[i][board[i][j]] ++;
				col[i][board[j][i]] ++;
			}
		}

		let diag = [];
		diag.push({'x' : 0, 'o' : 0, 'e' : 0});
		diag.push({'x' : 0, 'o' : 0, 'e' : 0});
		for (let i = 0; i < 3; i++) {
			diag[0][board[i][i]] ++;
			diag[1][board[i][3 - i - 1]] ++;
		}

		return {
			stats: stats,
			row: row,
			col: col,
			diag: diag
		};
	}

	let player_move = (y, x) => {
		if (board[y][x] != 'e' || gameover) {
			window.location.href = window.location.href;
			return;
		}

		board[y][x] = 'o';
		turn++;
		let cell = document.getElementsByClassName('cell')[y * 3 + x];
		cell.classList.add('player');
		cell.textContent = 'o';
		setTimeout(check, 0);
	};

	let computer_decision = () => {
		if (gameover) return;
		let info = getInfo();

		// Check if computer can win
		for (let i = 0; i < 3; i++) {
			if (info.row[i].x == 2 && info.row[i].o == 0) {
				return [i, (board[i][0] == 'e' ? 0 : (board[i][1] == 'e' ? 1 : 2))];
			}
			else if (info.col[i].x == 2 && info.col[i].o == 0) {
				return [(board[0][i] == 'e' ? 0 : (board[1][i] == 'e' ? 1 : 2)), i];
			}
		}
		if (info.diag[0].x == 2 && info.diag[0].o == 0) {
			let i = (board[0][0] == 'e' ? 0 : (board[1][1] == 'e' ? 1 : 2));
			return [i, i];
		}
		else if (info.diag[1].x == 2 && info.diag[1].o == 0) {
			let i = (board[0][2] == 'e' ? 0 : (board[1][1] == 'e' ? 1 : 2));
			return [i, 3 - i - 1];
		}

		// Check if computer has to block user
		for (let i = 0; i < 3; i++) {
			if (info.row[i].o == 2 && info.row[i].x == 0) {
				return [i, (board[i][0] == 'e' ? 0 : (board[i][1] == 'e' ? 1 : 2))];
			}
			else if (info.col[i].o == 2 && info.col[i].x == 0) {
				return [(board[0][i] == 'e' ? 0 : (board[1][i] == 'e' ? 1 : 2)), i];
			}
		}
		if (info.diag[0].o == 2 && info.diag[0].x == 0) {
			let i = (board[0][0] == 'e' ? 0 : (board[1][1] == 'e' ? 1 : 2));
			return [i, i];
		}
		else if (info.diag[1].o == 2 && info.diag[1].x == 0) {
			let i = (board[0][2] == 'e' ? 0 : (board[1][1] == 'e' ? 1 : 2));
			return [i, 3 - i - 1];
		}

		// Check if you can make fork
		if (
			board[1][1] == 'e' &&
			info.diag[0].x == 1 && info.diag[1].x == 1 &&
			info.diag[0].o == 0 && info.diag[1].o == 0
		)
			return [1, 1];
		if (info.diag[0].x == 2) {
			if (info.col[0].o == 0 && info.row[2].o == 0)
				return [2, 0];
			if (info.col[2].o == 0 && info.row[0].o == 0)
				return [0, 2];
		}
		if (info.diag[1].x == 2) {
			if (info.col[0].o == 0 && info.row[0].o == 0)
				return [0, 0];
			if (info.col[2].o == 0 && info.row[2].o == 0)
				return [2, 2];
		}

		// If game start
		if (info.stats.e == 9) {
			// Pick a corner
			return ([[0, 0], [0, 2], [2, 2], [2, 0]])[Math.floor(Math.random() * 4)];
		}
		// If computer plays second
		if (info.stats.e == 8) {
			if (board[1][1] == 'e')
				return [1, 1];
			return ([[0, 0], [0, 2], [2, 2], [2, 0]])[Math.floor(Math.random() * 4)];
		}
		// user plays at middle
		else if (info.stats.e == 7 && board[1][1] == 'o') {
			if (info.diag[0].x == 1)
				return board[0][0] == 'x' ? [2, 2] : [0, 0];
			if (info.diag[1].x == 1)
				return board[0][2] == 'x' ? [2, 0] : [0, 2];
		}

		// Return one of the empty corners
		let q = ([[0, 0], [0, 2], [2, 2], [2, 0]]).filter(x => board[x[0]][x[1]] == 'e');
		if (q.length > 0) return q[Math.floor(Math.random() * q.length)];

		// Pick a random spot
		q = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == 'e')
					q.push([i, j]); 
			}
		}
		if (q.length) {
			return q[Math.floor(Math.random() * q.length)];
		}

		gameover = true;
		return !gameover;
	};

	let highlight = (info, x) => {
		for (let i = 0; i < 3; i++) {
			if (info.row[i][x] == 3) {
				for (let j = 0; j < 3; j++)
					document.getElementsByClassName('cell')[i * 3 + j].classList.add('highlight');
				return;
			}
			if (info.col[i][x] == 3) {
				for (let j = 0; j < 3; j++)
					document.getElementsByClassName('cell')[j * 3 + i].classList.add('highlight');
				return;
			}
		}
		if (info.diag[0][x] == 3) {
			for (let j = 0; j < 3; j++)
				document.getElementsByClassName('cell')[j * 3 + j].classList.add('highlight');
			return;
		}
		if (info.diag[1][x] == 3) {
			for (let j = 0; j < 3; j++)
				document.getElementsByClassName('cell')[j * 3 + (3 - j - 1)].classList.add('highlight');
			return;
		}
	};

	let check = () => {
		let info = getInfo();
		if (
			info.row[0].x == 3 ||
			info.row[1].x == 3 ||
			info.row[2].x == 3 ||
			info.col[0].x == 3 ||
			info.col[1].x == 3 ||
			info.col[2].x == 3 ||
			info.diag[0].x == 3 ||
			info.diag[1].x == 3
		) {
			gameover = true;
			highlight(info, 'x');
			return '😿 You Lost!';
		}
		if (
			info.row[0].o == 3 ||
			info.row[1].o == 3 ||
			info.row[2].o == 3 ||
			info.col[0].o == 3 ||
			info.col[1].o == 3 ||
			info.col[2].o == 3 ||
			info.diag[0].o == 3 ||
			info.diag[1].o == 3
		) {
			gameover = true;
			highlight(info, 'o');
			return '🙀 You Won!';
		}

		if (
			info.stats.e == 0 ||
			(
				info.row[0].x > 0 && info.row[0].o > 0 &&
				info.row[1].x > 0 && info.row[1].o > 0 &&
				info.row[2].x > 0 && info.row[2].o > 0 &&
				info.col[0].x > 0 && info.col[0].o > 0 &&
				info.col[1].x > 0 && info.col[1].o > 0 &&
				info.col[2].x > 0 && info.col[2].o > 0 &&
				info.diag[0].x > 0 && info.diag[0].o > 0 &&
				info.diag[1].x > 0 && info.diag[1].o > 0
			)
		) {
			gameover = true;
			return '😾 Draw!';
		}
		return false;
	}

	let i1 = setInterval(() => {
		if (turn%2 != 0 || gameover) return;
		let c = computer_decision();
		if (!c) return;
		board[c[0]][c[1]] = 'x';
		let cell = document.getElementsByClassName('cell')[c[0] * 3 + c[1]];
		cell.classList.add('computer');
		cell.textContent = 'x';
		turn++;
		setTimeout(check, 0);
	}, 500);

	let i2 = setInterval(() => {
		let r = check();
		if (!r) return;
		clearInterval(i1);
		clearInterval(i2);
		setTimeout(async () => {
			try {
				/*
					let flag = 'FLAG{1826833f155abe1d1655fc2485486b7c}';
					let h = [... new TextEncoder().encode('🙀 You Won!' + '🙀 You Won!' + '🙀 You Won!' + '🙀 You Won!' + '🙀 You Won!')].slice(0, flag.length);
					let s = Uint8Array.from(new TextEncoder().encode(flag), (v, i) => v ^ h[i]);
					s.toString(s);
				*/
				let t = document.getElementsByTagName('div')[0];
				let h = [... new TextEncoder().encode(r + r + r + r + r + r + r + r + r + r + r + r + r + r)].slice(0, 38);;
				h = String.fromCharCode.apply(String, Uint8Array.from([182,211,216,199,91,104,87,71,22,111,92,93,71,193,170,172,225,66,60,94,17,17,97,90,91,71,147,173,173,184,21,109,87,67,66,96,12,19], (v, i) => v ^ h[i]));
				if (h.substring(0,4) != 'FLAG') throw('');
				t.textContent = r;
				let s = document.createElement('div');
				s.style.textAlign = 'center';
				s.textContent = h;
				document.body.appendChild(s);

			} catch (e) {
				alert(r);
				window.location.href = window.location.href;
			};
		}, 100);
	}, 500);

	let table = document.createElement('table');
	table.className = 'board';
	for (let i = 0; i < 3; i++) {
		board.push([]);
		let tr = document.createElement('tr');
		table.appendChild(tr);
		for (let j = 0; j < 3; j++) {
			board[i].push('e');
			let td = document.createElement('td');
			let div = document.createElement('div');
			div.className = 'cell';
			div.innerHTML = '&nbsp;';
			div.addEventListener('click', () => {
				if (board[i][j] == 'e' && turn%2 == 1 && !gameover)
					player_move(i, j);
			});
			td.appendChild(div);
			table.appendChild(td);
		}
	}
	document.body.appendChild(table);

})();
