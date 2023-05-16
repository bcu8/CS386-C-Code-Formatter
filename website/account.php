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
        <a class="button-label" id="sign-out-button" href="GUR_CS249.pdf" target="_blank">View GUR</a>
        <a class="button-label" id="sign-out-button" href="about.html">About this Project</a>
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

        //check if wsf was run
        if (isset($_GET['file']))
           {
            $file_contents = getFile($_GET['file']);
            
            $result = storeFileInDB($_SESSION["status"], $_SESSION["password"], $_GET['file'] ,runWhiteSpaceFormatter(addslashes($file_contents)));

            $_POST['selectedFile'] = $_GET['file'];
           }        
        //otherwise ensure the file was captured by html form
        elseif (isset($_FILES['file']))
           {
            //get filename
            $filename = $_FILES['file']['name'];
            
            //check filename for .c filetype
            if ($filename[-1] != 'c' || $filename[-2]!= '.')
               {
                echo "<p class=\"description\">File must be .c</p>";
                goto fileOut;
               }

            //apply white space formatter and store file contents as string
            $file_contents = /*runWhiteSpaceFormatter*/(addslashes(file_get_contents($_FILES["file"]["tmp_name"])));

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

            $_POST['selectedFile'] = $filename;
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

            //get names of all files into an array
            $userFiles = glob($folder_path.'/*');
            
            //get length of path preceeding file name
            $beginFileNameIndex = strlen($folder_path) + 1;
            
            //loop through list of file names
            foreach ($userFiles as $currentUserFile) 
               {
                //check username preceeding file name
                if (substr($userFiles[0],$beginFileNameIndex, strlen($_SESSION["status"] . "_")) === $_SESSION["status"] . "_")
                   {
                     // Delete the given file if it matches user
                      unlink($currentUserFile); 
                   }
               }
            //===============================================================================================
            
            //interface and processing for selected file====================================================
            if (isset($_POST['selectedFile'])) 
               {  

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
                echo "<div class=\"options-container\">";
                echo "<div class=\"middle\">";
                //print file name
                echo "<p class=\"description\">" . $_POST["selectedFile"] . "</p>";

                //download file option
                echo "<a class=\"button-label\" id=\"download-button\" href=\"userFiles/" . $downloadableFileName . "\" download>Download File</a>";

                //white space formatter option
                echo "<a class=\"button-label\" id=\"download-button\" href=\"" . "account.php?file=" . $_POST['selectedFile'] . "\">Run White Space Formatter</a>";

                //delete file option
                echo "<a class=\"button-label\" id=\"download-button\" href=\"deleteFile.php?file=" . $_POST['selectedFile'] . "\">Delete File</a>";
                echo "</div>";
                echo "</div>";
                //==============================================================================================================================================

                //file suggestions================================================================================================================================
                
                //print file suggestions label
                echo "<p class=\"description\">File Suggestions:</p>"; 
                //print file summary
                echo '<p class="description" id="summary"><p>';

                
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


