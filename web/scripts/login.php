<?php
include 'conn.php';

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT firstname FROM public.user WHERE email = :email AND password = :password");
$stmt->bindValue(':email', $email, PDO::PARAM_STR);
$stmt->bindValue(':password', $password, PDO::PARAM_STR);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($rows) > 0) {
    echo $rows[0]['firstname'];
} else {
    echo "<p>Email and password do not match our records.</p>";
}

$conn = null;

?>
