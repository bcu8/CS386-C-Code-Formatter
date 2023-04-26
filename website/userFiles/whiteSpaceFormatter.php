<?php
    if (isset($_GET["file"]))
       {
        echo "File properly selected. (White space formatter not finished)";
        echo "<br><a href=\"http://codeformatter.epizy.com/account.php\">Return</a>";
       }
    else
       {
        echo "Error no file selected.";
       }
?>