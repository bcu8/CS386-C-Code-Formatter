<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Account</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
  <header class="account-header">
      <img class="logo" src="CFormatterLogo.png" alt="C Formatter">
      <a class="button-label" id="sign-out-button" href="index.php">Sign out</a>
  </header>
  <p class="description">Select a file you would like to get formatting suggestions on, then click on your files to view the suggestions.</p>
    <?php
        session_start();
        include "phpFunctions.php";

        echo "<form id=\"file-upload-container\" method=\"post\" enctype=\"multipart/form-data\">";
            echo "<input type=\"file\" name=\"file\" id=\"file-input\" accept=\".c\"/>";
            echo "<label for=\"file-input\" class=\"button-label\">Choose a File</label>";
            echo "<div class=\"middle\">";
            echo "<p class=\"description\"><span id=\"selected-file\"></span></p>";
            echo "<input class=\"button-label\" id=\"file-submit-button\" type=\"submit\" value=\"submit\">";
            echo "</div>";
        echo"</form>";

        $result = "none";
        if(isset($_FILES['file']))
        {

            $filename = $_FILES['file']['name'];
            $file_type = $_FILES['file']['type'];
            
            if ($file_type != "text/plain")
            {
            // die("File type must be text.");
            }
            if ($filename[-1] != 'c' || $filename[-2]!= '.')
            {
                echo "<p class=\"description\">File must be .c</p>";
                goto fileOut;
            }

            $file_contents = addslashes(file_get_contents($_FILES["file"]["tmp_name"]));

        $result = storeFileInDB($_SESSION["status"], $_SESSION["password"], $filename ,$file_contents);
        
        if ($result != $_SESSION["status"])
        {
            echo $result;
        }
        else if ($result == $_SESSION["status"])
        {
            echo "<p class=\"description\">Success. File stored.</p>";
        }

        echo "<br>";
        }

        fileOut:
            printFilesTable($_SESSION["status"], $_SESSION["password"]);
            
            if (isset($_POST['selectedFile'])) {
                $fileContent = getFile($_POST['selectedFile']);
                echo '<div id="code-results"></div>';
                echo '<script src="main.js"></script>';
                echo "<script>executeTestSequence(" . json_encode($fileContent) . ");</script>";
        }
    ?>
    <script>
    const fileInput = document.querySelector('#file-input');
    const selectedFile = document.querySelector('#selected-file');
    const submitButton = document.getElementById('file-submit-button');


    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            selectedFile.textContent = file.name;
            submitButton.style.display = 'block';
        } else {
            selectedFile.textContent = '';
        }
    });
</script>
  </body>
</html>


