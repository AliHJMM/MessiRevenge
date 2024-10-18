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