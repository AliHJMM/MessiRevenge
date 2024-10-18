export let madridArray = [];

// Creates a grid of madrid elements and positions them on the screen
export function createMadrid(rows, cols) {
  madridArray = [];
  for (let i = 0; i < rows; i++) {
    madridArray[i] = [];
    for (let j = 0; j < cols; j++) {
      const madrid = document.createElement("img");
      madrid.src =
        "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493345/Madrid-removebg-preview_e1nk63.png";
      madrid.classList.add("madrid");
      madrid.style.height = "50px";
      madrid.style.width = "50px";
      madrid.style.position = "absolute";

       // Calculate and set position for each madrid element
      const x = 50 + j * (50 + 5); // 50px width + 5px spacing
      const y = 100 + i * (50 + 5);
      madrid.style.left = `${x}px`;
      madrid.style.top = `${y}px`;
      document.body.appendChild(madrid);

       // Store each madrid element in the array with its position and status
      madridArray[i][j] = {
        element: madrid,
        x: x,
        y: y,
        status: "alive",
      };
    }
  }
}
