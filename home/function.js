let currentCategory = "";
let currentSubcategory = "";
let isOnlineMode = true;

const startButton = document.getElementById("startButton");
const subcategoryList = document.getElementById("subcategory-list");
const categoryCards = document.querySelectorAll(".category-card");
const categoryContainer = document.querySelector(".categories");
const btnAbout = document.getElementById("about");
const btnProfile = document.getElementById("profile");

const gameSubcategories = [
  {
    name: "Rock Paper Scissors",
    image: "/assets/biology.png",
    link: "/game/rockpaper/index.html",
  },
  {
    name: "Tic Tac Toe",
    image: "/assets/add.png",
    link: "/game/ticTacToe/index.html",
  },
];

const subcategories = {
  Math: [
    { name: "Addition", image: "/assets/add.png" },
    { name: "Subtraction", image: "/assets/subtract.png" },
    { name: "Multiplication", image: "/assets/multiply.png" },
    { name: "Division", image: "/assets/divide.png" },
  ],
  Science: [
    { name: "Astronomy", image: "/assets/astronomy.png" },
    { name: "Experiments", image: "/assets/experiements.png" },
    { name: "Biology", image: "/assets/biology.png" },
    { name: "Geography", image: "/assets/geography.png" },
  ],
  Vocabulary: [
    { name: "Reading", image: "/assets/reading.png" },
    { name: "Writing", image: "/assets/writing.png" },
    { name: "Letters", image: "/assets/letters.png" },
    { name: "Numbers", image: "/assets/numbers.png" },
  ],
  Filipino: [
    { name: "History", image: "/assets/history.png" },
    { name: "Heroes", image: "/assets/heroes.png" },
    { name: "Presidents", image: "/assets/president.png" },
    { name: "Grammar", image: "/assets/grammar.png" },
  ],
  Minigames: gameSubcategories,
};

document.addEventListener("DOMContentLoaded", () => {
  const logOut = document.getElementById("logOut-btn");
  const modeImg = document.getElementById("modeImg");
  const modeSelector = document.getElementById("mode-selector");
  const modeDiv = document.getElementById("modeDiv");

  modeDiv.addEventListener("click", () => {
    isOnlineMode = !isOnlineMode;
    modeSelector.textContent = isOnlineMode ? "Online Games" : "Online Course";
    modeImg.src = isOnlineMode
      ? "https://img.icons8.com/color/96/controller.png"
      : "https://img.icons8.com/color/96/classroom.png";

    toggleMinigamesCategory(isOnlineMode);
    resetSelection();
  });

  logOut.addEventListener("click", () => {
    window.location.href = "/user/landingPage.html";
  });

  categoryContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".category-card");

    if (!card || card.classList.contains("subcategory-btn")) return;

    const selectedName = card.getAttribute("data-category");

    if (card.classList.contains("selected")) {
      resetSelection();
    } else {
      document.querySelectorAll(".category-card").forEach((c) => {
        c.classList.toggle("hidden-category", c !== card);
        c.classList.remove("selected");
      });
      card.classList.add("selected");
      currentCategory = selectedName;
      loadSubcategories();
    }
  });

  toggleMinigamesCategory(isOnlineMode);
});

function toggleMinigamesCategory(isGameMode) {
  const existing = document.querySelector('[data-category="Minigames"]');
  if (isGameMode) {
    if (!existing) {
      const card = document.createElement("div");
      card.className = "category-card";
      card.setAttribute("data-category", "Minigames");

      const label = document.createElement("div");
      label.className = "category-label";
      label.textContent = "MINIGAMES";

      card.appendChild(label);
      categoryContainer.appendChild(card);
    }
  } else {
    if (existing) {
      existing.remove();
    }
  }
}

function resetSelection() {
  currentSubcategory = "";
  subcategoryList.classList.add("hidden");
  subcategoryList.innerHTML = "";
  startButton.classList.add("hidden");
  document.querySelectorAll(".category-card").forEach((c) =>
    c.classList.remove("selected", "hidden-category")
  );
}

function loadSubcategories() {
  currentSubcategory = "";
  subcategoryList.innerHTML = "";
  startButton.classList.add("hidden");

  if (!subcategories[currentCategory]) return;

  subcategories[currentCategory].forEach((sub) => {
    const card = document.createElement("div");
    card.className = "category-card subcategory-btn";
    card.style.backgroundImage = `url('${sub.image}')`;
    card.dataset.subcategory = sub.name;

    const label = document.createElement("div");
    label.className = "category-list";
    label.textContent = sub.name;

    const wrapper = document.createElement("div");
    wrapper.className = "subcategory-wrapper";
    wrapper.appendChild(card);
    wrapper.appendChild(label);

    card.onclick = () => {
      document.querySelectorAll(".subcategory-btn").forEach((b) =>
        b.classList.remove("selected")
      );
      card.classList.add("selected");
      currentSubcategory = sub.name;

      window.userSelected = { currentCategory, currentSubcategory };

      if (currentCategory === "Minigames") {
        const foundGame = gameSubcategories.find(
          (g) => g.name === currentSubcategory
        );
        if (foundGame) {
          startButton.classList.remove("hidden");
          startButton.onclick = () => {
            window.location.href = foundGame.link;
          };
        }
        return;
      }

      if (
        quizData &&
        quizData[currentCategory] &&
        quizData[currentCategory][currentSubcategory]
      ) {
        const questions = shuffleArray(
          quizData[currentCategory][currentSubcategory]
        ).slice(0, 10);
        localStorage.setItem("quizQuestions", JSON.stringify(questions));
      } else {
        alert("No questions found for this category.");
        return;
      }

      startButton.classList.remove("hidden");
      startButton.onclick = startQuiz;
    };

    subcategoryList.appendChild(wrapper);
  });

  subcategoryList.classList.remove("hidden");
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  if (currentCategory && currentSubcategory) {
    localStorage.setItem(
      "userSelected",
      JSON.stringify({ currentCategory, currentSubcategory })
    );
    window.location.href = "/game/game.html";
  } else {
    alert("Please select both Category and Sub-category.");
  }
}

btnAbout.addEventListener("click", () => {
  window.location.href = "/about/about.html";
});

btnProfile.addEventListener("click", () => {
  window.location.href = "/profile/profile.html";
});
