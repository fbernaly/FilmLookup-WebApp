<?php
include 'conn.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    try {
        $stmt = $conn->prepare("INSERT INTO public.user (firstName, lastName, email, mobile, password) VALUES (:firstName, :lastName, :email, :mobile, :password)");
        $stmt->bindValue(':firstName', $firstName, PDO::PARAM_STR);
        $stmt->bindValue(':lastName', $lastName, PDO::PARAM_STR);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->bindValue(':mobile', $mobile, PDO::PARAM_STR);
        $stmt->bindValue(':password', $password, PDO::PARAM_STR);
        $stmt->execute(); 
        
        $stmt = $conn->prepare("SELECT u.id AS id, firstname, lastname, email, mobile, name FROM public.user u INNER JOIN public.role r ON role_id = r.id WHERE email = :email AND password = :password");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->bindValue(':password', $password, PDO::PARAM_STR);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($rows) > 0) {
            $user = array('id'=>$rows[0]['id'],
                          'firstName'=>$rows[0]['firstname'],
                          'lastName'=>$rows[0]['lastname'],
                          'email'=>$rows[0]['email'],
                          'mobile'=>$rows[0]['mobile'],
                          'role'=>$rows[0]['name']);
            
            $response = array('success' => true,
                              'error' => null,
                              'data' => $user);
        } else {
            $response = array('success' => false,
                              'error' => "Email and password do not match our records.",
                              'data' => null);
        }
    } catch (PDOException $e) {
        $response = array('success' => false,
                          'error' => $e->getMessage(),
                          'data' => null);
    }
}

echo json_encode($response);

$conn = null;

?>
