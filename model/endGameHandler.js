import { freezeTimer } from "../controller/scoreboard.js";
import { freezeRonaldos } from "./ronaldo.js";
import { ronaldoInterval, stopAllBackgroundMusic } from "../../game.js";
import { showEndStoryDialog } from "./storyDialog.js";

let dialogDisplayed = false;

// Handles the game over state, displaying game over UI and stopping game elements
export function gameOver() {
  if (dialogDisplayed) return;
  dialogDisplayed = true;

  const gameOverImage =
    "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493360/RonaldoSaudiWC_wejfcq.webp";
  const gameOverElement = document.getElementById("game-over");
  gameOverElement.style.backgroundImage = `url('${gameOverImage}')`;

  gameOverElement.style.visibility = "visible";
  document.getElementById("restart-button").style.display = "block";
  document.getElementById("messi").style.display = "none";
  document.getElementById("scoreboard").style.display = "none";

  const madridContainers = document.getElementsByClassName("madrid-container");
  if (madridContainers.length > 0) {
    madridContainers[0].style.display = "none";
  }

  freezeRonaldos();
  freezeTimer();
  clearInterval(ronaldoInterval);
  stopAllBackgroundMusic();

  showEndStoryDialog(false);

  // Define the restart function to reset the game
  window.restartGame = () => {
    gameOverElement.style.display = "none";
    document.getElementById("restart-button").style.display = "none";
    dialogDisplayed = false;
    window.location.reload(true);
  };
}