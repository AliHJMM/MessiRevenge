import { detectClash } from "./clash.js";
import { madridArray } from "./madridArmy.js";

const activeRonaldos = [];
let ronaldoMovementInterval = 100;

// Sets the movement speed of Ronaldo elements
export function setRonaldoMovementParameters(newMovementInterval) {
  ronaldoMovementInterval = newMovementInterval;
}