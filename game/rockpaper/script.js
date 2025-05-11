var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;

var choices = ["rock", "paper", "scissors"];


const bgMusic = new Audio("/game/rockpaper/assets/bcg3-lofi.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;


const resultSound = new Audio("/game/rockpaper/assets/game-complete.mp3.mp3");


window.onload = function () {
  bgMusic.play().catch(() => {
  });

  for (let i = 0; i < choices.length; i++) {
    let choice = document.createElement("img");
    choice.id = choices[i];
    choice.src = "/game/rockpaper/assets/" + choices[i] + ".png";
    choice.addEventListener("click", selectChoice);
    document.getElementById("choices").append(choice);
  }
};

const exit = document.getElementById("firstExit"); 
exit.addEventListener("click", function () {
  window.location.href = "/../../home/homepage.html"; 
});

let roundCount = 0;

function selectChoice() {
  clickSound.currentTime = 0;
  clickSound.play();

  you = this.id;
  document.getElementById("your-choice").src =
    "/game/rockpaper/assets/" + you + ".png";

  opponent = choices[Math.floor(Math.random() * 3)];
  document.getElementById("opponent-choice").src =
    "/game/rockpaper/assets/" + opponent + ".png";

  roundCount++;

  if (you === opponent) {
    yourScore += 1;
    opponentScore += 1;
  } else if (
    (you === "rock" && opponent === "scissors") ||
    (you === "scissors" && opponent === "paper") ||
    (you === "paper" && opponent === "rock")
  ) {
    yourScore += 1;
  } else {
    opponentScore += 1;
  }

  document.getElementById("your-score").innerText = "Your Score: " + yourScore;
  document.getElementById("opponent-score").innerText =
    "Opponent Score: " + opponentScore;

  if (roundCount === 10) {
    showGameOver();
  }
}

function showGameOver() {
  resultSound.play();

  document.querySelector(".game-area").classList.add("hidden");
  document.getElementById("game-over").classList.remove("hidden");

  document.getElementById("finalScore").innerText = yourScore;
  document.getElementById("allQuestion").innerText = roundCount;

  document.getElementById("game-result").innerText =
    yourScore > opponentScore
      ? "You Win!"
      : yourScore < opponentScore
      ? "You Lose!"
      : "It's a Draw!";

  document.getElementById("play-again").addEventListener("click", () => {
    yourScore = 0;
    opponentScore = 0;
    roundCount = 0;

    document.getElementById("your-score").innerText = "Your Score: 0";
    document.getElementById("opponent-score").innerText = "Opponent Score: 0";
    document.getElementById("game-over").classList.add("hidden");
    document.querySelector(".game-area").classList.remove("hidden");
  });

  const exit2 = document.getElementById("secondExit"); // Get the first element with the class "exit"
  exit2.addEventListener("click", function () {
    window.location.href = "/../../home/homepage.html"; // Redirect to the homepage
  });
}
