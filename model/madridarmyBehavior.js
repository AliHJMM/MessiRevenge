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

// Moves the Madrid army across the screen and checks for victory or game over conditions
export function moveMadrid() {
    frameCount++;
    if (frameCount - armyPrevFrameCount > armySpeed) {
      armyPrevFrameCount = frameCount;
  
      let dx = 0;
      let dy = 0;
  
      let rightMostX = 0;
      let leftMostX = window.innerWidth;
  
        // Determine boundaries of the Madrid army
      madridArray.forEach((row) => {
        row.forEach((madrid) => {
          if (madrid.status === "alive") {
            if (madrid.x > rightMostX) rightMostX = madrid.x;
            if (madrid.x < leftMostX) leftMostX = madrid.x;
          }
        });
      });
  
      // Change direction and step down if army reaches screen edge
      if (armyDirection === "right") {
        if (rightMostX + armyDx + 50 >= window.innerWidth) {
          armyDirection = "left";
          dy = armyDy;
        } else {
          dx = armyDx;
        }
      } else {
        if (leftMostX - armyDx <= 0) {
          armyDirection = "right";
          dy = armyDy;
        } else {
          dx = -armyDx;
        }
      }
  
      let aliveMadrid = 0;
  
       // Update position of each alive Madrid element
      madridArray.forEach((row) => {
        row.forEach((madrid) => {
          if (madrid.status === "alive") {
            madrid.x += dx;
            madrid.y += dy;
            madrid.element.style.left = `${madrid.x}px`;
            madrid.element.style.top = `${madrid.y}px`;
  
             // Trigger game over if any Madrid element reaches the bottom
            if (madrid.y + 50 >= window.innerHeight) {
              gameOver();
            }
            aliveMadrid++;
          }
        });
      });
  
       // Trigger victory if no Madrid elements are left alive
      if (aliveMadrid === 0) {
        victory();
      }
    }
  }
  