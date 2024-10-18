import { detectClash } from "./clash.js";
import { madridArray } from "./madridArmy.js";

const activeRonaldos = [];
let ronaldoMovementInterval = 100;

// Sets the movement speed of Ronaldo elements
export function setRonaldoMovementParameters(newMovementInterval) {
  ronaldoMovementInterval = newMovementInterval;
}

// Creates a new Ronaldo element originating from a random alive Madrid element
export function createRonaldo() {
    const aliveMadrid = [];
    madridArray.forEach((row) => {
      row.forEach((madrid) => {
        if (madrid.status === "alive") {
          aliveMadrid.push(madrid);
        }
      });
    });
  
    if (aliveMadrid.length === 0) return;
  
    const randomMadrid =
      aliveMadrid[Math.floor(Math.random() * aliveMadrid.length)];
    const ronaldo = document.createElement("img");
    ronaldo.src =
      "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493345/HHHHHHHHHHHHHHHHHHHHH-removebg-preview_znergl.png";
    ronaldo.style.height = "50px";
    ronaldo.classList.add("ronaldo");
    ronaldo.style.position = "absolute";
    ronaldo.style.left = `${randomMadrid.x + 25}px`;
    ronaldo.style.top = `${randomMadrid.y + 50}px`;
    document.body.insertBefore(ronaldo, document.body.firstChild);
  
    let topPosition = parseInt(ronaldo.style.top, 10);
  
    // Moves Ronaldo element downward and checks for collisions with Messi
    function moveRonaldo() {
      topPosition += 10;
      ronaldo.style.top = `${topPosition}px`;
  
      detectClash(ronaldo, messi);
  
      if (topPosition > window.innerHeight) {
        ronaldo.remove();
        activeRonaldos.splice(activeRonaldos.indexOf(moveRonaldo), 1);
      }else {
           requestAnimationFrame(moveRonaldo);
      }
    }
  
    requestAnimationFrame(moveRonaldo);
    activeRonaldos.push(moveRonaldo);
  }

  // Stops all active Ronaldo movements
export function freezeRonaldos() {
    activeRonaldos.forEach((interval) => clearInterval(interval));
  }

  // Resumes movement of all Ronaldo elements currently on the screen
export function resumeRonaldos() {
    document.querySelectorAll(".ronaldo").forEach((ronaldo) => {
      let topPosition = parseInt(ronaldo.style.top, 10);
  
      function moveRonaldo() {
        topPosition += 10;
        ronaldo.style.top = `${topPosition}px`;
  
        detectClash(ronaldo, messi);
  
        if (topPosition > window.innerHeight) {
          ronaldo.remove();
          clearInterval(movementInterval);
          activeRonaldos.splice(activeRonaldos.indexOf(movementInterval), 1);
        }
      }
  
      const movementInterval = setInterval(moveRonaldo, ronaldoMovementInterval);
      activeRonaldos.push(movementInterval);
    });
  }
  