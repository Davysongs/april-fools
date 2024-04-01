const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Get window dimensions for responsive sizing
const width = window.innerWidth;
const height = window.innerHeight;

// Adjust canvas size based on window dimensions
canvas.width = width > 320 ? 320 : width; // Limit max width for smaller screens
canvas.height = height > 480 ? 480 : height; // Limit max height for smaller screens

// Game variables
let bird = {
  x: canvas.width / 5,
  y: canvas.height / 2,
  radius: 10,
  velocity: 0,
  gravity: 0.5,
};

let pipes = [];
let score = 0;
let gameOver = false;

// Function to draw the bird
function drawBird() {
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
}

// Function to draw the pipes
function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.upperHeight);
    ctx.fillRect(pipe.x, pipe.lowerY, pipe.width, canvas.height - pipe.lowerY);
  }
}

// Function to update the game state
function update() {
  if (gameOver) return; // Stop updates if game over

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Check for collisions with ground
  if (bird.y + bird.radius > canvas.height) {
    gameOver = true;
  }

  // Update pipes
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    pipe.x -= 5;

    if (pipe.x + pipe.width < 0) {
      pipes.shift();
    }

    // Check for collisions with pipes
    if (
      (bird.x + bird.radius > pipe.x &&
        bird.x - bird.radius < pipe.x + pipe.width) &&
      (bird.y - bird.radius < pipe.upperHeight ||
        bird.y + bird.radius > pipe.lowerY)
    ) {
      gameOver = true;
    }
  }

  // Add new pipes
  if (Math.random() > 0.95) {
    const gap = Math.floor(Math.random() * 150) + 100;
    pipes.push({
      x: canvas.width,
      width: 50,
      upperHeight: gap,
      lowerY: gap + 150,
    });
  }
}

// Function to draw the score
function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Function to draw the game over screen (optional)
function drawGameOver() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '30px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 50, canvas.height / 2);
}

// Event listener for touch events (mobile-friendly)
canvas.addEventListener('touchstart', () => {
  bird.velocity = -10; // Jump on touch start
});

// Event listener for keyboard space key (desktop)
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !gameOver) {
    bird.velocity = -10; // Jump on space key press
  }
});

// Game loop function
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  drawPipes();
  drawBird();
  drawScore();
  if (gameOver) {
    drawGameOver(); // Display game over screen if game over
  } else {
    update(); // Update game state if not game over
  }

  requestAnimationFrame(animate); // Schedule next animation frame
}

animate(); // Start the game loop

