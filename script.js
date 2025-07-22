const story = document.getElementById("story");
const choices = document.getElementById("choices");
const tipBtn = document.getElementById("tipBtn");
const healthSpan = document.getElementById("health");
const scoreSpan = document.getElementById("score");
const progress = document.getElementById("progress");

let health = 3;
let score = 0;
let level = 0;

const tips = [
  "Stay calm when you see danger.",
  "Think before you choose. Sometimes waiting is better.",
  "Choose colors wisely; they may mean something!",
  "Observe your environment, clues are hidden.",
  "Trust your instincts but use logic."
];

const sounds = {
  click: new Audio('assets/click.mp3'),
  gameover: new Audio('assets/gameover.mp3'),
  victory: new Audio('assets/victory.mp3')
};

function playSound(sound) {
  sounds[sound].currentTime = 0;
  sounds[sound].play();
}

tipBtn.onclick = () => {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  alert("💡 Tip: " + tip);
};

function updateHUD() {
  healthSpan.textContent = `❤️ Health: ${health}`;
  scoreSpan.textContent = `💰 Score: ${score}`;
  progress.value = level;
}

function startGame() {
  health = 3;
  score = 0;
  level = 0;
  updateHUD();
  nextScene();
}

function nextScene() {
  level++;
  updateHUD();
  if (level === 1) {
    story.innerText = "You're at a crossroad. Where do you want to go?";
    choices.innerHTML = `
      <button onclick="choose('left')">Go Left</button>
      <button onclick="choose('right')">Go Right</button>
    `;
  } else if (level === 2) {
    story.innerText = "You see a mysterious lake with a boat and a bridge.";
    choices.innerHTML = `
      <button onclick="choose('boat')">Take the boat</button>
      <button onclick="choose('bridge')">Cross the bridge</button>
    `;
  } else if (level === 3) {
    story.innerText = "You find a cave with shimmering lights. Enter?";
    choices.innerHTML = `
      <button onclick="choose('enter')">Enter Cave</button>
      <button onclick="choose('leave')">Leave it</button>
    `;
  } else if (level === 4) {
    story.innerText = "Three chests lie before you: Gold, Silver, and Wood.";
    choices.innerHTML = `
      <button onclick="choose('gold')">Open Gold Chest</button>
      <button onclick="choose('silver')">Open Silver Chest</button>
      <button onclick="choose('wood')">Open Wood Chest</button>
    `;
  } else if (level === 5) {
    victory();
  }
}

function choose(option) {
  playSound('click');

  switch (level) {
    case 1:
      if (option === 'left') {
        score += 10;
        nextScene();
      } else {
        loseHealth("You fell into a trap hole! 💀");
      }
      break;
    case 2:
      if (option === 'boat') {
        score += 20;
        nextScene();
      } else {
        loseHealth("The bridge collapsed! 🌊");
      }
      break;
    case 3:
      if (option === 'enter') {
        score += 30;
        nextScene();
      } else {
        loseHealth("A snake bites you outside! 🐍");
      }
      break;
    case 4:
      if (option === 'wood') {
        score += 50;
        nextScene();
      } else {
        loseHealth("Poisonous gas from the chest! ☠️");
      }
      break;
  }
}

function loseHealth(message) {
  health--;
  updateHUD();
  if (health <= 0) {
    gameOver(message);
  } else {
    alert(message);
  }
}

function gameOver(reason) {
  playSound('gameover');
  story.innerText = reason + " Game Over!";
  choices.innerHTML = `<button onclick="startGame()">Restart Game</button>`;
}

function victory() {
  playSound('victory');
  story.innerText = "🎉 You found the ultimate treasure! You Win!";
  choices.innerHTML = `<button onclick="startGame()">Play Again</button>`;
}

startGame();

