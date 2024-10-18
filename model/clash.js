import { decreaseLives } from "../controller/scoreboard.js";

// Checks for a clash between the ball and a madrid element
export function isClash(ball, madridElement) {
  const ballRect = ball.getBoundingClientRect();
  const madridRect = madridElement.getBoundingClientRect();

  return !(
    ballRect.top > madridRect.bottom ||
    ballRect.bottom < madridRect.top ||
    ballRect.right < madridRect.left ||
    ballRect.left > madridRect.right
  );
}