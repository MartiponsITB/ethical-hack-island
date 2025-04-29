
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

$flag = $data['flag'];

try {
    // Check if the flag is valid
    $stmt = $db->prepare("SELECT id FROM challenges WHERE flag = ?");
    $stmt->execute([$flag]);
    $challenge = $stmt->fetch();
    
    if ($challenge) {
        // Flag is valid, return the challenge ID
        sendJsonResponse([
            'success' => true,
            'data' => [
                'isCorrect' => true,
                'challengeId' => (int)$challenge['id']
            ]
        ]);
    } else {
        // Flag is invalid
        sendJsonResponse([
            'success' => true,
            'data' => [
                'isCorrect' => false,
                'challengeId' => null
            ]
        ]);
    }
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
