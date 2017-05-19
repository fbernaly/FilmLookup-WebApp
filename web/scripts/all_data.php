<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        table, td, th {
            border: 1px solid black;
            padding: 5px;
        }

        th {text-align: left;}
    </style>
</head>
<body>
    <?php
    include 'vars.php';

    try {
    $conn = new PDO("pgsql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
    die();
}

echo "<table>
<tr>
    <th>Film Number</th>
    <th>Created By</th>
    <th>Location</th>
    <th>Created At</th>
    <th>Updated At</th>
</tr>";

foreach ($conn->query("SELECT f.number AS film_number, u.firstName || ' ' || u.lastName AS created_by, l.name AS location, f.created_at AS created_at, f.updated_at AS updated_at FROM public.film f INNER JOIN public.user u on f.created_by = u.id INNER JOIN public.location l on f.located_at = l.id") as $row)
{
    echo "<tr>";
    echo "<td>" . $row['film_number'] . "</td>";
    echo "<td>" . $row['created_by'] . "</td>";
    echo "<td>" . $row['location'] . "</td>";
    echo "<td>" . $row['created_at'] . "</td>";
    echo "<td>" . $row['updated_at'] . "</td>";
    echo "</tr>";
}

echo "</table>";

$conn->close();

?>
</body>
</html>
