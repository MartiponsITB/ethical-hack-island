
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

// Check if user is admin
if (!$user['is_admin']) {
    sendJsonResponse(['success' => false, 'error' => 'Unauthorized. Admin privileges required'], 403);
}

try {
    // Start transaction
    $db->beginTransaction();
    
    // Delete all user progress
    $stmt = $db->prepare("DELETE FROM user_progress");
    $stmt->execute();
    
    // Delete all hackathon progress
    $stmt = $db->prepare("DELETE FROM hackathon_progress");
    $stmt->execute();
    
    // Commit transaction
    $db->commit();
    
    sendJsonResponse(['success' => true]);
    
} catch (PDOException $e) {
    // Roll back transaction on error
    $db->rollBack();
    sendJsonResponse(['success' => false, 'error' => 'Server error: ' . $e->getMessage()], 500);
}
?>
