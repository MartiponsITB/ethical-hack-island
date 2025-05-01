
<?php
require_once '../config/database.php';
require_once '../utils/functions.php';

enableCors();

// Get authenticated user or exit
$user = requireAuth();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

// Get request body
$data = getRequestBody();

// Validate request data
if (!isset($data['flag']) || empty($data['flag'])) {
    sendJsonResponse(['success' => false, 'error' => 'Flag is required'], 400);
}

$flag = trim($data['flag']); // Trim flag to remove any whitespace

try {
    // Debug information
    error_log("Received flag: " . $flag);
    
    // Get all challenge flags for debugging
    $debug_stmt = $db->query("SELECT id, flag FROM challenges");
    $debug_challenges = $debug_stmt->fetchAll();
    foreach ($debug_challenges as $debug_challenge) {
        error_log("Challenge ID: " . $debug_challenge['id'] . ", Flag: " . $debug_challenge['flag']);
    }
    
    // Check if the flag is valid with exact matching
    $stmt = $db->prepare("SELECT id FROM challenges WHERE flag = ?");
    $stmt->execute([$flag]);
    $challenge = $stmt->fetch();
    
    if ($challenge) {
        // Flag is valid, return the challenge ID
        error_log("Flag is valid. Challenge ID: " . $challenge['id']);
        sendJsonResponse([
            'success' => true,
            'data' => [
                'isCorrect' => true,
                'challengeId' => (int)$challenge['id']
            ]
        ]);
    } else {
        // Flag is invalid
        error_log("Flag is invalid: " . $flag);
        sendJsonResponse([
            'success' => true,
            'data' => [
                'isCorrect' => false,
                'challengeId' => null
            ]
        ]);
    }
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
