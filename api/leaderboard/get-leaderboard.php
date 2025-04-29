
<?php
require_once '../config/database.php';
require_once '../utils/functions.php';

enableCors();

try {
    // Get users who have completed hackathon
    $stmt = $db->query("
        SELECT 
            u.username,
            hp.start_time,
            hp.end_time,
            (hp.end_time - hp.start_time) as total_time
        FROM 
            hackathon_progress hp
        JOIN 
            users u ON hp.user_id = u.id
        WHERE 
            hp.end_time IS NOT NULL
        ORDER BY 
            total_time ASC
    ");
    
    $users = $stmt->fetchAll();
    
    // Format response
    $response = [];
    foreach ($users as $index => $user) {
        $response[] = [
            'rank' => $index + 1,
            'username' => $user['username'],
            'hackathonTime' => formatHackathonTime((int)$user['total_time']),
            'totalTimeMs' => (int)$user['total_time']
        ];
    }
    
    sendJsonResponse(['success' => true, 'data' => $response]);
    
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
