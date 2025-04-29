
<?php
// This script sets up the database schema and initial data
$host = 'localhost';
$db_name = 'cyber_challenge';
$username = 'root';
$password = '';

try {
    // Connect without database name first to create it if needed
    $db = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database if it doesn't exist
    $db->exec("CREATE DATABASE IF NOT EXISTS `$db_name` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    
    // Now connect to the database
    $db = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Read and execute the SQL schema
    $sql = file_get_contents(__DIR__ . '/config/schema.sql');
    $db->exec($sql);
    
    echo "Database setup completed successfully.";
    
} catch (PDOException $e) {
    die("Database setup error: " . $e->getMessage());
}
?>
