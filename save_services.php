<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');

// Endpoint seguro para salvar serviços JSON
// Implementa validações de segurança e rate limiting

// Rate limiting simples
$rate_limit_key = $_SERVER['REMOTE_ADDR'];
$rate_limit_file = __DIR__ . '/rate_limit_' . md5($rate_limit_key) . '.json';
$rate_limit_time = 60; // 1 minuto
$rate_limit_max = 10; // máximo 10 requisições por minuto

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "method_not_allowed"]);
    exit;
}

// Verificar rate limiting
if (file_exists($rate_limit_file)) {
    $rate_data = json_decode(file_get_contents($rate_limit_file), true);
    if ($rate_data && (time() - $rate_data['first_request']) < $rate_limit_time) {
        if ($rate_data['count'] >= $rate_limit_max) {
            http_response_code(429);
            echo json_encode(["error" => "rate_limit_exceeded"]);
            exit;
        }
        $rate_data['count']++;
    } else {
        $rate_data = ['count' => 1, 'first_request' => time()];
    }
} else {
    $rate_data = ['count' => 1, 'first_request' => time()];
}

file_put_contents($rate_limit_file, json_encode($rate_data));

// Validação de API Key
$expected = null;
$keyfile = __DIR__ . '/api_key.txt';
if (file_exists($keyfile)) {
    $expected = trim(file_get_contents($keyfile));
}

$headers = [];
foreach (getallheaders() as $k => $v) {
    $headers[strtolower($k)] = $v;
}

$provided = isset($headers['x-api-key']) ? $headers['x-api-key'] : null;

if ($expected) {
    if (!$provided || $provided !== $expected) {
        http_response_code(401);
        echo json_encode(["error" => "invalid_api_key"]);
        exit;
    }
}

// Validação do corpo da requisição
$raw = file_get_contents('php://input');
if (!$raw) {
    http_response_code(400);
    echo json_encode(["error" => "empty_body"]);
    exit;
}

// Validar JSON
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "invalid_json", "details" => json_last_error_msg()]);
    exit;
}

// Sanitização básica dos dados
if (isset($data['services']) && is_array($data['services'])) {
    foreach ($data['services'] as &$service) {
        if (isset($service['name'])) {
            $service['name'] = htmlspecialchars(strip_tags($service['name']), ENT_QUOTES, 'UTF-8');
        }
        if (isset($service['description'])) {
            $service['description'] = htmlspecialchars(strip_tags($service['description']), ENT_QUOTES, 'UTF-8');
        }
        if (isset($service['price'])) {
            $service['price'] = filter_var($service['price'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        }
    }
}

// Salvar arquivo com validação
$path = __DIR__ . '/services.json';
$backup_path = __DIR__ . '/services_backup_' . date('Y-m-d_H-i-s') . '.json';

// Criar backup antes de sobrescrever
if (file_exists($path)) {
    copy($path, $backup_path);
}

$json_data = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if (file_put_contents($path, $json_data, LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(["error" => "write_failed"]);
    exit;
}

// Limpar arquivos de rate limit antigos
foreach (glob(__DIR__ . '/rate_limit_*.json') as $file) {
    if (time() - filemtime($file) > $rate_limit_time * 2) {
        unlink($file);
    }
}

echo json_encode([
    "status" => "ok", 
    "message" => "services_saved_successfully",
    "backup_created" => basename($backup_path)
]);
?>