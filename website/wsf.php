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
  </header>
<p class="description">The WSF will align all curly braces, properly indent code blocks, and remove tabs (replacing them with spaces).</p>
<?php
    include 'phpFunctions.php';
    session_start();

    if (isset($_GET["file"]))
    {

    $fileName = $_GET["file"];
    $file = getFile($fileName);

    //folder path for current directory (htdocs)
    $this_directory = dirname(__FILE__);
            
    // Folder path for user downloadable files
    $folder_path = $this_directory . "/userFiles";

    //get downloadable file name
    $downloadableFileName = $_SESSION["status"] . "_Formatted_" . $fileName;

    //open downloadable file
    $fp = fopen($this_directory . "/userFiles/" . $downloadableFileName, "w");

    //write file contents to downloadable file
    fwrite($fp, runWhiteSpaceFormatter($file)); 

    //close file
    fclose($fp);

    echo "<div class=\"options-container\">";
    echo "<a class=\"button-label\" id=\"download-button\" href=\"userFiles/" . $downloadableFileName . "\" download>Download Formatted File</a>";

    echo "<a class=\"button-label\" id=\"download-button\" href=\"account.php\">Return Home</a>";
    echo '</div>';
    }
    else
    {
    echo "filename improperly passed";
    die();
    }
?>