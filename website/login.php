<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
  <header>
      <img class="logo" src="CFormatterLogo.png" alt="C Formatter">
  </header>
  <div class="main-container" id="main-body">
        <?php
        include 'phpFunctions.php';
        session_start();
        $result = login($_POST["username"], $_POST["password"]);

        $_SESSION["password"] = $_POST["password"];
        if ($result != $_POST["username"])
        {
            $_SESSION["status"] = $result;
            echo $result;
        }
        else
        {
            $_SESSION["status"] = $_POST["username"];
            echo "<p class=\"description\">Success.</p>";
        }
        
        if ($_SESSION["status"] == $_POST["username"])
        {
            //echo "<a href=\"account.php\" class=\"button-label\" id=\"bigger-button-label\">Submit or view your files</a>";
            if (isset($_POST["remember"]))
               {
                setcookie("username", $_SESSION["status"], time() + (10 * 365 * 24 * 60 * 60), "/");
                setcookie("password", $_SESSION["password"], time() + (10 * 365 * 24 * 60 * 60), "/");
               }
            header("Location: account.php");
        }

        echo "<a href=\"index.php\" class=\"button-label\" id=\"bigger-button-label\">Back to sign in</a>";

        ?>
        
    </div>
  </body>
</html>

