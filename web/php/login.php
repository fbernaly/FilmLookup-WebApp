<?php
include 'conn.php';

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT firstname, lastname, email, mobile, name FROM public.user INNER JOIN public.role r ON role_id = r.id WHERE email = :email AND password = :password");
$stmt->bindValue(':email', $email, PDO::PARAM_STR);
$stmt->bindValue(':password', $password, PDO::PARAM_STR);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($rows) > 0) {
    echo json_encode(array('firstname'=>$rows[0]['firstname'], 'lastname'=>$rows[0]['lastname'], 'email'=>$rows[0]['email'], 'mobile'=>$rows[0]['mobile'], 'role'=>$rows[0]['name']));
} else {
    echo "<p>Email and password do not match our records.</p>";
}

$conn = null;

?>
