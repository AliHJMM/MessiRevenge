import { madridArray } from "./madridArmy.js";
import { gameOver, victory } from "./endGameHandler.js";

let armyDirection = "right";
let armyDx = 10;
let armyDy = 20;
let armySpeed = 1;
let frameCount = 0;
let armyPrevFrameCount = 0;

// Sets movement parameters for the Madrid army
export function setMadridMovementParameters(newSpeedX, newStepY) {
  armyDx = newSpeedX;
  armyDy = newStepY;
}