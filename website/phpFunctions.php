<?php
//define constants
define("SERVERNAME", "sql113.epizy.com");
define("DATABASE", "epiz_33800292_code_formatter");
define("TABLE", "accounts");
define("USERNAME", "epiz_33800292");
define("PASSWORD", "Y0vOysh2y8tV");

//connect to the database. returns connection object.
function connectToDB()
   {
    // Create a connection
    $conn = mysqli_connect (SERVERNAME, USERNAME, PASSWORD, DATABASE);

    return $conn;
   }

//test strings for the occurence of spaces or quotation marks. Returns false if these chars are found
function testInput($string)
   {
    if(strpos($string, " ") !== false || strpos($string, "\'") !== false || strpos($string, "\"") !== false)
       {
        return false;
       }
    return true;
   }

//create a new user account with given details, returns account name on success, error message otherwise
function createUserAccount($username, $password, $confirmPassword)
   {
    //connect
    $conn = connectToDB();
    
    //test connection
    if ($conn)
       {
        //echo "Success! Connection established." . "<br>";
       }
    else
       {
        return "Failed to connect to server.";
       }

    //test inputs for security purposes
    if (!testInput($username) || !testInput($password))
       {
        mysqli_close($conn);
        return "No space or quotation characters allowed.";
       }

    if ($password !== $confirmPassword)
       {
        mysqli_close($conn);
        return "Passwords do not match.";
       }

    //check if account already exists
    //generate query to select user account
    $sql = "SELECT COUNT(*) as count_value FROM " . TABLE . " WHERE username = '" . $username . "'";

    //echo $sql;

    //submit query
    $result = mysqli_query($conn, $sql);

    //if no results, return error message
    if (!$result)
       {
        die("Query failed: " . mysqli_error($conn));
       }

    $row = mysqli_fetch_assoc($result);
    if ($row['count_value'] > 0)
       {
        mysqli_close($conn);
        return "There is already an account with that username.";
       }
    
    $sql= "INSERT INTO " . DATABASE . "." . TABLE;
    $sql = $sql . " (username, password) VALUES (";
    $sql = $sql . "'" . $username . "' ,";
    $sql = $sql . "'" . $password . "');";
    
    $result = mysqli_query( $conn, $sql);           
                
    if($result)
       {
        return $username;
       }
    else
       {
        return "An unexpected error occurred. Please report this to the developers.";
       }
   }

//log in to existing account. returns account name on success, error message otherwise
function login($username, $password)
   {
    //connect
    $conn = connectToDB();
    
    //test connection
    if ($conn)
       {
        //echo "Success! Connection established." . "<br>";
       }
    else
       {
        return "Failed to connect to server.";
       }

    //test inputs for security purposes
    if (!testInput($username) || !testInput($password))
       {
        mysqli_close($conn);
        return "No space or quotation characters allowed.";
       }
    
    //generate query to select user account
    $sql = 'SELECT * FROM ' . TABLE . ' WHERE username=\'' . $username . '\' AND password=\'' . $password . '\';';

    //echo $sql;

    //submit query
    $result = mysqli_query($conn, $sql);

    //if no results, return error message
    if (!mysqli_num_rows($result))
       {
        //close db connection
        mysqli_close($conn);
        return "Incorrect username or password";
       }

    //close db connection
    mysqli_close($conn);
    //if account found, return username
    return $username;  
   }

//returns a 2d array. array[index][0] contains filename of that index, array[index][1] contains file contents. Empty array indicates error.
function getUserFiles($username)
   {
    //connect
    $conn = connectToDB();
    
    //test connection
    if ($conn)
       {
        //echo "Success! Connection established." . "<br>";
       }
    else
       {
        return;
       }

    //generate query
    $sql = "SELECT filename, file FROM " . TABLE;

    //check for succesful query
    if($result = mysqli_query($conn, $sql))
       {
        //if an item was found initialize 2d array
        if ($row = mysqli_fetch_array($result))
           {
            $contents = array (
                array($row["filename"], $row["file"])
            );
           }
        //loop through rest of items if any
        while($row = mysqli_fetch_array($result))
           {
            //append new item to end of array
            $contents[] = array($row["filename"], $row["file"]);
           }

        //return result
        mysqli_close($conn);
        return $contents;
       }
    mysqli_close($conn);
   }

function storeFileInDB($username, $password, $filename, $file)
   {
    //connect
    $conn = connectToDB();
    
    if ($filename=="" || $file=="")
       {
           return "Filename or file was empty please try again.";
       }

    //test connection
    if ($conn)
       {
        //echo "Success! Connection established." . "<br>";
       }
    else
       {
        return "Could not connect to database.";
       }

     //if file is already in db delete overwrite it
     $sql = "DELETE FROM " . TABLE . " WHERE filename = '" . $filename . "';";

    //echo $sql;

    //submit query
    $result = mysqli_query($conn, $sql);


    //insert new file 
     $sql= "INSERT INTO " . DATABASE . "." . TABLE;
    $sql = $sql . " (username, password, filename, file) VALUES (";
    $sql = $sql . "'" . $username . "' ,";
    $sql = $sql . "'" . $password . "' ,";
    $sql = $sql . "'" . $filename . "' ,";
    $sql = $sql . "'" . $file . "');";

    //echo $sql;
    
    $result = mysqli_query( $conn, $sql);           
                
    if($result)
       {
        mysqli_close($conn);
        return $username;
       }
    else
       {
        mysqli_close($conn);
        return "An unexpected error occurred. Please report this to the developers.";
       }
   }

 function printFilesTable($username, $password)
   {
    //connect
    $conn = connectToDB();
    session_start();

    //test connection
    if ($conn)
       {
        //echo "Success! Connection established." . "<br>";
       }
    else
       {
        return "Could not connect to database.";
       }
    

    $sql = "SELECT filename, file FROM ";
    $sql = $sql . DATABASE . "." . TABLE ." WHERE username='" . $username . "';";
                
    //echo $sql;
    
    $result = mysqli_query($conn, $sql);
                
    if (!$result)
       {
        die();
       }
    
    echo "<p class=\"description\">Your Files:</p>";
    echo "<form class=\"results-button-container\" method=\"post\">";
    
    $iteration=0;
    while ($row = mysqli_fetch_assoc($result))
       {
        if ($row["filename"] != NULL && $row["filename"]!= '')
        {
         if ($iteration %5 == 0)
            {
             echo "<br>";
            }

        echo "<input class=\"button-label\" type=\"submit\" value=\"" . $row["filename"] . "\" name=\"selectedFile\">";
        $iteration++;
        }
       }
    echo "</form>";
                
    mysqli_close($conn);
    }

function cleanDB($username)
   {
    //connect
    $conn = connectToDB();

    //test connection
    if ($conn)
       {
        //echo "Success! Connection established." . "<br>";
       }
    else
       {
        return "Could not connect to database.";
       }
    
    //delete rows with filename and file of NULL
    $sql = "DELETE FROM ";
    $sql = $sql . DATABASE . ".". TABLE . " WHERE filename IS NULL AND username = '" . $username . "' GROUP BY username HAVING COUNT(*) > 1;";

    //echo $sql;

    $result = mysqli_query($conn, $sql);
    mysqli_close($conn);
   }

function getFile($filename)
   {
    //connect
    $conn = connectToDB();

    //test connection
    if ($conn)
       {
        //echo "Success! Connection established." . "<br>";
       }
    else
       {
        return "Could not connect to database.";
       }
    
    $sql = "SELECT file FROM " . TABLE . " WHERE filename='" . $filename . "';";

    //echo $sql;
    
    $result = mysqli_query($conn, $sql);

    $file=  mysqli_fetch_assoc($result);
    //echo $file["file"];
    
    mysqli_close($conn);
    return $file["file"];
   }

function printFile($string)
   {
    echo $string;
   }

function clearUserFiles()
   {
    $this_directory = dirname(__FILE__);
            
    // Folder path to be flushed
    $folder_path = $this_directory . "/userFiles";
   
    // List of name of files inside
    // specified folder
    $filesToDelete = glob($folder_path.'/*'); 
   
    // Deleting all the files in the list
     foreach($filesToDelete as $fileToDelete) 
        {   
         if(is_file($fileToDelete)) 
            {
             // Delete the given file
             unlink($fileToDelete); 
            }
        }
   }

function deleteFromDB($username, $filename)
   {
    //connect
    $conn = connectToDB();

    //test connection
    if ($conn)
       {
        //echo "Success! Connection established." . "<br>";
       }
    else
       {
        return "Could not connect to database.";
       }
    
    $sql = "DELETE FROM " . TABLE . " WHERE filename='" . $filename . "' AND username='" . $username . "';";

    //echo $sql;
    
    $result = mysqli_query($conn, $sql);
    
    mysqli_close($conn);
   }
?>