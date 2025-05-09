document.addEventListener("DOMContentLoaded", () => {
  const goLoginButton = document.getElementById("goLogin");
  const goRegisterButton = document.getElementById("goRegister");
  const showRegisterLink = document.getElementById("showRegisterLink");
  const showLoginLink = document.getElementById("showLoginLink");
  const signUp = document.getElementById("signUp-btn");
  const signIn = document.getElementById("signIn-btn");
  const forgortBtn = document.getElementById("forgot");


  if (goLoginButton) {
    goLoginButton.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  if (forgortBtn) {
    forgortBtn.addEventListener("click", () => {
      window.location.href = "forgotPass.html";
    });
  }

  if (goRegisterButton) {
    goRegisterButton.addEventListener("click", () => {
      window.location.href = "register.html";
    });
  }

  if (signUp) {
    signUp.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/home/homepage.html";
    });
  }

  if (signIn) {
    signIn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/home/homepage.html";
    });
  }

  if (showRegisterLink) {
    showRegisterLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "register.html";
    });
  }

  if (showLoginLink) {
    showLoginLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }
});
