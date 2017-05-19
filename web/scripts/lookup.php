<?php
include 'conn.php';

$film = intval($_GET['film_number']);

//set_time_limit(0);

echo "<table>
<tr>
    <th>Film Number</th>
    <th>Location</th>
    <th>Created By</th>
    <th>Created At</th>
    <th>Updated At</th>
</tr>";

$stmt = $conn->prepare("SELECT f.number AS film_number, u.firstName || ' ' || u.lastName AS created_by, l.name AS location, f.created_at AS created_at, f.updated_at AS updated_at FROM public.film f INNER JOIN public.user u on f.created_by = u.id INNER JOIN public.location l on f.located_at = l.id WHERE f.number = :film");
$stmt->bindValue(':film', $film, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($rows) > 0) {
    foreach ($rows as $row)
    {
        echo "<tr>";
        echo "<td>" . $row['film_number'] . "</td>";
        echo "<td>" . $row['location'] . "</td>";
        echo "<td>" . $row['created_by'] . "</td>";
        echo "<td>" . $row['created_at'] . "</td>";
        echo "<td>" . $row['updated_at'] . "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr>";
    echo "<td>" . $film . "</td>";
    echo "<td>Not found</td>";
    echo "<td>--</td>";
    echo "<td>--</td>";
    echo "<td>--</td>";
    echo "</tr>";
}

echo "</table>";

$conn->close();

?>
