
<?php
require_once '../config/database.php';
require_once '../utils/functions.php';

enableCors();

// Get authenticated user or exit
$user = requireAuth();

// Check if user is admin
if (!$user['is_admin']) {
    sendJsonResponse(['success' => false, 'error' => 'Acceso denegado. Solo administradores.'], 403);
}

// Handle user listing
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Fetch all users
        $stmt = $db->query("SELECT id, username, is_admin, created_at FROM users ORDER BY id ASC");
        $users = $stmt->fetchAll();
        
        sendJsonResponse(['success' => true, 'data' => $users]);
    } catch (PDOException $e) {
        error_log("Error listing users: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'error' => 'Error al obtener usuarios'], 500);
    }
}

// Handle user deletion
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getRequestBody();
    
    if (!isset($data['action']) || $data['action'] !== 'delete' || !isset($data['userId'])) {
        sendJsonResponse(['success' => false, 'error' => 'Parámetros incorrectos'], 400);
    }
    
    $userId = (int)$data['userId'];
    
    // Prevent deletion of admin user (usually ID 1)
    if ($userId === 1) {
        sendJsonResponse(['success' => false, 'error' => 'No se puede eliminar el usuario admin principal'], 400);
    }
    
    try {
        // Start transaction
        $db->beginTransaction();
        
        // Delete user progress first (due to foreign key constraints)
        $stmt = $db->prepare("DELETE FROM user_progress WHERE user_id = ?");
        $stmt->execute([$userId]);
        
        // Delete hackathon progress
        $stmt = $db->prepare("DELETE FROM hackathon_progress WHERE user_id = ?");
        $stmt->execute([$userId]);
        
        // Finally delete the user
        $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        
        // Commit transaction
        $db->commit();
        
        sendJsonResponse(['success' => true, 'message' => 'Usuario eliminado correctamente']);
    } catch (PDOException $e) {
        // Roll back transaction on error
        $db->rollBack();
        error_log("Error deleting user: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'error' => 'Error al eliminar usuario'], 500);
    }
}
?>
