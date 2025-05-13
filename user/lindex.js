document.addEventListener("DOMContentLoaded", () => {
  const goLoginButton = document.getElementById("goLogin");
  const goRegisterButton = document.getElementById("goRegister");
  const showRegisterLink = document.getElementById("showRegisterLink");
  const showLoginLink = document.getElementById("showLoginLink");
  const forgotBtn = document.getElementById("forgot");
  const registerBtn = document.getElementById("registerButton");
  const loginBtn = document.getElementById("loginButton");

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

  // Register
  registerBtn?.addEventListener("click", async () => {
    const username = document.getElementById("register-username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;

    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await fetch("index.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "register",
          username,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        alert("Registration successful!");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      alert("Error connecting to server.");
      console.error(err);
    }
  });

  // Login
  let loginAttempts = 0;
  const maxLoginAttempts = 3;

  loginBtn?.addEventListener("click", async () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
      alert("Username and password are required.");
      return;
    }

    try {
      const res = await fetch("index.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "login",
          username,
          password,
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        alert("Login successful!");
        loginAttempts = 0;
        window.location.href = "home.html"; // redirect to your dashboard/home
      } else {
        loginAttempts++;
        alert(data.message || "Login failed.");

        if (loginAttempts >= maxLoginAttempts) {
          loginBtn.disabled = true;
          alert("Maximum login attempts reached. Try again later.");
        }
      }
    } catch (err) {
      alert("Error connecting to server.");
      console.error(err);
    }
  });

  // Forgot Password (example use, adjust depending on UI)
  forgotBtn?.addEventListener("click", async () => {
    const username = prompt("Enter your username to recover password:");
    if (!username) return;

    try {
      const res = await fetch("index.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "forgot",
          username,
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        alert("Password hash (for testing purposes): " + data.password);
      } else {
        alert(data.message || "User not found.");
      }
    } catch (err) {
      alert("Server error.");
      console.error(err);
    }
  });
});
