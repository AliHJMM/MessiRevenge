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