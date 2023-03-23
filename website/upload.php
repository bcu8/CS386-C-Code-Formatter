<!DOCTYPE html>
<html>
<head>
    <title>Submit File2</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<?php

//get filename from upload.html
$filename = $_FILES['file']['name'];

//check if file is .c
if ( substr($filename, -2) == '.c')
   {
    //set location
    $location = getcwd() . '/' . $filename;

    //store global variable to pass to next page
    $_SESSION['location'] = $location;

    //if upload is successful, run the formatter
    if (move_uploaded_file($_FILES['file']['tmp_name'],$location))
      {
       //echo "The file location is " . $location;

       //redirect to the formatter page
       header("Location: http://codeformatter.epizy.com/formatter.php");
      }
    //otherwise report error
    else {
       echo "<h1> Fatal error. File not properly uploaded. </h1>";   
       echo "<h2>Please consider reporting this bug to the developers.</h2>";
       
       echo "<button class=\"mainDirNav\" onclick=\"window.location='upload.html'\">\n";
       echo "Retry Upload\n";
       echo "</button>";
      }
   }
else
   {
    echo "<h2>Error: Please upload only .c files.</h2><br>";
    echo "<button class=\"mainDirNav\" onclick=\"window.location='upload.html'\">\n";
    echo "Retry Upload\n";
    echo "</button>";
   }

?>

</body>
</html>