
// Handle form submission
document.getElementById('form').addEventListener('submit', (e) => {
	e.preventDefault();

	// Hide errors
	document.getElementById('error').style.display = 'none';

	// Get form values
	let username = encodeURIComponent(document.getElementById('username').value);
	let password = encodeURIComponent(document.getElementById('password').value);
	
	// Get signi and get notes from server
	fetch('/signin?username=' + username + '&password=' + password, {method:'POST'})
		.then(response => response.json())
		.then(data => {
			// If there is an error
			if (data.error) {
				showError(data);
				return;
			}

			// Show username
			document.getElementById('notes-username').textContent = data.user;
			// Populate notes
			let el = document.getElementById('notes');
			el.textContent = '';
			data.notes.forEach(note => {
				let card = document.createElement('div');
				card.className = 'card';
				let card_body = document.createElement('div');
				card_body.className = 'card-body';
				card_body.textContent = note;
				card.appendChild(card_body);
				el.appendChild(card);
			});

			// Hide login and show notes
			document.getElementById('section-login').style.display = 'none';
			document.getElementById('section-notes').style.display = 'block';
		}).catch(e => {
			showError({error : 'Request failed.'});
		});
	return false;
});

document.getElementById('logout').addEventListener('click', () => {
	location.href = location.href;
});

let showError = (e) => {
	let el = document.getElementById('error');
	el.textContent = '';
	el.appendChild(document.createTextNode(e.error));
	if (e.query) {
		el.appendChild(document.createElement('br'));
		let code = document.createElement('code');
		code.textContent = e.query;
		el.appendChild(code);
	}
	el.style.display = 'block';
}

(async () => {
	let workerError = (message, reload=0) => {
		document.getElementById('section-login').textContent = message;
		if (reload) setTimeout(() => {
			window.location.href = window.location.href;
		}, reload);
	};

	if ('serviceWorker' in navigator) {
		try {
			const fakebackend = await navigator.serviceWorker.register('service-worker.js');
			if (!fakebackend.active) {
				workerError(`Please wait ...`, 1000);
			}
		} catch (error) {
			workerError('Error! This challenge may no work with this browser. Please try again using another browser.');
		}
	}
	else {
		workerError('Error! This challenge does not work with this browser. Please try again using another browser.');
	}
})();