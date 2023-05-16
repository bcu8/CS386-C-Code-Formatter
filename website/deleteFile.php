<?php
session_start();
include 'phpFunctions.php';

if (isset($_GET["file"]))
   {
    deleteFromDB($_SESSION["status"], $_GET["file"]);
    header("Location: account.php");
   }
else 
   {
    die("No File Selected.");
   }
?>