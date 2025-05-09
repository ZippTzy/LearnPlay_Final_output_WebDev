const btnHome = document.getElementById("home");
const btnAbout = document.getElementById("about");

btnHome.addEventListener("click", function () {
  window.location.href = "/index.html";
});

btnAbout.addEventListener("click", function () {
  window.location.href = "../about/about.html";
});
/*
document.addEventListener("DOMContentLoaded", () => {
  fetch("/user/get_user.php")
    .then((res) => res.json())
    .then((userData) => {
      if (userData && userData.username) {
        document.querySelector(
          ".username"
        ).textContent = `@${userData.username}`;
        // add more user data here in future, when database is done
      } else {
        document.querySelector(".username").textContent = "@Guest";
      }
    })
    .catch((error) => {
      console.error("Failed to load user data:", error);
      document.querySelector(".username").textContent = "@Guest";
    });
});
*/

