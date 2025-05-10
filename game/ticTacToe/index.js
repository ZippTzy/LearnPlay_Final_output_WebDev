window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");
  const exit = document.getElementById("exit");
  const click = document.getElementById("click");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE);
  }

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE:
        announcer.innerText = "Tie";
    }
    announcer.classList.remove("hide");
  };

  const isValidAction = (tile) => {
    return tile.innerText !== "X" && tile.innerText !== "O";
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      if (isGameActive) changePlayer();

      if (isGameActive && currentPlayer === "O") {
        setTimeout(aiMove, 500); // AI makes a move after short delay
      }
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");
    click.classList.remove("hide"); // Show the click button again on reset

    if (currentPlayer === "O") {
      changePlayer();
    }

    tiles.forEach((tile) => {
      tile.innerText = "";
      tile.classList.remove("playerX");
      tile.classList.remove("playerO");
    });
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
  });

  resetButton.addEventListener("click", resetBoard);

  // AI Functions
  function aiMove() {
    let move = findBestMove("O");
    if (move === -1) {
      move = findBestMove("X"); // block player
    }
    if (move === -1) {
      const emptyIndices = board
        .map((val, i) => (val === "" ? i : null))
        .filter((i) => i !== null);
      move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    const tile = tiles[move];
    userAction(tile, move);
  }

  function findBestMove(player) {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      const values = [board[a], board[b], board[c]];
      const playerCount = values.filter((v) => v === player).length;
      const emptyCount = values.filter((v) => v === "").length;

      if (playerCount === 2 && emptyCount === 1) {
        const emptyIndex = [a, b, c].find((i) => board[i] === "");
        return emptyIndex;
      }
    }
    return -1;
  }

  // Exit button logic
  exit.addEventListener("click", function () {
    window.location.href = "../../home/homepage.html";
  });

  // Click button logic (hides when clicked)
  click.addEventListener("click", () => {
    click.classList.add("hidden");
  });
});
