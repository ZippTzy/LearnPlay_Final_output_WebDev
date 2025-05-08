const btnAchievements = document.getElementById("achievements");
const btnHome = document.getElementById("home");
const btnProfile = document.getElementById("profile");

btnAchievements.addEventListener("click", function () {
  window.location.href = "../game/game.html";
});

btnHome.addEventListener("click", function () {
    window.location.href = "/landingPage.html";
});

btnProfile.addEventListener("click", function () {
  window.location.href = "../profile/profile.html";
});
