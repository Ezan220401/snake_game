const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let speed = 200;
let gameInterval;

const boxSize = 20;
let direction = "RIGHT";
let snake = [{ x: 200, y: 200 }];
let food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
let score = 0;
let lastSpeedUpdateScore = 0;

function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, boxSize, boxSize);
}

function getRandomCoordinate() {
  return Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBox(food.x, food.y, "orange");
  snake.forEach((segment, index) =>
    drawBox(segment.x, segment.y, index === 0 ? "green" : "lightgreen")
  );

  let head = { ...snake[0] };
  if (direction === "UP") head.y -= boxSize;
  if (direction === "DOWN") head.y += boxSize;
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
  } else {
    snake.pop();
  }

  if (score % 5 === 0 && score !== lastSpeedUpdateScore && speed > 50) {
    speed -= 20;
    lastSpeedUpdateScore = score;
    startGame();
  }

  if ( // cek dimana kepala ular
    
  // apakah keluar batas
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    //apakah kepala menabrak ekor
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    isGameOver = true;
    clearInterval(gameInterval); // menghentikan game loop
    // menampilkan texxt
    ctx.fillStyle = "Red";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 30);
    return;
}

  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, speed);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

 // Event Listener untuk tombol sentuh
 document.getElementById("upButton").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});

document.getElementById("downButton").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});

document.getElementById("leftButton").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});

document.getElementById("rightButton").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});

document.getElementById("reloadButton").addEventListener("click", function () {
  location.reload();
});

startGame();
