
<?php
// Database connection configuration
$host = 'localhost';     // MariaDB host
$db_name = 'cyber_challenge'; // Database name
$username = 'root';      // MariaDB username
$password = '';          // MariaDB password - Set this to your actual password in production

try {
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];
    
    $db = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username, $password, $options);
    
    // Enable error logging for debugging
    error_log("Database connection successful");
} catch(PDOException $e) {
    // Log error to server log for debugging
    error_log("Database connection failed: " . $e->getMessage());
    
    // Return proper JSON error response
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>
