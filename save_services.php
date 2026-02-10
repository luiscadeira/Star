<?php
header('Content-Type: application/json');
// Simple endpoint to save services JSON to services.json in the same directory.
// Requires X-API-Key header matching server-side api_key.txt (demo auth)

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "method_not_allowed"]);
    exit;
}

// simple token check: server-side api_key.txt should contain the expected key
$expected = null;
$keyfile = __DIR__ . '/api_key.txt';
if (file_exists($keyfile)) {
    $expected = trim(file_get_contents($keyfile));
}

$headers = [];
foreach (getallheaders() as $k => $v) $headers[strtolower($k)] = $v;
$provided = isset($headers['x-api-key']) ? $headers['x-api-key'] : null;

if ($expected) {
    if (!$provided || $provided !== $expected) {
        http_response_code(401);
        echo json_encode(["error" => "invalid_api_key"]);
        exit;
    }
}

// read body
$raw = file_get_contents('php://input');
if (!$raw) {
    http_response_code(400);
    echo json_encode(["error" => "empty_body"]);
    exit;
}

$path = __DIR__ . '/services.json';
if (file_put_contents($path, $raw) === false) {
    http_response_code(500);
    echo json_encode(["error" => "write_failed"]);
    exit;
}

echo json_encode(["status" => "ok"]);
?>