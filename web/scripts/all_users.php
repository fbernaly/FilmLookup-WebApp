<?php
include 'vars.php';
include 'conn.php';

echo "<table>
<tr>
    <th>Name</th>
    <th>E-mail</th>
    <th>Role</th>
</tr>";

foreach ($conn->query("SELECT u.firstName || ' ' || u.lastName AS user, u.email AS email, r.name AS role FROM public.user u INNER JOIN public.role r ON r.id = u.role_id ORDER BY user;") as $row)
{
    echo "<tr>";
    echo "<td>" . $row['user'] . "</td>";
    echo "<td>" . $row['email'] . "</td>";
    echo "<td>" . $row['role'];
    echo "<label class=\"switch\">";
    echo "<input type=\"checkbox\" checked>";
    echo "<div class=\"slider round\"></div>";
    echo "</label>";
    echo "</td>";
    echo "</tr>";
}

echo "</table>";

$conn = null;

?>
