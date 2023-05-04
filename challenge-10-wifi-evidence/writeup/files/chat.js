let el = {
	users : document.getElementById('connected-users'),
	state : document.getElementById('session-state'),
	messages : document.getElementById('chat-messages'),
	input : document.getElementById('message-input'),
	send : document.getElementById('message-send'),
};

//let ws = new WebSocket("ws://" + document.location.host);

let state = null;
let me = null;

function init(name, _state) {
	//message_received("[System]", "Welcome " + name);
	me = name;
	state = _state;
	el.state.textContent = state;
	new_user(name);
}

function new_user(name) {
	remove_user(name);
	let wrapper = document.createElement('div');
	wrapper.dataset.name = name;
	wrapper.className = 'list-group-item list-group-item-action border-0';
	let subwrapper = document.createElement('div');
	subwrapper.className = 'd-flex align-items-start';
	let img = document.createElement('div');
	img.className = 'anonymous-picture rounded-circle mr-1';
	img.style.backgroundColor = '#' + name.substring(0, 6);
	img.textContent = name.substring(0, 2).toUpperCase();
	subwrapper.appendChild(img);
	let status_wrapper = document.createElement('div');
	status_wrapper.className = 'flex-grow-1 ml-3';
	let div = document.createElement('div');
	div.textContent = name;
	status_wrapper.appendChild(div);
	let div2 = document.createElement('div');
	div2.className = 'small';
	div2.textContent = (me == name ? 'me' : 'anonymous');
	status_wrapper.appendChild(div2);
	subwrapper.appendChild(status_wrapper);
	wrapper.appendChild(subwrapper);
	el.users.appendChild(wrapper);
}

function remove_user(name) {
	[... el.users.children].forEach(element => {
		if (element.dataset.name && element.dataset.name == name) {
			element.remove();
		}
	});
}

function message_received(name, message) {
	let wrapper = document.createElement('div');
	wrapper.className = 'chat-message-' + (me == name ? 'right' : 'left') + ' pb-4';
	let img_wrapper = document.createElement('div');
	let img = document.createElement('div');
	img.className = 'anonymous-picture rounded-circle mr-1';
	img.style.backgroundColor = '#' + name.substring(0, 6);
	img.textContent = name.substring(0, 2).toUpperCase();
	img_wrapper.appendChild(img);
	wrapper.appendChild(img_wrapper);
	let txt_wrapper = document.createElement('div');
	txt_wrapper.className = 'flex-shrink-1 bg-light rounded py-2 px-3 ml-3';
	let name_wrapper = document.createElement('div');
	name_wrapper.className = 'font-weight-bold mb-1';
	name_wrapper.textContent = name;
	txt_wrapper.appendChild(name_wrapper);
	txt_wrapper.appendChild(document.createTextNode(' '));
	txt_wrapper.appendChild(document.createTextNode(message));
	wrapper.appendChild(txt_wrapper);
	el.messages.appendChild(wrapper);
	el.messages.scrollTo(0, el.messages.scrollHeight);
}

function message_send() {
	state = hash(state);
	el.state.textContent = state;
	let message = el.input.value;
	//ws.send(JSON.stringify({ message: encrypt(state, message) }));
	el.input.value = '';
	message_received(me, message);
}

function hash(value) {
	let buf = sjcl.hash.sha256.hash(value);
	return sjcl.codec.hex.fromBits(buf);
}

function hexToBytes(hex) {
	let bytes = [];
	for (let c = 0; c < hex.length; c += 2)
		bytes.push(parseInt(hex.substr(c, 2), 16));
	return bytes;
}

function xorcrypt(key, value) {
	key = hexToBytes(key);
	while (key.length < value.length) {
		key = [...key, ...key];
	}
	for (let i = value.length - 1; i >= 0; i--) {
		value[i] = value[i] ^ key[i];
	}
	return value;
}

function encrypt(key, value) {
	value = [... (new TextEncoder().encode(value))];
	return xorcrypt(key, value);
}

function decrypt(key, value) {
	value = xorcrypt(key, value);
	return new TextDecoder().decode(new Uint8Array(value).buffer);
}

let onmessage = function (event) {
	let data = JSON.parse(event.data);
	if (data.name) {
		data.name = data.name.substring(0, 8);
	}
	switch(data.type) {
		case 'init':
			init(data.name, data.state);
			break;
		case 'connected':
			//message_received("[System]", "User " + data.name + " joined.");
			new_user(data.name);
			break;
		case 'disconnected':
			//message_received("[System]", "User " + data.name + " left.");
			remove_user(data.name);
			break;
		case 'message':
			state = hash(state);
			el.state.textContent = state;
			data.message = decrypt(state, data.message);
			message_received(data.name, data.message);
			break;
		default:
			console.error('Can not handle message', data);
	}
};

el.send.addEventListener('click', () => {
	message_send();
}, false);
el.input.addEventListener('keyup', ({key}) => {
	if (key === "Enter") {
		message_send();
	}
});


let reversemessage = function(event) {
	let data = JSON.parse(event.data);
	data.type = "message",
	data.name = me;
	onmessage({data: JSON.stringify(data)});
}

onmessage({data: '{"type":"init","name":"c2739db818d175efe4e4a8f0998e4834273d7d29f8f3cb0c9fbd1ebac690f770","state":"181dcff2143dea315065aef7c898f551859fdbd40b3661ee181356ade8123dd2"}'});
onmessage({data: '{"type":"connected","name":"04e9090fcaf94f7aa4ced8f9fbf585b055671a46627ec0116b45a164e29cd0e5"}'});
reversemessage({data: '{"message":[115,112,151,87,154,205,18,138,64,181,34,214,74,33,54]}'});
onmessage({data: '{"type":"message","name":"04e9090fcaf94f7aa4ced8f9fbf585b055671a46627ec0116b45a164e29cd0e5","message":[231,169,223,143,201,103,205,141,237,138,185,115,182,233,252,208,52,231,228,146,156,109,228,69,166,249,203,87,69,253,39,52,206,169,222,206,223,97,209,144,227,195,133,38,175,160,253,211,51,236,250,146,153,120,191]}'});
onmessage({data: '{"type":"message","name":"04e9090fcaf94f7aa4ced8f9fbf585b055671a46627ec0116b45a164e29cd0e5","message":[159,197,139,45,5,38,112,119,206,31,211,99,32,93,221,202,26,178,18,89,148,247,99,65,80,220,31,156,120,146,70,125,187,235,255,11,78,37,38,32,144,65,140,107,33,80,219,152,29,181,16,88,151,162,101,20,83,134,27,146,115,146,23,33,224,190,175,12,27,58]}'});



