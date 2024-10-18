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