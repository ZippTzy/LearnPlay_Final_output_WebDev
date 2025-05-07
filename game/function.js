const quizData = window.quizData;

let currentCategory = "";
let currentSubcategory = "";
let currentQuestionIndex = 0;
let tries = 3;
let streak = 0;
let consecutiveCorrect = 0;

const maxLives = 3;
const questionNumberEl = document.getElementById("questionNumber");
const questionEl = document.getElementById("questionBox");
const choicesEl = document.getElementById("choicesContainer");
const streakCountEl = document.getElementById("streakBar");
const scoreEl = document.getElementById("score");
const startButton = document.getElementById("startButton");
const subcategoryList = document.getElementById("subcategory-list");
const quizArea = document.getElementById("quiz-area");
const categoryCards = document.querySelectorAll(".category-card");
const livesCountEl = document.getElementById("livesCount");

categoryCards.forEach((button) => {
  button.addEventListener("click", () => {
    categoryCards.forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    currentCategory = button.getAttribute("data-category");
    loadSubcategories();
    subcategoryList.classList.remove("hidden");
    startButton.classList.remove("hidden");
  });
});

function loadSubcategories() {
  const subcategories = {
    Math: [
      { name: "Addition", image: "../../assets/add.png" },
      { name: "Subtraction", image: "../../assets/add.png" },
      { name: "Multiplication", image: "../../assets/add.png" },
      { name: "Division", image: "../../assets/add.png" },
    ],
    Science: [
      { name: "Astronomy", image: "../../assets/astronomy.png" },
      { name: "Experiments", image: "../../assets/experiements.png" },
      { name: "Biology", image: "../../assets/biology.png" },
      { name: "Geography", image: "../../assets/geography.png" },
    ],
    Vocabulary: [
      { name: "Reading", image: "../../assets/reading.png" },
      { name: "Writing", image: "../../assets/writing.png" },
      { name: "Letters", image: "../../assets/letters.png" },
      { name: "Numbers", image: "../../assets/numbers.png" },
    ],
  };

  currentSubcategory = "";
  subcategoryList.innerHTML = "";

  subcategories[currentCategory].forEach((sub) => {
    const card = document.createElement("div");
    card.className = "category-card subcategory-btn";
    card.style.backgroundImage = `url('${sub.image}')`;
    card.style.backgroundColor = "#ddd";
    card.dataset.subcategory = sub.name;

    const label = document.createElement("div");
    label.className = "category-label";
    label.textContent = sub.name;
    card.appendChild(label);

    card.onclick = () => {
      document
        .querySelectorAll(".subcategory-btn")
        .forEach((b) => b.classList.remove("selected"));
      card.classList.add("selected");
      currentSubcategory = sub.name;
      startButton.classList.remove("hidden");
    };

    subcategoryList.appendChild(card);
  });
}

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  if (currentCategory && currentSubcategory && window.quizData) {
    document.getElementById("category-selection").classList.add("hidden");
    quizArea.classList.remove("hidden");

    currentQuestionIndex = 0;
    tries = maxLives;
    streak = 0;
    consecutiveCorrect = 0;

    updateUI();
    generateQuestion();
  } else if (!window.quizData) {
    alert("Quiz data is still loading. Please wait.");
  } else {
    alert("Please select both Category and Sub-category.");
  }
}

function generateQuestion() {
  const questions = quizData[currentCategory][currentSubcategory];

  if (!questions || questions.length === 0) {
    questionEl.textContent = "No questions available.";
    return;
  }

  const questionData = questions[Math.floor(Math.random() * questions.length)];

  questionEl.textContent = questionData.question;

  const shuffledOptions = [...questionData.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [
      shuffledOptions[j],
      shuffledOptions[i],
    ];
  }

  const correctAnswer = questionData.correctAnswer;

  choicesEl.innerHTML = "";
  shuffledOptions.forEach((answer) => {
    const btn = document.createElement("button");
    btn.classList.add("choice-btn");
    btn.textContent = answer;
    btn.dataset.correct = answer === correctAnswer;
    btn.onclick = () => handleAnswer(answer === correctAnswer, btn);
    choicesEl.appendChild(btn);
  });

  updateUI();
}

function handleAnswer(isCorrect, btn) {
  const allButtons = choicesEl.querySelectorAll(".choice-btn");
  allButtons.forEach((b) => (b.disabled = true));

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

    const correctAnswerButton = choicesEl.querySelector(
      `.choice-btn:not(.disabled)[data-correct="true"]`
    );
    setTimeout(() => {
      if (correctAnswerButton) {
        correctAnswerButton.classList.add("correct-revealed");
      }
    }, 1200);

    if (correctAnswerButton) {
      correctAnswerButton.classList.add("correct-revealed");
    }
  }
  
  if (tries <= 0) { 
    alert("Game Over! You ran out of lives.");
    resetGame();
    return;
}

  updateUI();

  setTimeout(() => { 
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentCategory][currentSubcategory].length) {
        generateQuestion();
    }
}, 1200);
}

function updateUI() {
  streakCountEl.style.width = `${Math.min(streak, 10) * 10}%`;
  scoreEl.textContent = `Score: ${streak}`;
  livesCountEl.textContent = `Lives: ${tries}`;
  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}`;
}

function resetGame() {
  currentCategory = "";
  currentSubcategory = "";
  currentQuestionIndex = 0;
  streak = 0;
  tries = maxLives;
  consecutiveCorrect = 0;

  quizArea.classList.add("hidden");
  document.getElementById("category-selection").classList.remove("hidden");

  document
    .querySelectorAll(".category-card")
    .forEach((b) => b.classList.remove("selected"));
  document
    .querySelectorAll(".subcategory-btn")
    .forEach((b) => b.classList.remove("selected"));

  startButton.classList.add("hidden");
  subcategoryList.classList.add("hidden");
  choicesEl.innerHTML = "";
  questionEl.textContent = "Question text goes here";
  questionNumberEl.textContent = "Question 1";

  updateUI();
}
