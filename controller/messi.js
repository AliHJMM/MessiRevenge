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