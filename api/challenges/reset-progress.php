
<?php
require_once '../config/database.php';
require_once '../utils/functions.php';

enableCors();

// Get authenticated user or exit
$user = requireAuth();
$userId = $user['user_id'];

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

try {
    // Start transaction
    $db->beginTransaction();
    
    // Delete user progress
    $stmt = $db->prepare("DELETE FROM user_progress WHERE user_id = ?");
    $stmt->execute([$userId]);
    
    // Delete hackathon progress
    $stmt = $db->prepare("DELETE FROM hackathon_progress WHERE user_id = ?");
    $stmt->execute([$userId]);
    
    // Commit transaction
    $db->commit();
    
    sendJsonResponse(['success' => true]);
    
} catch (PDOException $e) {
    // Roll back transaction on error
    $db->rollBack();
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
