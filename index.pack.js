const gridElement = document.querySelector(".grid");
const startBtn = document.getElementById("start");
let scoreElement = document.getElementById("score");
let gridArray = [];
let snakePosition = [1, 2, 3];
let direction = 1;
let width = 10;
let appleIndex = 0;
let score = 0;
let time = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
	for (let i = 0; i < width * width; i++) {
		const newElement = document.createElement("div");
		newElement.classList.add("grid-cell");
		gridElement.append(newElement);
		gridArray.push(newElement);
	}
}

createGrid();

snakePosition.forEach((index) => gridArray[index].classList.add("snake"));

function startRestartGame() {
	snakePosition.forEach((index) => gridArray[index].classList.remove("snake"));
	gridArray[appleIndex].classList.remove("apple");

	clearInterval(timerId);
	snakePosition = [1, 2, 3];
	direction = 1;
	score = 0;
	scoreElement.textContent = score;
	time = 1000;
	generateApples();
	snakePosition.forEach((index) => gridArray[index].classList.add("snake"));

	timerId = setInterval(move, time);
}

function move() {
	let head = snakePosition[snakePosition.length - 1];
	// If statement checking if snake hits the wall or itself
	if ((head + width >= width * width && direction === width) || (head % width === width - 1 && direction === 1) || (head % width === 0 && direction === -1) || (head - width < 0 && direction === -width) || gridArray[head + direction].classList.contains("snake")) {
		return clearInterval(timerId);
	}

	let tail = snakePosition.shift();
	gridArray[tail].classList.remove("snake");
	let newHead = head + direction;
	snakePosition.push(newHead);

	if (gridArray[head].classList.contains("apple")) {
		// remove the class of apple
		gridArray[head].classList.remove("apple");
		// grow our snake by adding class of snake to it
		gridArray[tail].classList.add("snake");
		// grow our snake array
		snakePosition.unshift(tail);
		//generate a new apple
		generateApples();
		//add one to the score
		scoreElement.textContent++;
		//speed up our snake
		clearInterval(timerId);
		time = time * speed;
		timerId = setInterval(move, time);
	}

	gridArray[newHead].classList.add("snake");
}

function generateApples() {
	do {
		appleIndex = Math.floor(Math.random() * gridArray.length);
	} while (gridArray[appleIndex].classList.contains("snake"));
	gridArray[appleIndex].classList.add("apple");
}

generateApples();

function control(event) {
	switch (event.key) {
		case "Right":
		case "ArrowRight":
			direction = 1;
			break;
		case "Up":
		case "ArrowUp":
			direction = -width;
			break;
		case "Left":
		case "ArrowLeft":
			direction = -1;
			break;
		case "Down":
		case "ArrowDown":
			direction = width;
			break;
	}
}

// Event Listeners
document.addEventListener("keydown", control);
startBtn.addEventListener("click", startRestartGame);
