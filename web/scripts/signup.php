<!DOCTYPE html>
<html>

<body>
	<?php
	include 'conn.php';
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$mobile = $_POST['mobile'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	try {
		$stmt = $conn->prepare("INSERT INTO public.user (firstName, lastName, email, mobile, password) VALUES (:firstName, :lastName, :email, :mobile, :password)");
		$stmt->bindValue(':firstName', $firstname, PDO::PARAM_STR);
		$stmt->bindValue(':lastName', $lastname, PDO::PARAM_STR);
		$stmt->bindValue(':email', $email, PDO::PARAM_STR);
		$stmt->bindValue(':mobile', $mobile, PDO::PARAM_STR);
		$stmt->bindValue(':password', $password, PDO::PARAM_STR);
		$stmt->execute();

		echo "<center>";
		echo "<p>Account created for $firstname!!!</p>";
		echo "<button onclick=\"location.href='../index.html';\">Go to Home</button>";
		echo "</center>";        
	} catch (PDOException $e) {
		if ($e->getCode() == 23505) {
			echo "<center>";
			echo "<p>Account was not created.</p>";
			echo "<p>E-mail '$email' is already taken.</p>";
			echo "<button onclick=\"window.history.back()\">Go Back</button>";
			echo "<button onclick=\"location.href='../login.html';\">Login</button>";
			echo "</center>";
		} else {
			// an error other than duplicate entry occurred
			echo $e->getMessage();
		}
	}
	$conn = null;
	?>
</body>

</html>
