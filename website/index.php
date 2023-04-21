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
        <div id="welcome">
            Welcome to C Formatter.
        </div>
        <div class="description">
            Login to upload a .c file and we will provide formatting suggestions based on our <a id="gur-link" href="http://nwiltshire.com/cformatter/GUR.pdf">General Usage Rubric.</a>
        </div>
        <?php
            session_start();
            if ($_SESSION["loginError"])
            {
                echo "<script>";
                echo "alert(\"Username or password is incorrect\");";
                echo "</script>";
            }

            unset($_SESSION["status"]);
            unset($_SESSION["password"]);
            unset($_POST["username"]);
            unset($_POST["password"]);
        ?>
        <form class="sign-in-form" method="POST" action="login.php">
            <input required class="username-password-input-label" type="text" name="username" placeholder="Username">
            <br>
            
            <input required class="username-password-input-label" type="password" name="password" placeholder="Password">

            <br>
            <input class="button-label" id="submit-button" type="submit" value="Submit">
        </form>
        <br>
        <a class="button-label" href="signupForm.php">Create an Account</a>
    </div>
  </body>
</html>
