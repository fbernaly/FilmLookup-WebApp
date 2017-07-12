<?php
include 'conn.php';

$response = array();

$get_film = "SELECT f.id AS id, f.number AS film_number, u.firstName || ' ' || u.lastName AS created_by, l.name AS location, f.created_at AS created_at, f.updated_at AS updated_at FROM public.film f INNER JOIN public.user u ON f.created_by = u.id INNER JOIN public.location l ON f.located_at = l.id";
$get_all_films = $get_film . " ORDER BY f.number ASC";
$get_film = $get_film . " WHERE f.number = :number";
$insert_film = "INSERT INTO public.film (number, located_at, created_by, updated_by)  VALUES (:number, 1, (SELECT id from public.user WHERE email = :email), (SELECT id from public.user WHERE email = :email));";
$delete_film = "DELETE FROM public.film WHERE id = :id";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $number = $_POST['number'];
    $email = $_POST['email'];
    
    $stmt = $conn->prepare($get_film);
    $stmt->bindValue(':number', $number, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($rows) > 0) {
        foreach ($rows as $row)
        {
            $film = array('id' => $row['id'],
                          'film_number' => $row['film_number'],
                          'location' => $row['location'],
                          'created_at' => $row['created_at']);
            array_push($response, $film);
        }
    } else {
        try {
            $stmt = $conn->prepare($insert_film);
            $stmt->bindValue(':number', $number, PDO::PARAM_INT);
            $stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
            
            $stmt = $conn->prepare($get_film);
            $stmt->bindValue(':number', $number, PDO::PARAM_INT);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($rows as $row)
            {
                $film = array('id' => $row['id'],
                              'film_number' => $row['film_number'],
                              'location' => $row['location'],
                              'created_at' => $row['created_at']);
                array_push($response, $film);
            }  
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    foreach ($conn->query($get_all_films) as $row)
    {
        $film = array('id' => $row['id'],
                      'film_number' => $row['film_number'],
                      'location' => $row['location'],
                      'created_at' => $row['created_at']);
        array_push($response, $film);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"),$delete_vars);
    $id = $delete_vars['id'];
    
    try {
        $stmt = $conn->prepare($delete_film);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}

echo json_encode($response);

$conn = null;

?>
