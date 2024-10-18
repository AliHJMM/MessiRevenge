import { gameOver, victory } from "../model/endGameHandler.js";
import { showStoryDialog } from "../model/storyDialog.js";

let initialTime,
  lives = 3,
  score = 0;

let offaudio = new Audio(
    "https://res.cloudinary.com/dovvtjnrs/video/upload/v1728489873/SUIII_mw36pb.mp3"
  ),
  cjaudio = new Audio(
    "https://res.cloudinary.com/dovvtjnrs/video/upload/v1728491429/HHHHH_SUIIII_w4ypir_i71x1e.mp3"
  );

let winaudio = new Audio(
  "https://res.cloudinary.com/dovvtjnrs/video/upload/v1728492085/messiwon_ua96bn.mp3"
);

let pauseStartTime,
  totalPausedDuration = 0,
  isTimerPaused = false;

    // Updates and displays remaining time, triggers game over if time runs out
export function updateTimer() {
    if (isTimerPaused) return;
  
    var elapsed = new Date() - initialTime;
    var remainingTime = Math.max(
      0,
      1000 * 60 * 1 - elapsed + totalPausedDuration
    );
    document.getElementById("timer").innerHTML = formatTime(remainingTime);
    if (remainingTime > 0) {
      setTimeout(updateTimer, 1000 - (elapsed % 1000));
    } else {
      gameOver();
    }
  }

  // Formats time in "Time: MM:SS" format
export function formatTime(ms) {
    var totalSeconds = Math.floor(ms / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Starts the timer countdown
export function startTimer() {
    initialTime = new Date();
    totalPausedDuration = 0;
    setTimeout(updateTimer, 500);
  }

  // Pauses and resumes the timer
export const freezeTimer = () => {
    isTimerPaused = true;
    pauseStartTime = new Date();
  };

  export const resumeTimer = () => {
    if (isTimerPaused) {
      let currentPauseDuration = new Date() - pauseStartTime;
      totalPausedDuration += currentPauseDuration;
    }
    isTimerPaused = false;
    updateTimer();
  };

  // Updates the display of lives on the UI
export function updateLives() {
    const livesContainer = document.getElementById("lives");
    livesContainer.innerHTML = "";
  
    for (let i = 0; i < lives; i++) {
      const lifeImage = document.createElement("img");
      lifeImage.src =
        "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493346/BDOR_nvwwrj.png";
      lifeImage.alt = "Life";
      lifeImage.style.width = "60px";
      lifeImage.style.margin = "0 10px";
      livesContainer.appendChild(lifeImage);
    }
  }

  // Decreases lives, triggers game over if lives reach zero
export function decreaseLives() {
    lives--;
    updateLives();
    if (lives <= 0) {
      cjaudio.play();
      gameOver();
      return;
    }
    offaudio.play();
  }

  updateLives();

// Increases score and handles story dialog at certain milestones
export function increaseScore() {
  score += 50;

  if (score >= 1125 && score < 1175) {
    window.pauseGame();
    showStoryDialog("development");

    const storyButton = document.querySelector(".start-button");
    if (storyButton) {
      storyButton.addEventListener("click", () => {
        console.log("Resuming game after story dialog");
        window.pauseGame();
      });
    }
  }

  if (score >= 2250) {
    winaudio.play();
    victory();
    return;
  }
  updatescore();
}

// Updates score display on the UI
export function updatescore() {
    document.getElementById("score").innerText = `Score: ${score}`;
  }
  