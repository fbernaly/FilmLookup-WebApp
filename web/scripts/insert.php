<?php
include 'conn.php';

$film = $_POST['film_number'];
$email = $_POST['email'];

$stmt = $conn->prepare("SELECT * FROM public.film WHERE number = :film");
$stmt->bindValue(':film', $film, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($rows) > 0) {
    echo "<p>Film $film already in the database</p>";
} else {
try {
    $stmt = $conn->prepare("INSERT INTO public.film (number, located_at, created_by, updated_by)  VALUES (:film, 1, (SELECT id from public.user WHERE email = :email), (SELECT id from public.user WHERE email = :email));");
    $stmt->bindValue(':film', $film, PDO::PARAM_INT);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    echo "<p>Film $film added</p>";
} catch (PDOException $e) {
    echo $e->getMessage();
}
}

$conn = null;

?>
