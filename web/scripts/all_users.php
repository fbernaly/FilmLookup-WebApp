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
    echo "<td>";
    echo "<div class=\"onoffswitch\">";
    echo "<input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"" . $row['email'] . "\" checked>";
    echo "<label class=\"onoffswitch-label\" for=\"" . $row['email'] . "\">";
    echo "<span class=\"onoffswitch-inner\"></span>";
    echo "<span class=\"onoffswitch-switch\"></span>";
    echo "</label>";
    echo "</div>";
    echo "</td>";
    echo "</tr>";
}

echo "</table>";

$conn = null;

?>
