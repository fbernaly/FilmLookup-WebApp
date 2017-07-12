<?php
include 'conn.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->prepare("SELECT u.id AS id, firstname, lastname, email, mobile, name FROM public.user u INNER JOIN public.role r ON role_id = r.id ORDER BY firstName, lastName, email");
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $users = array();
        foreach($rows as $row) {
            $user = array('id'=>$row['id'],
                          'firstName'=>$row['firstname'],
                          'lastName'=>$row['lastname'],
                          'email'=>$row['email'],
                          'mobile'=>$row['mobile'],
                          'role'=>$row['name']);
            array_push($users, $user);
        }
        $response = array('success' => true,
                          'error' => null,
                          'data' => $users);
    } catch (PDOException $e) {
        $response = array('success' => false,
                          'error' => $e->getMessage(),
                          'data' => null);
    }
} if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"),$put_vars);
    $id = $put_vars['id'];
    $role_id = $put_vars['role_id'];

    try {
        $stmt = $conn->prepare("UPDATE public.user SET role_id = :role_id WHERE id = :id");
        $stmt->bindValue(':role_id', $role_id, PDO::PARAM_INT);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $response = array('success' => true,
                          'error' => null,
                          'data' => array());
    } catch (PDOException $e) {
        $response = array('success' => false,
                          'error' => $e->getMessage(),
                          'data' => null);
    }
}

echo json_encode($response);

$conn = null;

?>
