<?php
include 'vars.php';
include 'conn.php';

$response = array();

foreach ($conn->query("SELECT f.id AS id, f.number AS film_number, u.firstName || ' ' || u.lastName AS created_by, l.name AS location, f.created_at AS created_at, f.updated_at AS updated_at FROM public.film f INNER JOIN public.user u on f.created_by = u.id INNER JOIN public.location l on f.located_at = l.id ORDER BY f.number") as $row)
{
  $film = array('id'=>$row['id'], 'film_number'=>$row['film_number'], 'location'=>$row['location'] , 'created_at'=>$row['created_at']);
  array_push($response, $film);
}

echo json_encode($response);

$conn = null;

?>
