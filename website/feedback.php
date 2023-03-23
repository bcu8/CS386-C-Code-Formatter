<!DOCTYPE html>
<html>
<head>
    <title>Feedback Form</title>
</head>
<body>

<?php
$servername = "sql113.epizy.com";
$database = "epiz_33800292_code_formatter";
$username = "epiz_33800292";
$password = "Y0vOysh2y8tV";

// Create a connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check the connection
if (!$conn) {
     die("Connection failed: " . mysqli_connect_error());
}
//echo "Connected successfully";

$sql = "INSERT INTO feedback (USER_TEXT) VALUES ('" . $_POST['feedback'] . "')";

if (mysqli_query($conn, $sql)) {
     echo "<h1>Thank you! Your feedback has been recorded.</h1>";
} else {
     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
mysqli_close($conn);
?>
</body>
</html>