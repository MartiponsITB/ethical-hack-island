
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

// Validate username (alphanumeric, 3-20 chars)
if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
    sendJsonResponse(['success' => false, 'error' => 'Username must be 3-20 characters and contain only letters, numbers, and underscores'], 400);
}

// Validate password (min 6 chars)
if (strlen($password) < 6) {
    sendJsonResponse(['success' => false, 'error' => 'Password must be at least 6 characters'], 400);
}

try {
    // Check if username already exists
    $stmt = $db->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    
    if ($stmt->fetch()) {
        sendJsonResponse(['success' => false, 'error' => 'Username already taken'], 409);
    }
    
    // Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $db->prepare("INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, ?)");
    $isAdmin = ($username === 'admin'); // Only 'admin' username gets admin privileges
    $stmt->execute([$username, $password_hash, $isAdmin ? 1 : 0]);
    
    $user_id = $db->lastInsertId();
    
    // Set session variables
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $username;
    $_SESSION['is_admin'] = $isAdmin;
    
    // Return success with user info
    sendJsonResponse([
        'success' => true, 
        'data' => [
            'username' => $username,
            'isAdmin' => $isAdmin
        ]
    ]);
    
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'error' => 'Server error'], 500);
}
?>
