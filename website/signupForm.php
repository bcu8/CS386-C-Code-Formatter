<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Welcome</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
  <header>
      <img class="logo" src="CFormatterLogo.png" alt="C Formatter">
  </header>
  <div class="main-container" id="main-body">
        <div class="description">Create an account.</div>

        <form class="sign-in-form" method="post">
        <input required class="username-password-input-label" type="text" name="username" placeholder="Username">
        <br>
        <input required class="username-password-input-label" type="password" name="password" placeholder="Password">
        <br>
        <input required class="username-password-input-label" type="password" name="confirmPassword" placeholder="Confirm Password">
        <br>
        <input class="button-label" type="submit" value="Submit">
    </form>

    <?php
        session_start();
        include "phpFunctions.php";
        if (isset($_POST["username"])  && isset($_POST["password"]) && isset($_POST["confirmPassword"]))
        {

            $result = createUserAccount($_POST["username"], $_POST["password"], $_POST["confirmPassword"]);

        if ($result != $_POST["username"])
        {
            echo "<script>";
            echo "alert('" . $result . "');";
            echo "</script>";
        }
        else
        {
            $_SESSION["msg"] = "Success! You are now signed in as " . $result . ".";
            $_SESSION["status"] = $result;
            header("Location: account.php");
        }
    }
    ?>
    <a class="button-label" href="index.php">
      Return to sign in
  </a>

  </div>
  </body>
</html>