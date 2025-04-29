
<?php
require_once '../config/database.php';
require_once '../utils/functions.php';

enableCors();

// Get authenticated user or exit
$user = requireAuth();
$userId = $user['user_id'];

try {
    // Get completed challenges
    $stmt = $db->prepare("
        SELECT c.id, UNIX_TIMESTAMP(up.completed_at) * 1000 as completion_time
        FROM user_progress up
        JOIN challenges c ON up.challenge_id = c.id
        WHERE up.user_id = ?
    ");
    $stmt->execute([$userId]);
    $completedChallenges = $stmt->fetchAll();
    
    // Get hackathon progress
    $stmt = $db->prepare("SELECT start_time, end_time FROM hackathon_progress WHERE user_id = ?");
    $stmt->execute([$userId]);
    $hackathonProgress = $stmt->fetch();
    
    // Format response
    $completedIds = array_map(function($challenge) {
        return (int)$challenge['id'];
    }, $completedChallenges);
    
    $completionTimes = array_reduce($completedChallenges, function($carry, $challenge) {
        $carry[$challenge['id']] = (int)$challenge['completion_time'];
        return $carry;
    }, []);
    
    $response = [
        'completedChallenges' => $completedIds,
        'hackathonUnlocked' => !empty($hackathonProgress),
        'completionTimes' => $completionTimes
    ];
    
    if (!empty($hackathonProgress)) {
        $response['hackathonStartTime'] = $hackathonProgress['start_time'] 
            ? (int)$hackathonProgress['start_time'] 
            : null;
        
        $response['hackathonEndTime'] = $hackathonProgress['end_time'] 
            ? (int)$hackathonProgress['end_time'] 
            : null;
    }
    
    sendJsonResponse(['success' => true, 'data' => $response]);
    
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
