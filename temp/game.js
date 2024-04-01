const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game variables
const game = {
  width: window.innerWidth > 320 ? 320 : window.innerWidth,
  height: window.innerHeight > 480 ? 480 : window.innerHeight,
  bird: {
    x: 50,
    y: canvas.height / 2,
    radius: 6,
    velocityY: 0,
    gravity: 0.5,
    jumpStrength: -10,
  },
  pipes: [],
  score: 0,
  gameOver: false,
};

// Handle user input
document.addEventListener('keydown', handleKeyPress);
canvas.addEventListener('touchstart', handleTouch);

function handleKeyPress(event) {
  if (event.code === 'Space' && !game.gameOver) {
    flapBird();
  }
}

function handleTouch() {
  if (!game.gameOver) {
    flapBird();
  }
}

// Flap the bird
function flapBird() {
  game.bird.velocityY = game.bird.jumpStrength;
}

// Update game state
function update() {
  if (game.gameOver) return;

  game.bird.velocityY += game.bird.gravity;
  game.bird.y += game.bird.velocityY;

  // Check for collisions with ground
  if (game.bird.y + game.bird.radius > canvas.height) {
    endGame();
  }

  // Update pipes
  for (let i = 0; i < game.pipes.length; i++) {
    const pipe = game.pipes[i];
    pipe.x -= 5;

    if (pipe.x + pipe.width < 0) {
      game.pipes.shift();
      game.score++;
    }

    // Check for collisions with pipes
    if (
      (game.bird.x + game.bird.radius > pipe.x &&
        game.bird.x - game.bird.radius < pipe.x + pipe.width) &&
      (game.bird.y - game.bird.radius < pipe.upperHeight ||
        game.bird.y + game.bird.radius > pipe.lowerY)
    ) {
      endGame();
    }
  }

  // Add new pipes
  if (Math.random() > 0.95) {
    const gap = Math.floor(Math.random() * 150) + 100;
    game.pipes.push({
      x: canvas.width,
      width: 40,
      upperHeight: gap,
      lowerY: gap + 200,
    });
  }
}

// Draw the game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawPipes();
  drawScore();
  if (game.gameOver) {
    drawGameOver();
  }
}

function drawBird() {
  ctx.beginPath();
  ctx.arc(game.bird.x, game.bird.y, game.bird.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
}

function drawPipes() {
  for (let i = 0; i < game.pipes.length; i++) {
    const pipe = game.pipes[i];
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.upperHeight);
    ctx.fillRect(pipe.x, pipe.lowerY, pipe.width, canvas.height - pipe.lowerY);
  }
}
function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${game.score}`, 10, 20);
}

function drawGameOver() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '30px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 50, canvas.height / 2);
}
var money = 0
const cashoutButton = document.getElementById("cashout")
function endGame() {
  game.gameOver = true;
  var cash = document.getElementById("cash")
  money = parseInt(game.score) * 10
  cash.innerHTML=`Cash : &#x20A6;${money}`
  if (game.score >= 10){
    cashoutButton.style.display = "initial"
  }
}

// Main game loop
function gameLoop() {
  if (!game.gameOver) {
    update();
  }
  draw();
  requestAnimationFrame(gameLoop);
}

canvas.width = game.width;
canvas.height = game.height;
gameLoop();

document.addEventListener('DOMContentLoaded', function () {
  const restartButton = document.getElementById('restart-btn');
  restartButton.addEventListener('click', function () {
      window.location.reload(); // Reload the page
  });
});

cashoutButton.addEventListener('click', () => {
  window.location.href = "three.html"; 
});