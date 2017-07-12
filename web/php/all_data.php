<?php
include 'vars.php';
include 'conn.php';

echo "<table>
<tr>
    <th>Film Number</th>
    <th>Created By</th>
    <th>Location</th>
    <th>Created At</th>
    <th>Delete</th>
</tr>";

foreach ($conn->query("SELECT f.number AS film_number, u.firstName || ' ' || u.lastName AS created_by, l.name AS location, f.created_at AS created_at, f.updated_at AS updated_at FROM public.film f INNER JOIN public.user u on f.created_by = u.id INNER JOIN public.location l on f.located_at = l.id ORDER BY f.number") as $row)
{
    echo "<tr>";
    echo "<td>" . $row['film_number'] . "</td>";
    echo "<td>" . $row['created_by'] . "</td>";
    echo "<td>" . $row['location'] . "</td>";
    echo "<td>" . $row['created_at'] . "</td>";
    echo "<td><button onclick=\"deleteFilm(this)\">Delete</button></td>";
    echo "</tr>";
}

echo "</table>";

$conn = null;

?>
