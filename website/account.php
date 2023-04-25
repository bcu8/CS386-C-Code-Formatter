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
      <div>
        <a class="button-label" id="sign-out-button" href="index.php?logout=1">Sign out</a>
        <a class="button-label" id="sign-out-button" href="feedback.html">Provide Feedback</a>

      </div>
  </header>
  <p class="description">Select a file you would like to get formatting suggestions on, then click on your files to view the suggestions.</p>
    <?php
        session_start();
        include "phpFunctions.php";

        //file upload interface (html)===========================================================
        echo "<form id=\"file-upload-container\" method=\"post\" enctype=\"multipart/form-data\">";
            echo "<input type=\"file\" name=\"file\" id=\"file-input\" accept=\".c\"/>";
            echo "<label for=\"file-input\" class=\"button-label\">Choose a File</label>";
            echo "<div class=\"middle\">";
            echo "<p class=\"description\"><span id=\"selected-file\"></span></p>";
            echo "<input class=\"button-label\" id=\"file-submit-button\" type=\"submit\" value=\"submit\">";
            echo "</div>";
        echo"</form>";
        //==================================================================================================

        //file upload processing===========================================================================
        $result = "none";

        //ensure the file was captured by html form
        if(isset($_FILES['file']))
           {
            //get filename
            $filename = $_FILES['file']['name'];
            
            //check filename for .c filetype
            if ($filename[-1] != 'c' || $filename[-2]!= '.')
               {
                echo "<p class=\"description\">File must be .c</p>";
                goto fileOut;
               }

            //store file contents as string
            $file_contents = addslashes(file_get_contents($_FILES["file"]["tmp_name"]));

           //store file in db
           $result = storeFileInDB($_SESSION["status"], $_SESSION["password"], $filename ,$file_contents);
           //=====================================================================================================
        
           //check for successful store in db operation===========================================================
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
        //===================================================================================================

        //printing file buttons===============================================================================
        fileOut:
            printFilesTable($_SESSION["status"], $_SESSION["password"]);
        //====================================================================================================

            //delete outdated user files=====================================================================
            $this_directory = dirname(__FILE__);
            
             // Folder path for user downloadable files
            $folder_path = $this_directory . "/userFiles";

            //check for outdated file
            if (isset($_SESSION["lastSelectedFile"]))
               {
                //get filename
                $fileToDelete =  $folder_path . "/" . $_SESSION["lastSelectedFile"];

                //check if fileToDelete is found
                if(is_file($fileToDelete)) 
                     {
                      // Delete the given file
                      unlink($fileToDelete); 
                     }
               }
            //===============================================================================================
            
            //interface and processing for selected file====================================================
            if (isset($_POST['selectedFile'])) 
               {  
                //print horizontal line              
                echo "<br><hr color=\"blue\">";

                //get file content as string from db
                $fileContent = getFile($_POST['selectedFile']);

                //get downloadable file name
                $downloadableFileName = $_SESSION["status"] . "_" . $_POST['selectedFile'];

                //open downloadable file
                $fp = fopen($this_directory . "/userFiles/" . $downloadableFileName, "w");

                //write file contents to downloadable file
                fwrite($fp, $fileContent); 

                //close file
                fclose($fp);

                //set last selected file as current file
                $_SESSION["lastSelectedFile"] = $downloadableFileName;

                //The file options================================================================================================================================
                //print file name
                echo "<p class=\"description\">" . $_POST["selectedFile"] . "</p>";//<-----------------formatting?

                //print file options label
                echo "<p class=\"description\">File Options:</p>";//<-----------------formatting?

                //download file option
                echo "<a class=\"button-label\" id=\"download-button\" href=\"userFiles/" . $downloadableFileName . "\" download>Download File</a>";

                //white space formatter option
                echo "<a class=\"button-label\" id=\"download-button\" href=\"userFiles/" . "whiteSpaceFormatter.php?file=" . $downloadableFileName . "\">Run White Space Formatter</a>";

                //delete file option
                echo "<a class=\"button-label\" id=\"download-button\" href=\"deleteFile.php?file=" . $_POST['selectedFile'] . "\">Delete File</a>";
                //==============================================================================================================================================

                //file suggestions================================================================================================================================
                //print horizontal line
                echo "<br><hr color=\"blue\">";

                //print file suggestions label
                echo "<p class=\"description\">File Suggestions:</p>"; //<----------------------formatting?

                //print file with suggestions
                echo '<div id="code-results"></div>';
                echo '<script src="main.js"></script>';
                echo "<script>executeTestSequence(" . json_encode($fileContent) . ");</script>";
                echo "<br><br>";
                //==============================================================================================================================================
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


