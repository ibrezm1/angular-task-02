<?php
require 'db_config.php';
// Allow requests from any origin
header('Access-Control-Allow-Origin: *');
// Allow methods GET, POST, PUT, DELETE, OPTIONS
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
// Allow headers Authorization and Content-Type
header('Access-Control-Allow-Headers: Authorization, Content-Type');
// Set content type to JSON
header('Content-Type: application/json');


// Basic Auth credentials
define('USERNAME', 'u');
define('PASSWORD', 'p');

// Function to check basic auth credentials
function authenticate() {
    if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
        header('WWW-Authenticate: Basic realm="My Realm"');
        header('HTTP/1.0 401 Unauthorized');
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    } else {
        if ($_SERVER['PHP_AUTH_USER'] !== USERNAME || $_SERVER['PHP_AUTH_PW'] !== PASSWORD) {
            header('WWW-Authenticate: Basic realm="My Realm"');
            header('HTTP/1.0 401 Unauthorized');
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }
    }
}

// Function to handle CORS preflight request
function handleOptionsRequest() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    header('HTTP/1.1 200 OK');
    exit;
}

// Check if it's an OPTIONS request (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    handleOptionsRequest();
}

// Authenticate the user
authenticate();

$method = $_SERVER['REQUEST_METHOD'];
$table = $_GET['table'] ?? '';

if (empty($table)) {
    echo json_encode(['error' => 'Table parameter is required']);
    exit;
}

switch ($method) {
    case 'GET':
        // Check if an ID is provided
        $id = $_GET['id'] ?? '';
        if (!empty($id)) {
            handleGetById($pdo, $table, $id);
        } else {
            handleGet($pdo, $table);
        }
        break;
    case 'POST':
        $action = $_GET['action'] ?? '';
        if ($action === 'insert') {
            handleInsert($pdo, $table);
        } elseif ($action === 'update') {
            handleUpdate($pdo, $table);
        } elseif ($action === 'delete') {
            handleDelete($pdo, $table);
        } else {
            echo json_encode(['error' => 'Invalid action']);
        }
        break;
    default:
        echo json_encode(['error' => 'Unsupported request method']);
}

function handleGetById($pdo, $table, $id) {
    $query = "SELECT * FROM $table WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch();

    if ($result) {
        echo json_encode($result);
    } else {
        echo json_encode(['error' => 'Record not found']);
    }
}

function handleGet($pdo, $table) {
    $limit = $_GET['limit'] ?? 10;
    $page = $_GET['page'] ?? 1;
    $search = $_GET['search'] ?? '';
    $offset = ($page - 1) * $limit;

    $query = "SELECT * FROM $table";
    $params = [];
    if ($search) {
        $query .= " WHERE title LIKE :search"; // OR description LIKE :search";
        $params['search'] = "%$search%";
    }
    $query .= " LIMIT :limit OFFSET :offset";
    
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':limit', (int) $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', (int) $offset, PDO::PARAM_INT);
    if ($search) {
        $stmt->bindValue(':search', $params['search'], PDO::PARAM_STR);
    }
    $stmt->execute();
    $results = $stmt->fetchAll();

    // Send CORS headers
    header('Access-Control-Allow-Origin: *');
    echo json_encode($results);
}

function handleInsert($pdo, $table) {
    $data = json_decode(file_get_contents('php://input'), true);
    $columns = array_keys($data);
    $placeholders = array_map(fn($col) => ":$col", $columns);
    
    $query = "INSERT INTO $table (" . implode(', ', $columns) . ") VALUES (" . implode(', ', $placeholders) . ")";
    $stmt = $pdo->prepare($query);
    foreach ($data as $key => $value) {
        $stmt->bindValue(":$key", $value);
    }
    
    if ($stmt->execute()) {
        // Send CORS headers
        header('Access-Control-Allow-Origin: *');
        echo json_encode(['id' => $pdo->lastInsertId()]);
    } else {
        // Send CORS headers
        header('Access-Control-Allow-Origin: *');
        echo json_encode(['error' => 'Failed to insert record']);
    }
}

function handleUpdate($pdo, $table) {
    $id = $_GET['id'] ?? '';
    if (empty($id)) {
        echo json_encode(['error' => 'ID parameter is required']);
        return;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $columns = array_keys($data);
    $placeholders = array_map(fn($col) => "$col = :$col", $columns);
    
    $query = "UPDATE $table SET " . implode(', ', $placeholders) . " WHERE id = :id";
    $stmt = $pdo->prepare($query);
    foreach ($data as $key => $value) {
        $stmt->bindValue(":$key", $value);
    }
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        // Send CORS headers
        header('Access-Control-Allow-Origin: *');
        echo json_encode(['status' => 'Record updated successfully']);
    } else {
        // Send CORS headers
        header('Access-Control-Allow-Origin: *');
        echo json_encode(['error' => 'Failed to update record']);
    }
}

function handleDelete($pdo, $table) {
    $id = $_GET['id'] ?? '';
    if (empty($id)) {
        echo json_encode(['error' => 'ID parameter is required']);
        return;
    }
    
    $query = "DELETE FROM $table WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        // Send CORS headers
        header('Access-Control-Allow-Origin: *');
        echo json_encode(['status' => 'Record deleted successfully']);
    } else {
        // Send CORS headers
        header('Access-Control-Allow-Origin: *');
        echo json_encode(['error' => 'Failed to delete record']);
    }
}
?>
