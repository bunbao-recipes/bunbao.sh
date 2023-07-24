const log = console.log;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function favicon() {
	const canvas = document.createElement("canvas");

	const canvasSize = getRandomInt(16, 64);

	canvas.width = canvasSize;
	canvas.height = canvasSize;

	const ctx = canvas.getContext("2d");
	const color = Math.floor(255 / getRandomInt(1, 5));
	const squareSize = 12.5;

	for (let i = 0; i < canvas.width; i++) {
		for (let j = 0; j < canvas.height; j++) {
			ctx.fillStyle = `rgb(${Math.floor(255 - color * i)}, ${Math.floor(
				255 - color * j
			)}, 0)`;
			ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
		}
	}

	const url = canvas.toDataURL();

	const docHead = document.getElementsByTagName("head")[0];
	const newLink = document.createElement("link");
	newLink.rel = "shortcut icon";
	newLink.href = url;

	if (window) {
		window.logoURL = newLink.href;
		setTimeout(() => {
			document.querySelector("#logo1").src = newLink.href;
			document.querySelector("#logo2").src = newLink.href;
		}, 100);
	}

	docHead.appendChild(newLink);
}

favicon();
