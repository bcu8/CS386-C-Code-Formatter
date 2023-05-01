<?php
include "phpFunctions.php";
// global constants
define('OUT_FILE_STAMP', 'FORMATTED.c');
define('LINE_LENGTH_CAP', 80);

// initialize variables
$fileName = "";
$outFileName = "";
$inputFilePtr = null;
$outputFilePtr = null;
$outputOpen = false;

/*
 * Function that takes in an input file name and appends OUT_FILE_STAMP.
 * Returns resulting string.
 */
function createOutputFileName($inString)
{
    return substr($inString, 0, -2) . OUT_FILE_STAMP;
}

/*
 * Function that opens the output file for writing.
 * Returns true if the file is successfully opened, false otherwise.
 */
function openOutputFile($outFileName)
{
    global $outputFilePtr;
    $outputFilePtr = fopen("../userFiles/" . $outFileName, "w");
    return $outputFilePtr !== false;
}

/*
 * Function that writes a character to the output file.
 */
function writeCharacterToFile($char)
{
    global $outputFilePtr;
    fwrite($outputFilePtr, $char);
}

/*
 * Function that writes a string of characters to the output file.
 */
function writeCharactersToFile($numChars, $char)
{
    for ($i = 0; $i < $numChars; $i++) {
        writeCharacterToFile($char);
    }
}

/*
 * Function that writes an endline character to the output file.
 */
function writeEndlineToFile()
{
    writeCharacterToFile("\n");
}

/*
 * Function that closes the output file.
 */
function closeOutputFile()
{
    global $outputFilePtr;
    fclose($outputFilePtr);
}

/*
 * Function that takes in a pointer to an input file, a pointer to the current character,
 * a pointer to the last character, and an iteration. Returns true if the file has more data,
 * false if the file has ended. Updates current and last characters as return parameters.
 */
function getNextChar(&$filePtr, &$currentChar, &$lastChar)
{
    $lastChar = $currentChar;
    $currentChar = fgetc($filePtr);
    return $currentChar !== false;
}

/*
 * Function that detects whitespace characters, excluding newline.
 */
function isWhiteSpace($chr)
{
    return $chr === " " || $chr === "\t" || $chr === "\r" || $chr === "\v" || $chr === "\f";
}

/*
 * Function that processes the input file and writes the formatted version to the output file.
 */
/*
Processes input file and writes formatted version to output file.
*/
function writeFormattedFile($inputFilePtr, $outputOpen, $outFileName)
{
    $currentChar = 'S';
    $lastChar = null;
    $trashChar = ' ';
    $indent = 0;
    $lineLength = 0;
    $currentLine = 1;

    if ($outputOpen && $inputFilePtr !== false) {
        while (getNextChar($inputFilePtr, $currentChar, $lastChar)) {
            if ($currentChar === "\n") {
                $lineLength = 0;

                // Process multiple newlines, if any
                while ($currentChar === "\n") {
                    fwrite($outputOpen, "\n");

                    $currentLine++;

                    while ($trashChar === " ") {
                        $trashChar = fgetc($inputFilePtr);

                        if (feof($inputFilePtr)) {
                            return true;
                        }
                    }

                    $currentChar = $trashChar;
                    $trashChar = ' ';
                }

                if ($currentChar === '{') {
                    $indent += 3;
                    fwrite($outputOpen, "   ");
                    $lineLength += $indent;
                    fwrite($outputOpen, $currentChar);
                    $lineLength++;
                } elseif ($currentChar === '}') {
                    $indent -= 3;
                    writeCharactersToFile($indent, ' ');
                    $lineLength += $indent;
                    fwrite($outputOpen, $currentChar);
                    $lineLength++;
                } elseif ($indent === 0) {
                    fwrite($outputOpen, $currentChar);
                    $lineLength++;
                } else {
                    writeCharactersToFile($indent + 1, ' ');
                    wfwrite($outputOpen, $currentChar);
                    $lineLength += $indent + 1;
                }
            } else {
                fwrite($outputOpen, $currentChar);
                $lineLength++;
            }
        }
    } else {
        if ($inputFilePtr === false) {
            echo "Input file not found\n";
        }

        if (!$outputOpen) {
            echo "Output file couldn't open\n";
        }

        echo "PROGRAM END\n";
        return false;
    }

    return true;
}

if (isset($_GET["file"]))
    {
    echo "File properly selected. (White space formatter not finished)";
    echo "<br><a href=\"http://codeformatter.epizy.com/account.php\">Return</a>";

    $fileName = $_GET["file"];

    $file = getFile($fileName);

    $fileStream = fopen('data://text/plain,' . $file, 'r');

    // create output file name
    $outFileName = createOutputFileName($fileName);

    // openOutput
    $outputOpen = openOutputFile($outFileName);

    // write formatted code to output file
    writeFormattedFile($inputFilePtr, $outputOpen, $outFileName);

    // close input and output files
    closeOutputFile();
    fclose($fileStream);

    // end main
    exit();
}
else
{
    echo "Error no file selected.";
}
