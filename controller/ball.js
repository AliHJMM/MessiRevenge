import { isClash } from "../model/clash.js";
import { increaseScore } from "./scoreboard.js";
import { madridArray } from "../model/madridArmy.js";

// Creates and launches a ball from Messi's position
export function createBall() {
  const messi = document.getElementById("messi");
  const messiRect = messi.getBoundingClientRect();

  const ball = document.createElement("img");
  ball.src =
    "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493346/cartoon-soccer-ball-sticker-preview-removebg-preview_f9cbqe.png";
  ball.style.height = "20px";
  ball.classList.add("ball");

   // Position ball at Messi's location
  ball.style.position = "absolute";
  ball.style.left = `${messiRect.left + messiRect.width / 2}px`;
  ball.style.top = `${messiRect.top - 20}px`;

  document.body.appendChild(ball);

  let topPosition = parseInt(ball.style.top, 10);

    // Move ball upwards and check for clash
  function moveBall() {
    topPosition -= 10;
    ball.style.top = `${topPosition}px`;

    if (topPosition < 0) {
      ball.remove();
    } else {
      madridArray.forEach((row) => {
        row.forEach((madrid) => {
          if (madrid.status === "alive" && isClash(ball, madrid.element)) {
            ball.remove();
            madrid.element.remove();
            madrid.status = "dead";
            increaseScore();
          }
        });
      });
      requestAnimationFrame(moveBall);
    }
  }

 requestAnimationFrame(moveBall);
}
