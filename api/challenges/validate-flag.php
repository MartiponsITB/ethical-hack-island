
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
    error_log("User ID: " . $user['user_id'] . ", Username: " . $user['username']);
    error_log("Received flag: " . $flag);
    
    // Check if the flag is valid with exact matching
    $stmt = $db->prepare("SELECT id FROM challenges WHERE flag = ? COLLATE utf8mb4_bin");
    $stmt->execute([$flag]);
    $challenge = $stmt->fetch();
    
    if ($challenge) {
        // Flag is valid, return the challenge ID
        error_log("Flag is valid. Challenge ID: " . $challenge['id']);
        error_log("Referer: " . ($_SERVER['HTTP_REFERER'] ?? 'unknown'));
        
        // Send a clear JSON response with the challenge ID
        sendJsonResponse([
            'success' => true,
            'data' => [
                'isCorrect' => true,
                'challengeId' => (int)$challenge['id']
            ]
        ]);
    } else {
        // Try to find the closest flag to help with debugging
        $stmt = $db->query("SELECT id, flag FROM challenges ORDER BY id");
        $allFlags = $stmt->fetchAll();
        
        $closeMatches = [];
        foreach ($allFlags as $challengeFlag) {
            if (strcasecmp($flag, $challengeFlag['flag']) === 0) {
                $closeMatches[] = "Challenge ID " . $challengeFlag['id'] . ": Case mismatch";
            } elseif (str_replace([" ", "\t", "\n", "\r"], "", $flag) === str_replace([" ", "\t", "\n", "\r"], "", $challengeFlag['flag'])) {
                $closeMatches[] = "Challenge ID " . $challengeFlag['id'] . ": Whitespace issue";
            }
        }
        
        if (!empty($closeMatches)) {
            error_log("Flag is close but not exact: " . implode(", ", $closeMatches));
        } else {
            error_log("Flag is invalid: " . $flag);
        }
        
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
    sendJsonResponse(['success' => false, 'error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
