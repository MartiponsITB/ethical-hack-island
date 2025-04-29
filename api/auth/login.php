
<?php
require_once '../config/database.php';
require_once '../utils/functions.php';

enableCors();
startSecureSession();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

// Get request body
$data = getRequestBody();

// Validate request data
if (!isset($data['username']) || !isset($data['password']) || empty($data['username']) || empty($data['password'])) {
    sendJsonResponse(['success' => false, 'error' => 'Username and password are required'], 400);
}

$username = $data['username'];
$password = $data['password'];

try {
    // Check if user exists
    $stmt = $db->prepare("SELECT id, password_hash, is_admin FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    
    if (!$user) {
        sendJsonResponse(['success' => false, 'error' => 'Invalid username or password'], 401);
    }
    
    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        sendJsonResponse(['success' => false, 'error' => 'Invalid username or password'], 401);
    }
    
    // Set session variables
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $username;
    $_SESSION['is_admin'] = (bool)$user['is_admin'];
    
    // Return success with user info
    sendJsonResponse([
        'success' => true, 
        'data' => [
            'username' => $username,
            'isAdmin' => (bool)$user['is_admin']
        ]
    ]);
    
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
