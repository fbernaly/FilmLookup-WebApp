<?php
include 'conn.php';

$film = intval($_GET['film_number']);

$stmt = $conn->prepare("SELECT f.number AS film_number, u.firstName || ' ' || u.lastName AS created_by, l.name AS location, f.created_at AS created_at, f.updated_at AS updated_at FROM public.film f INNER JOIN public.user u on f.created_by = u.id INNER JOIN public.location l on f.located_at = l.id WHERE f.number = :film");
$stmt->bindValue(':film', $film, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "<br/><br>";

if (count($rows) > 0) {
    echo "<p>Film Found</p>
<br>
<table>
<tr>
    <th>Film Number</th>
    <th>Location</th>
</tr>";
    foreach ($rows as $row)
    {
        echo "<tr>";
        echo "<td>" . $row['film_number'] . "</td>";
        echo "<td>" . $row['location'] . "</td>";
        echo "</tr>";
    }
    
    echo "</table>";
} else {
    echo "<p>Film Not Found</p>";
}

$conn->close();

?>
