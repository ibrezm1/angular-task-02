<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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

// Authenticate the user
authenticate();

// If authentication is successful
echo json_encode(['message' => 'Authentication successful']);
?>
