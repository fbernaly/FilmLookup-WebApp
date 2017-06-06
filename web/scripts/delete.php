<?php
include 'conn.php';

$film = $_GET['film_number'];

$stmt = $conn->prepare("DELETE FROM public.film WHERE number = :film");
$stmt->bindValue(':film', $film, PDO::PARAM_INT);
$stmt->execute();

$conn = null;

?>
