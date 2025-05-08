<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username']; // mysql: users.username
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['username'];
        echo json_encode(['status' => 'success', 'username' => $user['username']]);
    } else {
        echo json_encode(['status' => 'fail', 'message' => 'Invalid credentials']);
    }
}
?>
