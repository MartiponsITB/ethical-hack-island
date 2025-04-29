
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
if (!isset($data['challengeId']) || !is_numeric($data['challengeId'])) {
    sendJsonResponse(['success' => false, 'error' => 'Valid challenge ID is required'], 400);
}

$challengeId = (int)$data['challengeId'];
$userId = $user['user_id'];
$currentTime = time() * 1000; // Current time in milliseconds

try {
    // Start transaction
    $db->beginTransaction();
    
    // Check if challenge exists
    $stmt = $db->prepare("SELECT id FROM challenges WHERE id = ?");
    $stmt->execute([$challengeId]);
    if (!$stmt->fetch()) {
        $db->rollBack();
        sendJsonResponse(['success' => false, 'error' => 'Challenge not found'], 404);
    }
    
    // Check if the challenge is already completed
    $stmt = $db->prepare("SELECT id FROM user_progress WHERE user_id = ? AND challenge_id = ?");
    $stmt->execute([$userId, $challengeId]);
    
    if (!$stmt->fetch()) {
        // Mark challenge as completed
        $stmt = $db->prepare("INSERT INTO user_progress (user_id, challenge_id) VALUES (?, ?)");
        $stmt->execute([$userId, $challengeId]);
        
        // Check if this is the hackathon challenge (ID 8)
        if ($challengeId === 8) {
            // Record end time for hackathon
            $stmt = $db->prepare("UPDATE hackathon_progress SET end_time = ? WHERE user_id = ? AND end_time IS NULL");
            $stmt->execute([$currentTime, $userId]);
        }
        
        // Check if all main challenges are completed (IDs 1-5)
        $stmt = $db->prepare("
            SELECT COUNT(*) as completed_count 
            FROM user_progress 
            WHERE user_id = ? AND challenge_id IN (1, 2, 3, 4, 5)
        ");
        $stmt->execute([$userId]);
        $result = $stmt->fetch();
        
        if ($result && $result['completed_count'] >= 5) {
            // All main challenges completed, check if hackathon is already unlocked
            $stmt = $db->prepare("SELECT id FROM hackathon_progress WHERE user_id = ?");
            $stmt->execute([$userId]);
            
            if (!$stmt->fetch()) {
                // Record start time for hackathon
                $stmt = $db->prepare("INSERT INTO hackathon_progress (user_id, start_time) VALUES (?, ?)");
                $stmt->execute([$userId, $currentTime]);
            }
        }
    }
    
    // Commit transaction
    $db->commit();
    
    sendJsonResponse(['success' => true]);
    
} catch (PDOException $e) {
    // Roll back transaction on error
    $db->rollBack();
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
