const btnAchievements = document.getElementById("achievements");
const btnHome = document.getElementById("home");
const btnAbout = document.getElementById("about");

btnAchievements.addEventListener("click", function () {
  window.location.href = "../game/game.html";
});

btnHome.addEventListener("click", function () {
  window.location.href = "/landingPage.html";
});

btnAbout.addEventListener("click", function () {
  window.location.href = "../about/about.html";
});
