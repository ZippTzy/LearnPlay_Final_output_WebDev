const questionNumberEl = document.getElementById("questionNumber");
const questionEl = document.getElementById("questionBox");
const streakCountEl = document.getElementById("streakBar");
const scoreEl = document.getElementById("score");
const livesCountEl = document.getElementById("livesCount");
const choicesEl = document.getElementById("choicesContainer");
const quizArea = document.getElementById("quiz-area");
const button = document.getElementById("play-again");
const exit = document.getElementById("exitButton");

let tries = 3;
let streak = 0;
let score = 0;
let allQuestions = 5;
let consecutiveCorrect = 0;
const maxLives = 3;
let usedQuestions = [];
let questions = [];
let currentQuestionIndex = 0;

function retrieveQuestion() {
  const selected = JSON.parse(localStorage.getItem("userSelected"));
  const currentCategory = selected?.currentCategory;
  const currentSubcategory = selected?.currentSubcategory;

  if (!currentCategory || !currentSubcategory) {
    alert("Missing selection. Redirecting to the main page.");
    window.location.href = "/landingPage.html";
    return;
  }

  questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

  if (!questions || questions.length === 0) {
    alert("No questions found for this category.");
    window.location.href = "/landingPage.html";
    return;
  }

  console.log(questions);
  updateUI();
  generateQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateQuestion() {
  const remainingQuestions = questions.filter(
    (q) => !usedQuestions.includes(q.question)
  );

  if (!remainingQuestions.length) {
    questionEl.textContent = "No more questions available!";
    return;
  }

  const questionData =
    remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
  usedQuestions.push(questionData.question);
  questionEl.textContent = questionData.question;

  const shuffledOptions = shuffleArray([...questionData.options]);

  choicesEl.innerHTML = "";

  shuffledOptions.forEach((answer) => {
    const btn = document.createElement("button");
    btn.classList.add("choice-btn");
    btn.textContent = answer;
    btn.dataset.correct = answer === questionData.correctAnswer;
    btn.onclick = () =>
      handleAnswer(answer === questionData.correctAnswer, btn);
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
    score++;
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
      `.choice-btn[data-correct="true"]`
    );
    if (correctAnswerButton) {
      correctAnswerButton.classList.add("correct-revealed");
    }
  }

  if (tries <= 0) {
    updateUI();
    document.getElementById("quiz-area").classList.add("hidden");
    document.getElementById("game-over").classList.remove("hidden");

    document.getElementById("finalScore").textContent = score;
    document.getElementById("allQuestion").textContent =
      currentQuestionIndex + 1;
    document.getElementById("finalStreak").textContent = streak;
    return;
  }

  updateUI();

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      generateQuestion();
    } else {
      alert("Quiz complete!");
      resetGame();
    }
  }, 1200);
}

function updateUI() {
  streakCountEl.style.width = `${Math.min(streak, 10) * 10}%`;
  scoreEl.textContent = `Score: ${score}`;
  livesCountEl.textContent = `Lives: ${tries}`;
  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}`;
}

function resetGame() {
  localStorage.removeItem("userSelected");
  localStorage.removeItem("quizQuestions");
  currentQuestionIndex = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  retrieveQuestion();
});

button.addEventListener("click", function () {
  tries = 3;
  streak = 0;
  score = 0;
  consecutiveCorrect = 0;
  usedQuestions = [];
  currentQuestionIndex = 0;
  window.location.href = "/landingPage.html";
  resetGame();
});

exit.addEventListener("click", function () {
  resetGame();
  window.location.href = "/landingPage.html";
});
