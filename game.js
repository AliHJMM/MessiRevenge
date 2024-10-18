// Importing modules for different game elements and functionalities
import {
    createRonaldo,
    setRonaldoMovementParameters,
    freezeRonaldos,
    resumeRonaldos,
  } from "./model/ronaldo.js";
  import { createMadrid } from "./model/madridArmy.js";
  import { messiMovement } from "./controller/messi.js";
  import {
    freezeTimer,
    resumeTimer,
    startTimer,
  } from "./controller/scoreboard.js";
  import {
    moveMadrid,
    setMadridMovementParameters,
  } from "./model/madridArmyBehavior.js";
  import { showStoryDialog } from "./model/storyDialog.js";
  
  // Global game state variables
  let gameStarted = false;
  window.pause = false;
  export let ronaldoInterval = 0;
  let currentDifficulty = "normal";
  export let isAllowed = true;
  
  // Background music configuration for each difficulty level
  const backgroundMusic = {
    normal: new Audio(
      "https://res.cloudinary.com/dovvtjnrs/video/upload/v1728489877/UEFA_bcgsel.mp3"
    ),
    hard: new Audio(
      "https://res.cloudinary.com/dovvtjnrs/video/upload/v1728489878/GigaChad_dsh3cp.mp3"
    ),
    mercy: new Audio(
      "https://res.cloudinary.com/dovvtjnrs/video/upload/v1728489876/BurningMemory_ovds7f.mp3"
    ),
  };
  
  // Set background music properties (looping, volume, preload)
  Object.values(backgroundMusic).forEach((music) => {
    music.loop = true;
    music.volume = 0.5;
    music.preload = "auto";
  });
  
  // Stop all background music
  export function stopAllBackgroundMusic() {
    Object.values(backgroundMusic).forEach((music) => {
      music.pause();
      music.currentTime = 0;
    });
  }
  
  // Play sound when hovering over certain buttons
  function playHoverSound(audioId) {
    const audioElement = document.getElementById(audioId);
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch((error) => {
        console.error("Hover audio playback failed:", error);
      });
    }
  }

  // Check screen size for optimal display
function checkScreenSize() {
    const requiredWidth = 1300;
    const currentWidth = window.innerWidth;
    const zoomLevel = Math.round((currentWidth / window.outerWidth) * 100);
    const warningMessage = document.getElementById("warning-message");
  
    if (currentWidth < requiredWidth || zoomLevel !== 100) {
      warningMessage.style.display = "flex";
    } else {
      warningMessage.style.display = "none";
    }
  }
  
  // Stop hover sound when mouse leaves button
  function stopHoverSound(audioId) {
    const audioElement = document.getElementById(audioId);
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }
  
  // Set up hover sounds for buttons with specific audio IDs
  function setupHoverSounds() {
    const buttons = document.querySelectorAll(".button-with-image");
  
    buttons.forEach((button) => {
      const hoverAudioId = button.getAttribute("data-hover-audio");
  
      button.addEventListener("mouseover", () => playHoverSound(hoverAudioId));
      button.addEventListener("mouseout", () => stopHoverSound(hoverAudioId));
    });
  }
  
  setupHoverSounds();

  // Show story dialog on initial game load
window.addEventListener("load", () => {
    console.log("Window loaded - showing introduction story");
    document.getElementById("main-menu").style.display = "none";
    showStoryDialog("introduction", 0);
  });
  
  // Pause all background music temporarily
  function pauseBackgroundMusic() {
    Object.values(backgroundMusic).forEach((music) => {
      music.pause();
    });
  }
  
  // Resume background music based on current difficulty
  function resumeBackgroundMusic() {
    if (backgroundMusic[currentDifficulty]) {
      backgroundMusic[currentDifficulty].play().catch((error) => {
        console.error("Background music playback failed:", error);
      });
    }
  }

  // Determine Ronaldo spawn interval based on selected difficulty
function getRonaldoSpawnInterval() {
    return currentDifficulty === "normal"
      ? 400
      : currentDifficulty === "hard"
      ? 200
      : currentDifficulty === "mercy"
      ? 100
      : 500;
  }
  
  // Start the game with selected difficulty settings
  window.startGame = (difficulty) => {
    console.log("Start game clicked with difficulty:", difficulty);
    currentDifficulty = difficulty;
  
    stopAllBackgroundMusic();
  
    if (backgroundMusic[difficulty]) {
      backgroundMusic[difficulty].play().catch((error) => {
        console.error("Background music playback failed:", error);
      });
    }
  
    gameStarted = true;
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-area").style.visibility = "visible";
    document.getElementById("messi").style.visibility = "visible";
    document.getElementById("scoreboard").style.visibility = "visible";
  
    // Set movement parameters and spawn intervals for Ronaldo based on difficulty
    let speedX, stepY, ronaldoMovementInterval, ronaldoSpawnInterval;
  
    if (difficulty === "normal") {
      speedX = 25;
      stepY = 25;
      ronaldoMovementInterval = 40;
      ronaldoSpawnInterval = 350;
    } else if (difficulty === "hard") {
      speedX = 30;
      stepY = 30;
      ronaldoMovementInterval = 30;
      ronaldoSpawnInterval = 150;
    } else if (difficulty === "mercy") {
      speedX = 35;
      stepY = 35;
      ronaldoMovementInterval = 18;
      ronaldoSpawnInterval = 70;
    } else {
      speedX = 15;
      stepY = 15;
      ronaldoMovementInterval = 50;
      ronaldoSpawnInterval = 500;
    }
  
    createMadrid(3, 15);
  
    setMadridMovementParameters(speedX, stepY);
    setRonaldoMovementParameters(ronaldoMovementInterval);
    ronaldoInterval = setInterval(createRonaldo, ronaldoSpawnInterval);
  
    requestAnimationFrame(update);
    startTimer();
  };