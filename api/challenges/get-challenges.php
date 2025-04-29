
<?php
require_once '../config/database.php';
require_once '../utils/functions.php';

enableCors();

// Get authenticated user or exit
$user = requireAuth();
$userId = $user['user_id'];

try {
    // Get all challenges
    $stmt = $db->prepare("SELECT id, title FROM challenges ORDER BY id");
    $stmt->execute();
    $challenges = $stmt->fetchAll();
    
    // Get completed challenges
    $stmt = $db->prepare("
        SELECT challenge_id 
        FROM user_progress 
        WHERE user_id = ?
    ");
    $stmt->execute([$userId]);
    $completedChallenges = array_column($stmt->fetchAll(), 'challenge_id');
    
    // Format response
    $response = array_map(function($challenge) use ($completedChallenges) {
        $challengeId = (int)$challenge['id'];
        return [
            'id' => $challengeId,
            'title' => $challenge['title'],
            'completed' => in_array($challengeId, $completedChallenges),
            'flag' => '' // We don't send the actual flag to the client
        ];
    }, $challenges);
    
    sendJsonResponse(['success' => true, 'data' => $response]);
    
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
