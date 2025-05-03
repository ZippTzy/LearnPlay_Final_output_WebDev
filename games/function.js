// This handles the quiz logic and interacts with mcq.js --helppppp why it wont start--

const quizData = window.quizData;

let currentCategory = "";
let currentSubcategory = "";
let currentQuestionIndex = 0;
let tries = 3;
let streak = 0;
let consecutiveCorrect = 0;
const maxLives = 3;

const questionEl = document.getElementById("questionBox");
const choicesEl = document.getElementById("choicesContainer");
const streakCountEl = document.getElementById("streakBar");
const scoreEl = document.getElementById("score");
const startButton = document.getElementById("startButton");
const subcategoryList = document.getElementById("subcategory-list");
const quizArea = document.getElementById("quiz-area");

const livesCountEl = document.createElement("div");
livesCountEl.textContent = `Lives: ${tries}`;
livesCountEl.classList.add("score");
document.querySelector(".header").appendChild(livesCountEl);



// --- Category Selection ---
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");

    currentCategory = button.getAttribute("data-category");
    loadSubcategories();
    subcategoryList.classList.remove("hidden");
    startButton.classList.add("hidden");
  });
});

// --- Load Subcategories as buttons ---
function loadSubcategories() {
  const subcategories = {
    Math: ["Addition", "Subtraction", "Multiplication", "Division"],
    Science: ["Astronomy", "Experiments", "Biology", "Geography"],
    Vocabulary: ["Reading", "Writing", "Letters", "Numbers"],
  };

  currentSubcategory = "";
  subcategoryList.innerHTML = "";

  subcategories[currentCategory].forEach((sub) => {
    const btn = document.createElement("div");
    btn.classList.add("subcategory-btn");
    btn.textContent = sub;
    btn.onclick = () => {
      document.querySelectorAll(".subcategory-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      currentSubcategory = sub;
      startButton.classList.remove("hidden");
    };
    subcategoryList.appendChild(btn);
  });
}

// --- Start Quiz ---
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  if (currentCategory && currentSubcategory) {
    document.getElementById("category-selection").classList.add("hidden");
    quizArea.classList.remove("hidden");

    currentQuestionIndex = 0;
    tries = 3;
    streak = 0;
    consecutiveCorrect = 0;

    updateUI();
    generateQuestion();
  } else {
    alert("Please select both Category and Sub-category.");
  }
}

// --- Generate Question ---
function generateQuestion() {
  if (!currentCategory || !currentSubcategory) return;

  const questionData = quizData[currentCategory][currentSubcategory][currentQuestionIndex];

  questionEl.textContent = questionData.question;
  const answers = new Set(questionData.options);
  const correctAnswer = questionData.correctAnswer;

  choicesEl.innerHTML = "";
  answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.classList.add("choice-btn");
    btn.textContent = answer;
    btn.onclick = () => handleAnswer(answer === correctAnswer, btn);
    choicesEl.appendChild(btn);
  });
}

// --- Handle Answer Logic ---
function handleAnswer(isCorrect, btn) {
  btn.disabled = true;

  if (isCorrect) {
    btn.classList.add("correct");
    streak++;
    consecutiveCorrect++;

    if (consecutiveCorrect === 2 && tries < maxLives) {
      tries++;
      consecutiveCorrect = 0;
    }
  } else {
    btn.classList.add("incorrect");
    streak = Math.max(0, streak - 1);
    tries--;
    consecutiveCorrect = 0;

    if (tries <= 0) {
      alert("Game Over! You ran out of lives.");
      resetGame();
      return;
    }
  }

  updateUI();

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentCategory][currentSubcategory].length) {
      generateQuestion();
    } else {
      alert("Quiz Completed!");
      resetGame();
    }

    const incorrectChoices = choicesEl.querySelectorAll(".incorrect");
    incorrectChoices.forEach((choice) => {
      choice.classList.add("hidden");
    });
  }, 1500);
}

// --- Update UI ---
function updateUI() {
  streakCountEl.style.width = `${(streak / 10) * 100}%`;
  scoreEl.textContent = `Score: ${streak}`;
  livesCountEl.textContent = `Lives: ${tries}`;
}

// --- Reset Game ---
function resetGame() {
    currentCategory = "";
    currentSubcategory = "";
    currentQuestionIndex = 0;
    streak = 0;
    tries = 3;
    consecutiveCorrect = 0;
  
    quizArea.classList.add("hidden");
    document.getElementById("category-selection").classList.remove("hidden");
    document.getElementById("game-over").classList.add("hidden");
  
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("selected"));
    document.querySelectorAll(".subcategory-btn").forEach(b => b.classList.remove("selected"));
  
    startButton.classList.add("hidden");
    subcategoryList.classList.add("hidden");
    choicesEl.innerHTML = "";
    questionEl.textContent = "Question text goes here";
    questionNumberEl.textContent = "Question 1";
  
    updateUI();
}

const exitButton = document.createElement("button");
exitButton.textContent = "Exit";
exitButton.classList.add("score"); 
exitButton.style.background = "#ef4444";
exitButton.style.color = "white";
exitButton.style.cursor = "pointer";
exitButton.style.marginLeft = "auto";
exitButton.onclick = () => {
  if (confirm("Are you sure you want to exit the quiz?")) {
    resetGame();
  }
};
document.querySelector(".header").appendChild(exitButton);

