<?php
session_start();
include 'db_connect.php';
include 'index.php';

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LearnPlay</title>
    <link rel="stylesheet" href="styles.css" />
    <link
      rel="icon"
      href="../assets/mascot.png"
      sizes="32x32"
      type="image/png"
    />
  </head>
  <body>
    <div class="wrapper" id="registerWrapper">
      <form class="login-card" action="index.php">
        <img src="../assets/mascot.png" alt="Mascot" class="mascot" />
        <h1>Welcome to LearnPlay</h1>
        <input
          type="text"
          id="register-username"
          placeholder="Username"
          class="input"
          required
        />
        <input
          type="email"
          id="register-email"
          placeholder="Gmail"
          class="input"
          required
        />
        <input
          type="password"
          id="register-password"
          placeholder="Password"
          class="input"
          required
        />

        <button class="sign-btn" id="signUp-btn">Sign Up</button>
        <a href="#" class="forgot">Forgot Password?</a>
        <div class="social-login">
          <img src="../assets/image7.png" alt="Google" />
          <img src="../assets/image8.png" alt="Facebook" class="fb" />
        </div>
        <p class="create-account">
          Already have an account? <a href="#" id="showLoginLink">Sign In</a>
        </p>
      </form>
    </div>

    <script src="lindex.js"></script>
    <script src="/assets/disableForward.js"></script>
  </body>
</html>
