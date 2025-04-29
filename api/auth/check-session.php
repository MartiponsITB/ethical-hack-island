
<?php
require_once '../config/database.php';
require_once '../utils/functions.php';

enableCors();
startSecureSession();

// Check if user is logged in
if (!isset($_SESSION['user_id']) || empty($_SESSION['username'])) {
    sendJsonResponse(['success' => false, 'error' => 'Not authenticated'], 401);
}

// Get user info from database
try {
    $stmt = $db->prepare("SELECT is_admin FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();
    
    if (!$user) {
        // Session exists but user doesn't - clear session
        $_SESSION = array();
        session_destroy();
        sendJsonResponse(['success' => false, 'error' => 'User not found'], 401);
    }
    
    // Return user info
    sendJsonResponse([
        'success' => true,
        'data' => [
            'username' => $_SESSION['username'],
            'isAdmin' => (bool)$user['is_admin']
        ]
    ]);
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
