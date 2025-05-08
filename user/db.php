<?php
$host = 'localhost'; // Change if using remote DB
$db = 'learnplay'; // MySQL DB name
$user = 'root'; // MySQL username
$pass = ''; // MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB Connection failed: " . $e->getMessage());
}
?>
