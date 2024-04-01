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
  attempts: 0, // Track user attempts
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

// ... (remaining drawing functions)

function endGame() {
  game.gameOver = true;
  game.attempts++; // Increment attempt count after endGame

  // Execute function after 3 attempts (conditional execution)
  if (game.attempts >= 5) {
    executeAfterAttempts();
  }

  // ... (remaining endGame logic)
}

function executeAfterAttempts() {
  alert('You lost! Click OK to proceed');
  window.location.href = "three.html"; 
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