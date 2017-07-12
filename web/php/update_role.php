<?php
include 'vars.php';
include 'conn.php';

$email = $_POST['email'];
$role = $_POST['role'];

try {
    $stmt = $conn->prepare("UPDATE public.user SET role_id = :role WHERE email = :email");
    $stmt->bindValue(':role', $role, PDO::PARAM_INT);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
} catch (PDOException $e) {
}

$conn = null;

?>
