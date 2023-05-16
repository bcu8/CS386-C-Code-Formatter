<?php
include 'phpFunctions.php';
session_start();

echo "<form id=\"file-upload-container\" method=\"post\" enctype=\"multipart/form-data\">";
            echo "<input type=\"file\" name=\"file\" id=\"file-input\" accept=\".c\"/>";
            echo "<label for=\"file-input\" class=\"button-label\">Choose a File</label>";
            echo "<div class=\"middle\">";
            echo "<p class=\"description\"><span id=\"selected-file\"></span></p>";
            echo "<input class=\"button-label\" id=\"file-submit-button\" type=\"submit\" value=\"submit\">";
            echo "</div>";
        echo"</form>";

if (isset($_FILES["file"]))
   {
    echo "<textarea style=\"width: 950px; height: 450px;\">" . addslashes(file_get_contents($_FILES["file"]["tmp_name"])) . "</textarea><br>";
    echo "<textarea style=\"width: 950px; height: 450px;\">";
    $fileContents = runWhiteSpaceFormatter(file_get_contents($_FILES["file"]["tmp_name"]));
    echo strpos($_FILES["file"]["tmp_name"], '\n');
    echo "</textarea><br>";
    echo "<textarea style=\"width: 950px; height: 450px;\">" . str_replace("\\n", "\r\n", $fileContents) . "</textarea><br>";
    //echo str_replace("\\n", "\r\n", $fileContents);
   }
?>

