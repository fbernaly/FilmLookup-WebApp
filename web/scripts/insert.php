<?php
include 'conn.php';

$film = $_POST['film_number'];
$email = $_POST['email'];

try {
    $stmt = $conn->prepare("INSERT INTO public.film (number, located_at, created_by, updated_by)  VALUES (:film, 1, (SELECT id from public.user WHERE email = :email), (SELECT id from public.user WHERE email = :email));");
    $stmt->bindValue(':film', $film, PDO::PARAM_INT);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    echo "ok";
} catch (PDOException $e) {
    echo "error";
}

$conn = null;

?>
