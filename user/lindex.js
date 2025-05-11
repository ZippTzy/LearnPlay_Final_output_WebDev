document.addEventListener("DOMContentLoaded", () => {
  const goLoginButton = document.getElementById("goLogin");
  const goRegisterButton = document.getElementById("goRegister");
  const showRegisterLink = document.getElementById("showRegisterLink");
  const showLoginLink = document.getElementById("showLoginLink");
  const signUp = document.getElementById("signUp-btn");
  const signIn = document.getElementById("signIn-btn");
  const forgotBtn = document.getElementById("forgot");
  const askBtn = document.getElementById("ask-btn");

  // Navigation
  goLoginButton?.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  goRegisterButton?.addEventListener("click", () => {
    window.location.href = "register.html";
  });

  forgotBtn?.addEventListener("click", () => {
    window.location.href = "forgotPass.html";
  });

  showRegisterLink?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "register.html";
  });

  showLoginLink?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "login.html";
  });

  // Sign Up
  signUp?.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("register-username")?.value.trim();
    const email = document.getElementById("register-email")?.value.trim();
    const password = document.getElementById("register-password")?.value;

    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("index.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "register",
          username,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        window.location.href = "/home/homepage.html";
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      alert("Error connecting to server.");
      console.error(error);
    }
  });

  // Sign In
  signIn?.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username")?.value.trim();
    const password = document.getElementById("login-password")?.value;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("index.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "login",
          username,
          password,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        window.location.href = "/home/homepage.html";
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      alert("Error connecting to server.");
      console.error(error);
    }
  });

  // Forgot Password
  askBtn?.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("forgot-username")?.value.trim();

    if (!username) {
      alert("Please enter your username.");
      return;
    }

    try {
      const response = await fetch("index.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "forgot",
          username,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const userInput = prompt(`Verification Code: ${code}\n\nEnter the code:`);

        if (userInput === code) {
          alert("Password: " + result.password);
        } else {
          alert("Incorrect code.");
        }
      } else {
        alert(result.message || "Username not found.");
      }
    } catch (error) {
      alert("Server error.");
      console.error(error);
    }
  });
});
