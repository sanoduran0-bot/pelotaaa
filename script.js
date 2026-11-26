const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restartBtn");

const GROUND_Y = 255;
const GRAVITY = 0.65;

let highScore = Number(localStorage.getItem("ballRunnerHighScore")) || 0;
highScoreEl.textContent = highScore;

let gameState = {
  running: true,
  score: 0,
  speed: 6,
  frameCount: 0,
  nextSpawnFrame: 70
};

const ball = {
  x: 110,
  y: GROUND_Y - 20,
  radius: 20,
  vy: 0,
  jumpForce: -13.5,
  grounded: true,
  rotation: 0
};

let obstacles = [];

function resetGame() {
  gameState = {
    running: true,
    score: 0,
    speed: 6,
    frameCount: 0,
    nextSpawnFrame: 70
  };
  ball.y = GROUND_Y - ball.radius;
  ball.vy = 0;
  ball.grounded = true;
  ball.rotation = 0;
  obstacles = [];
  scoreEl.textContent = "0";
  overlay.classList.add("hidden");
  requestAnimationFrame(gameLoop);
}

function jump() {
  if (!gameState.running) {
    resetGame();
    return;
  }
  if (ball.grounded) {
    ball.vy = ball.jumpForce;
    ball.grounded = false;
  }
}

function spawnObstacle() {
  const isTall = Math.random() > 0.55;
  const width = isTall ? 26 : 38;
  const height = isTall ? 52 : 34;

  obstacles.push({
    x: canvas.width + 20,
    y: GROUND_Y - height,
    width,
    height,
    passed: false
  });
}

function checkCircleRectCollision(circle, rect) {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const dx = circle.x - closestX;
  const dy = circle.y - closestY;

  return (dx * dx + dy * dy) < (circle.radius * circle.radius);
}

function update() {
  gameState.frameCount++;

  // Física de la pelota
  ball.vy += GRAVITY;
  ball.y += ball.vy;

  if (ball.y + ball.radius >= GROUND_Y) {
    ball.y = GROUND_Y - ball.radius;
    ball.vy = 0;
    ball.grounded = true;
  }

  // Rotación proporcional a la velocidad
  ball.rotation += gameState.speed * 0.045;

  // Generación dinámica de obstáculos
  if (gameState.frameCount >= gameState.nextSpawnFrame) {
    spawnObstacle();
    const minGap = Math.max(45, 95 - gameState.speed * 3);
    const randomExtra = Math.floor(Math.random() * 55);
    gameState.nextSpawnFrame = gameState.frameCount + minGap + randomExtra;
  }

  // Actualización de obstáculos y puntuación
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.x -= gameState.speed;

    if (checkCircleRectCollision(ball, obs)) {
      endGame();
      return;
    }

    if (!obs.passed && obs.x + obs.width < ball.x - ball.radius) {
      obs.passed = true;
      gameState.score += 10;
      scoreEl.textContent = gameState.score;

      // Aumentar velocidad cada 50 puntos
      if (gameState.score % 50 === 0) {
        gameState.speed += 0.5;
      }
    }

    if (obs.x + obs.width < -20) {
      obstacles.splice(i, 1);
    }
  }
}

function drawBall() {
  ctx.save();
  ctx.translate(ball.x, ball.y);
  ctx.rotate(ball.rotation);

  // Cuerpo de la pelota
  ctx.beginPath();
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#38bdf8";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#e0f2fe";
  ctx.stroke();

  // Franja interna para apreciar el giro
  ctx.beginPath();
  ctx.moveTo(-ball.radius + 3, 0);
  ctx.lineTo(ball.radius - 3, 0);
  ctx.strokeStyle = "#0284c7";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();
}

function drawObstacles() {
  obstacles.forEach((obs) => {
    ctx.fillStyle = "#f43f5e";
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

    ctx.strokeStyle = "#fda4af";
    ctx.lineWidth = 2;
    ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function drawGround() {
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(canvas.width, GROUND_Y);
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  drawObstacles();
  drawBall();
}

function endGame() {
  gameState.running = false;
  if (gameState.score > highScore) {
    highScore = gameState.score;
    localStorage.setItem("ballRunnerHighScore", highScore);
    highScoreEl.textContent = highScore;
  }
  overlay.classList.remove("hidden");
}

function gameLoop() {
  if (!gameState.running) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Eventos de teclado, ratón y táctil
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();
    jump();
  }
});

canvas.addEventListener("pointerdown", () => {
  jump();
});

restartBtn.addEventListener("click", resetGame);

// Iniciar el juego
requestAnimationFrame(gameLoop);