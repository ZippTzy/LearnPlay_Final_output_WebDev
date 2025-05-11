<?php
// index.php
session_start();
include 'db_connect.php';
header('Content-Type: application/json');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'register') {
        $username = $_POST['username'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        if (!$username || !$email || !$password) {
            echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("SELECT * FROM tblUsers WHERE username = ? OR email = ?");
            $stmt->execute([$username, $email]);
            if ($stmt->fetch()) {
                echo json_encode(['status' => 'error', 'message' => 'Username or email already taken.']);
                exit;
            }

            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO tblUsers (username, email, password_hash) VALUES (?, ?, ?)");
            $stmt->execute([$username, $email, $hash]);

            echo json_encode(['status' => 'success']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Server error: ' . $e->getMessage()]);
        }

    } elseif ($action === 'login') {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        if (!$username || !$password) {
            echo json_encode(['status' => 'error', 'message' => 'Username and password required.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("SELECT * FROM tblUsers WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Incorrect username or password.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Server error: ' . $e->getMessage()]);
        }

    } elseif ($action === 'forgot') {
        $username = $_POST['username'] ?? '';

        if (!$username) {
            echo json_encode(['status' => 'error', 'message' => 'Username required.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("SELECT * FROM tblUsers WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user) {
                echo json_encode(['status' => 'success', 'password' => $user['password_hash']]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Username not found.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Server error: ' . $e->getMessage()]);
        }
    }
    exit;
}
?>
