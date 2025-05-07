
<?php
// Enable CORS for development
function enableCors() {
    // Get the requesting origin
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    // List of allowed origins - add your domains here
    $allowed_origins = [
        'http://localhost', 
        'http://localhost:5173',
        'http://127.0.0.1',
        'http://127.0.0.1:5173',
        'http://localhost:80',
        'http://127.0.0.1:80'
    ];
    
    // Check if the origin is allowed or if we should use wildcard
    if (in_array($origin, $allowed_origins) || empty($origin)) {
        // Set CORS headers
        header("Access-Control-Allow-Origin: " . (!empty($origin) ? $origin : '*'));
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Credentials: true");
        header("Content-Type: application/json; charset=UTF-8");
    }

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        exit;
    }
}

// Parse JSON request body
function getRequestBody() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // If json_decode returns null, log the raw input for debugging
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        error_log("JSON decode error: " . json_last_error_msg());
        error_log("Raw input: " . $json);
    }
    
    return $data ?: [];
}

// Send JSON response
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Start session safely
function startSecureSession() {
    if (session_status() == PHP_SESSION_NONE) {
        ini_set('session.use_only_cookies', 1);
        ini_set('session.use_strict_mode', 1);
        
        // Check if we're on localhost
        $isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || 
                      strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost') !== false;
        
        session_set_cookie_params([
            'lifetime' => 3600, // 1 hour
            'path' => '/',
            'domain' => '',
            'secure' => !$isLocalhost,  // Only require HTTPS if not on localhost
            'httponly' => true // Not accessible via JavaScript
        ]);
        
        session_start();
    }
}

// Verify user is authenticated
function requireAuth() {
    startSecureSession();
    
    if (!isset($_SESSION['user_id']) || empty($_SESSION['username'])) {
        error_log("Authentication failed: No valid session found");
        sendJsonResponse(['success' => false, 'error' => 'Unauthorized'], 401);
    }
    
    error_log("User authenticated: " . $_SESSION['username']);
    
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
