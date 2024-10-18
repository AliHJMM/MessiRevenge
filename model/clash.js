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

// Detects clash between ronaldo and messi, decreases lives if they clash
export function detectClash(ronaldo, messi) {
    messi = document.getElementById("messi");
    const ronaldoRect = ronaldo.getBoundingClientRect();
    const messiRect = messi.getBoundingClientRect();
  
    if (
      ronaldoRect.left < messiRect.right &&
      ronaldoRect.right > messiRect.left &&
      ronaldoRect.top < messiRect.bottom &&
      ronaldoRect.bottom > messiRect.top
    ) {
      decreaseLives();
      ronaldo.remove();
    }
  }
  