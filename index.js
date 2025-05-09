const goLoginButton = document.getElementById("login");
const goRegisterButton = document.getElementById("register");

goLoginButton.addEventListener("click", () => {
  window.location.href = "../user/login.html"; 
});

goRegisterButton.addEventListener("click", () => {
  window.location.href = "../user/register.html"; 
});
