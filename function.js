let currentCategory = "";
let currentSubcategory = "";

const choicesEl = document.getElementById("choicesContainer");
const startButton = document.getElementById("startButton");
const subcategoryList = document.getElementById("subcategory-list");
const categoryCards = document.querySelectorAll(".category-card");
const btnAbout = document.getElementById("about");
const btnProfile = document.getElementById("profile");

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const usernameEl = document.querySelector(".username");
  const userPreview = document.querySelector(".user-preview");

  // Fetch user data from the backend (adjust PHP path as needed)
  fetch("../user/get_user.php")
    .then((response) => response.json())
    .then((userData) => {
      if (userData && userData.username) {
        // If logged in, display the username
        usernameEl.textContent = `@${userData.username}`;
        loginBtn.classList.add("hiddn");

        // Enable category selection
        categoryCards.forEach((card) => {
          card.style.pointerEvents = "auto";
          card.style.opacity = "1";
        });
      } else {
        // If not logged in, show the Register button
        usernameEl.textContent = "@UserName";
        loginBtn.classList.remove("hiddn");

        // Disable category selection
        categoryCards.forEach((card) => {
          card.style.pointerEvents = "none";
          card.style.opacity = "0.5";
        });

        // Block interaction with category area
        document.querySelector(".categories").addEventListener("click", () => {
          alert("Please register or log in before selecting a category.");
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });

  // Redirect to login/register page when clicked
  loginBtn.addEventListener("click", () => {
    window.location.href = "../user/login.html";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const categoryCards = document.querySelectorAll(".category-card");
  const userPreview = document.querySelector(".user-preview");
  const categoryH1 = document.getElementById("welcome");
  let selectedCategory = null;

  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (selectedCategory === card) {
        categoryCards.forEach((c) => {
          c.classList.remove("hidden-category", "selected");
        });
        selectedCategory = null;
        document.querySelector(".categories").classList.remove("single-row");
        categoryH1.classList.add("hidden");
        subcategoryList.classList.add("hidden");
        startButton.classList.add("hidden");
        userPreview.classList.remove("hidden");
      } else {
        selectedCategory = card;
        categoryCards.forEach((c) => {
          if (c === card) {
            c.classList.remove("hidden-category");
            c.classList.add("selected");
          } else {
            c.classList.add("hidden-category");
            c.classList.remove("selected");
          }
        });

        document.querySelector(".categories").classList.add("single-row");

        const selectedName = card.getAttribute("data-category");
        categoryH1.textContent = `Welcome to ${selectedName}`;
        categoryH1.classList.remove("hidden");

        userPreview.classList.add("hidden");
      }
    });
  });
});

const subcategories = {
  Math: [
    { name: "Addition", image: "../../assets/add.png" },
    { name: "Subtraction", image: "../../assets/subtract.png" },
    { name: "Multiplication", image: "../../assets/multiply.png" },
    { name: "Division", image: "../../assets/divide.png" },
  ],
  Science: [
    { name: "Astronomy", image: "../assets/astronomy.png" },
    { name: "Experiments", image: "../assets/experiements.png" },
    { name: "Biology", image: "../assets/biology.png" },
    { name: "Geography", image: "../assets/geography.png" },
  ],
  Vocabulary: [
    { name: "Reading", image: "../assets/reading.png" },
    { name: "Writing", image: "../assets/writing.png" },
    { name: "Letters", image: "../assets/letters.png" },
    { name: "Numbers", image: "../assets/numbers.png" },
  ],
  Filipino: [
    { name: "History", image: "../assets/history.png" },
    { name: "Heroes", image: "../assets/heroes.png" },
    { name: "Presidents", image: "../assets/president.png" },
    { name: "Grammar", image: "../assets/grammar.png" },
  ],
};

categoryCards.forEach((button) => {
  button.addEventListener("click", () => {
    categoryCards.forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    currentCategory = button.getAttribute("data-category");
    console.log(`Current Category: ${currentCategory}`);
    loadSubcategories();
    subcategoryList.classList.remove("hidden");
    startButton.classList.remove("hidden");
  });
});

function loadSubcategories() {
  currentSubcategory = "";
  subcategoryList.innerHTML = "";

  if (!subcategories[currentCategory]) {
    console.error(`No subcategories found for category: "${currentCategory}"`);
    return;
  }

  subcategories[currentCategory].forEach((sub) => {
    const card = document.createElement("div");
    card.className = "category-card subcategory-btn";
    card.style.backgroundImage = `url('${sub.image}')`;
    card.style.backgroundColor = "#ddd";
    card.dataset.subcategory = sub.name;

    const label = document.createElement("div");
    label.className = "category-list";
    label.textContent = sub.name;

    const wrapper = document.createElement("div");
    wrapper.className = "subcategory-wrapper";
    wrapper.appendChild(card);
    wrapper.appendChild(label);

    card.onclick = () => {
      document
        .querySelectorAll(".subcategory-btn")
        .forEach((b) => b.classList.remove("selected"));
      card.classList.add("selected");
      currentSubcategory = sub.name;
      console.log(
        `Selected Category: ${currentCategory}, Subcategory: ${currentSubcategory}`
      );

      window.userSelected = {
        currentCategory,
        currentSubcategory,
      };

      if (
        quizData &&
        quizData[currentCategory] &&
        quizData[currentCategory][currentSubcategory]
      ) {
        const questions = shuffleArray(
          quizData[currentCategory][currentSubcategory]
        ).slice(0, 10);
        console.log(questions);

        localStorage.setItem("quizQuestions", JSON.stringify(questions));
      } else {
        alert("No questions found for this category.");
      }

      startButton.classList.remove("hidden");
    };

    subcategoryList.appendChild(wrapper);
  });
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  if (currentCategory && currentSubcategory) {
    localStorage.setItem(
      "userSelected",
      JSON.stringify({
        currentCategory,
        currentSubcategory,
      })
    );
    window.location.href = "../game/game.html";
  } else {
    alert("Please select both Category and Sub-category.");
  }
}

startButton.addEventListener("click", startQuiz);

btnAbout.addEventListener("click", function () {
  window.location.href = "../about/about.html";
});

btnProfile.addEventListener("click", function () {
  window.location.href = "../profile/profile.html";
});

