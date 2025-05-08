const btnHome = document.getElementById("home");
const btnProfile = document.getElementById("profile");


btnHome.addEventListener("click", function () {
    window.location.href = "/index.html";
});

btnProfile.addEventListener("click", function () {
  window.location.href = "../profile/profile.html";
});
