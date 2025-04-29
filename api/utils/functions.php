
<?php
// Enable CORS for development
function enableCors() {
    // Set CORS headers
    header("Access-Control-Allow-Origin: http://localhost:5173"); // Update with your dev server
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        exit;
    }
}

// Parse JSON request body
function getRequestBody() {
    $json = file_get_contents('php://input');
    return json_decode($json, true);
}

// Send JSON response
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Start session safely
function startSecureSession() {
    if (session_status() == PHP_SESSION_NONE) {
        ini_set('session.use_only_cookies', 1);
        ini_set('session.use_strict_mode', 1);
        
        session_set_cookie_params([
            'lifetime' => 3600, // 1 hour
            'path' => '/',
            'domain' => '',
            'secure' => true,  // Only send over HTTPS
            'httponly' => true // Not accessible via JavaScript
        ]);
        
        session_start();
    }
}

// Verify user is authenticated
function requireAuth() {
    startSecureSession();
    
    if (!isset($_SESSION['user_id']) || empty($_SESSION['username'])) {
        sendJsonResponse(['success' => false, 'error' => 'Unauthorized'], 401);
    }
    
    return [
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'is_admin' => isset($_SESSION['is_admin']) ? $_SESSION['is_admin'] : false
    ];
}

// Format hackathon time for display (HH:MM:SS)
function formatHackathonTime($milliseconds) {
    $seconds = floor(($milliseconds / 1000) % 60);
    $minutes = floor(($milliseconds / (1000 * 60)) % 60);
    $hours = floor(($milliseconds / (1000 * 60 * 60)) % 24);
    
    return sprintf("%02d:%02d:%02d", $hours, $minutes, $seconds);
}
?>
