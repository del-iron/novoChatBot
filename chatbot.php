<?php
include 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userMessage = trim($_POST['message']);
    $response = "Desculpe, não entendi.";
    
    $stmt = $pdo->prepare("SELECT resposta FROM respostas WHERE pergunta LIKE :pergunta LIMIT 1");
    $stmt->execute(['pergunta' => "%$userMessage%"]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($row) {
        $response = $row['resposta'];
    }
    
    echo $response;
}
