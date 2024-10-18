export const storyDialogs = {
    introduction: [
      {
        image:
          "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493346/messiKids_oftwap.jpg",
        text: "It was just another regular day for Messi's children at school. But that peace was shattered when Ronaldo, along with his Real Madrid teammates, stormed the school grounds.",
        buttonText: "Next",
      },
      {
        image:
          "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493346/ronaldoinSchool_fjfkep.jpg",
        text: "Without any reasons, Ronaldo confronts Messi's children. In an act of unprovoked aggression, he attacks them, leaving them injured and frightened.",
        buttonText: "Next",
      },
      {
        image:
          "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493344/messiangry_fdfsim.webp",
        text: "Ronaldo?????!!!!!!!!",
        buttonText: "Start Game",
      },
    ],
    development: {
      image:
        "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493346/messi1125_if4kca.webp",
      text: "Messi powers through the first waves of Real Madrid defenders, evading enemy fire and showing no mercy.",
      buttonText: "Lets Gooo!!!",
    },
    conclusion: {
      win: {
        image:
          "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493376/messiwon_aptp5u.jpg",
        text: "With a final, powerful strike, Messi defeats Ronaldo and his Real Madrid forces, bringing peace and justice for his children !!!",
        buttonText: "Lets Gooo!!!",
      },
      lose: {
        image:
          "https://res.cloudinary.com/dovvtjnrs/image/upload/v1728493360/RonaldoSaudiWC_wejfcq.webp",
        text: "Despite his best efforts, Messi's rage couldn't overcome the overwhelming forces of Real Madrid. Ronaldo’s taunting laugh echoes as Messi vows to return stronger.",
        buttonText: "OK",
      },
    },
  };
  
  // Shows story dialog based on the stage (e.g., introduction, development)
  export function showStoryDialog(stage, pageIndex = 0) {
    const overlay = document.createElement("div");
    overlay.id = "story-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";
    overlay.style.overflow = "auto";
  
    const dialog = document.createElement("div");
    dialog.classList.add("menu");
    dialog.style.backgroundColor = "rgba(119, 209, 142, 0.9)";
    dialog.style.padding = "30px";
    dialog.style.borderRadius = "10px";
    dialog.style.textAlign = "center";
    dialog.style.color = "white";
    dialog.style.maxWidth = "90%";
    dialog.style.width = "600px";
    dialog.style.boxSizing = "border-box";
  
    if (stage === "introduction") {
      const storyPage = storyDialogs[stage][pageIndex];
      const image = document.createElement("img");
      image.src = storyPage.image;
      image.style.width = "100%";
      image.style.maxWidth = "600px";
      image.style.height = "auto";
      image.style.marginBottom = "20px";
      dialog.appendChild(image);
  
      const text = document.createElement("p");
      text.innerText = storyPage.text;
      text.style.fontSize = "1.2em";
      text.style.lineHeight = "1.5em";
      dialog.appendChild(text);
  
      const button = document.createElement("button");
      button.classList.add("start-button");
      button.innerText = storyPage.buttonText;
      button.style.marginTop = "20px";
      button.onclick = () => {
        document.body.removeChild(overlay);
        if (pageIndex < storyDialogs[stage].length - 1) {
          showStoryDialog(stage, pageIndex + 1);
        } else {
          document.getElementById("main-menu").style.display = "flex";
        }
      };
      dialog.appendChild(button);
    } else if (stage === "development") {
      const storyPage = storyDialogs[stage];
      const image = document.createElement("img");
      image.src = storyPage.image;
      image.style.width = "100%";
      image.style.maxWidth = "600px";
      image.style.height = "auto";
      image.style.marginBottom = "20px";
      dialog.appendChild(image);
  
      const text = document.createElement("p");
      text.innerText = storyPage.text;
      dialog.appendChild(text);
  
      const button = document.createElement("button");
      button.classList.add("start-button");
      button.innerText = storyPage.buttonText;
      button.onclick = () => {
        document.body.removeChild(overlay);
        window.pauseGame();
      };
      dialog.appendChild(button);
    }
  
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
  }
  
  let dialogDisplayed = false;
  
  // Displays the ending story dialog for win or loss
  export function showEndStoryDialog(isVictory) {
    if (dialogDisplayed) {
      console.log("Dialog already displayed, skipping function call.");
      return;
    }
    dialogDisplayed = true;
  
    const overlay = document.createElement("div");
    overlay.id = "story-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";
  
    const dialog = document.createElement("div");
    dialog.classList.add("menu");
    dialog.style.backgroundColor = "rgba(119, 209, 142, 0.9)";
    dialog.style.padding = "30px";
    dialog.style.borderRadius = "10px";
    dialog.style.textAlign = "center";
    dialog.style.color = "white";
    dialog.style.maxWidth = "90%";
    dialog.style.width = "600px";
  
    const storyPage = isVictory
      ? storyDialogs.conclusion.win
      : storyDialogs.conclusion.lose;
  
    const image = document.createElement("img");
    image.src = storyPage.image;
    image.style.width = "100%";
    image.style.maxWidth = "600px";
    image.style.height = "auto";
    image.style.marginBottom = "20px";
    dialog.appendChild(image);
  
    const text = document.createElement("p");
    text.innerText = storyPage.text;
    text.style.fontSize = "1.2em";
    text.style.lineHeight = "1.5em";
    dialog.appendChild(text);
  
    const button = document.createElement("button");
    button.classList.add("start-button");
    button.innerText = storyPage.buttonText;
    button.style.marginTop = "20px";
    button.onclick = () => {
      console.log("End story button clicked");
  
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
        console.log("Overlay removed successfully");
      } else {
        console.error("Overlay not found in document body");
      }
  
      dialogDisplayed = false;
  
      const restartButton = document.getElementById("restart-button");
      if (restartButton) {
        restartButton.style.zIndex = "1010";
        restartButton.style.display = "block";
        setTimeout(() => {
          restartButton.focus();
        }, 100);
        console.log("Restart button displayed and focused");
      } else {
        console.error("Restart button not found!");
      }
    };
    dialog.appendChild(button);
  
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    console.log("Overlay and dialog appended to the document body");
  }
  