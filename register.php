<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username']; // mysql: users.username
    $email = $_POST['email'];       // mysql: users.email
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // mysql: users.password

    $check = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $check->execute([$username, $email]);
    if ($check->rowCount() > 0) {
        echo json_encode(['status' => 'fail', 'message' => 'Username or email already exists']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    if ($stmt->execute([$username, $email, $password])) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'fail', 'message' => 'Registration failed']);
    }
}
?>
