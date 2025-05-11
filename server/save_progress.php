<?php
// save_progress.php

require 'db_connect.php';

// Sample data (this should come from a POST request in production)
$user_id = $_POST['user_id'] ?? null;
$quiz_name = $_POST['quiz_name'] ?? null;
$score = $_POST['score'] ?? null;
$game_type = $_POST['game_type'] ?? null; // 'tic_tac_toe' or 'rock_paper_scissors'

if (!$user_id) {
    echo json_encode(['status' => 'error', 'message' => 'User ID is required.']);
    exit;
}

try {
    if ($quiz_name !== null && $score !== null) {
        // Insert quiz score
        $stmt = $pdo->prepare("INSERT INTO tblScores (user_id, quiz_name, score) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $quiz_name, $score]);
        echo json_encode(['status' => 'success', 'message' => 'Quiz score saved.']);
    } elseif ($game_type === 'tic_tac_toe') {
        // Tic Tac Toe Game result
        $result = $_POST['game_result'] ?? 'draw'; // 'win', 'lose', 'draw'
        $duration = $_POST['duration_seconds'] ?? null;

        $stmt = $pdo->prepare("INSERT INTO tblTicTacToeGame (user_id, game_result, duration_seconds, finished_at) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$user_id, $result, $duration]);
        echo json_encode(['status' => 'success', 'message' => 'Tic Tac Toe result saved.']);
    } elseif ($game_type === 'rock_paper_scissors') {
        // RPS Game result
        $total = $_POST['total_rounds'] ?? 0;
        $wins = $_POST['wins'] ?? 0;
        $losses = $_POST['losses'] ?? 0;
        $draws = $_POST['draws'] ?? 0;
        $score = $_POST['score'] ?? 0;
        $duration = $_POST['duration_seconds'] ?? null;

        $stmt = $pdo->prepare("INSERT INTO tblRockPaperScissorsGame (user_id, total_rounds, wins, losses, draws, score, duration_seconds, finished_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([$user_id, $total, $wins, $losses, $draws, $score, $duration]);
        echo json_encode(['status' => 'success', 'message' => 'Rock Paper Scissors result saved.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data.']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
