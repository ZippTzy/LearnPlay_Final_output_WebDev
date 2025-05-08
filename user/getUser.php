<?php
session_start();
if (isset($_SESSION['user'])) {
    echo json_encode(['status' => 'success', 'username' => $_SESSION['user']]);
} else {
    echo json_encode(['status' => 'unauthorized']);
}
?>
