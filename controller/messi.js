import { createBall } from "./ball.js";

// Tracks the state of control keys (right, left, up)
export const keys = {
  right: false,
  left: false,
  up: false,
};
import { isAllowed } from "../game.js";
const messi = document.getElementById("messi");
const messiWidth = messi.offsetWidth;
const windowWidth = window.innerWidth;
let leftPosition = messi.offsetLeft;
let speed = 10;
let ballInterval = null;

// Sets up event listeners for keydown and keyup to control Messi's movement and shooting
function setupControls() {
  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
    if ((e.key === "ArrowUp" || e.key === "w" || e.key === " ") && isAllowed) {
      keys.up = true;
      startShooting();
    }
  });

  document.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
    if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
      keys.up = false;
      stopShooting();
    }
  });
}

// Starts shooting balls at an interval if the up key is held down
function startShooting() {
  if (ballInterval) return;
  createBall();

  ballInterval = setInterval(() => {
    if (keys.up) {
      createBall();
    }
  }, 500);
}

// Stops the shooting interval when the up key is released
function stopShooting() {
  clearInterval(ballInterval);
  ballInterval = null;
}

// Moves Messi left or right based on key input
export function moveMessi() {
  if (keys.left) {
    leftPosition -= speed;
    if (leftPosition < 0) {
      leftPosition = 0;
    }
  } else if (keys.right) {
    leftPosition += speed;
    if (leftPosition > windowWidth - messiWidth) {
      leftPosition = windowWidth - messiWidth;
    }
  }
  messi.style.left = leftPosition + "px";
}

// Main function to handle Messi's movement and setup controls
export function messiMovement() {
  if (!window.controlsSet) {
    setupControls();
    window.controlsSet = true;
  }
  moveMessi();
}
