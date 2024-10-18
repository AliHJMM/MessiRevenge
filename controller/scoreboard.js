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