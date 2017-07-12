<?php
include 'conn.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        $stmt = $conn->prepare("SELECT firstname, lastname, email, mobile, name FROM public.user INNER JOIN public.role r ON role_id = r.id WHERE email = :email AND password = :password");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->bindValue(':password', $password, PDO::PARAM_STR);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($rows) > 0) {
            $user = array('firstName'=>$rows[0]['firstname'],
                          'lastName'=>$rows[0]['lastname'],
                          'email'=>$rows[0]['email'],
                          'mobile'=>$rows[0]['mobile'],
                          'role'=>$rows[0]['name']);
            
            $response = array('success' => true,
                              'error' => null,
                              'user' => $user);
        } else {
            $response = array('success' => false,
                              'error' => "Email and password do not match our records.",
                              'user' => null);
        }
    } catch (PDOException $e) {
        $response = array('success' => false,
                              'error' => $e->getMessage(),
                              'user' => null);
    }
}

echo json_encode($response);

$conn = null;

?>
