<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Provide Feedback</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
  <header>
      <img class="logo" src="CFormatterLogo.png" alt="C Formatter">
  </header>
  <div class="main-container" id="main-body">

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
            echo "<p class=\"description\">Your feedback has been submitted. Thank you!</p>";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        mysqli_close($conn);
        ?>

        <a class="button-label" href="account.php">Back to formatter</a>
    </div>
  </body>
</html>