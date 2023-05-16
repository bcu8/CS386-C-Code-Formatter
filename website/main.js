
// Connect HTML elements to JavaScript variables.
let codeResults = document.getElementById("code-results");

//variable to store total points deducted by GUR
let totalGURDeduction =0;
let GUR20 = false;

// Peek function is not native to stacks in javascript, create peek function (check last element in stack without popping).
Array.prototype.peek = function() {

    return this[this.length - 1];

};

/*
    Defining Line Class:
    Each line of code in the user's inputted file will be turned into a Line object in order
    to store important information.

        - lineNumber (int): Will track index of the line within the code.
        - lineContent (String): Stores the actual code in the line.
        - suggestions (String): Stores the suggestions that functions find for the line.
        - tabCount (int): Stores the amount of tabs counted before characters in the line.

        - getNumTabs(lineContent): Counts the number of tabs before any character in a string,
        stopping once a curly bracket is found.
*/
class Line {

    constructor(lineNumber, lineContent, suggestions, tabCount) {

        // Setting object's values to values layed out in class (basic function of a constructor).
        this.lineNumber = lineNumber;
        this.lineContent = lineContent;
        this.suggestions = suggestions;
        this.tabCount = 0;
        
        // Set object's tabCount value to getNumTabs, passing its own lineContent as the lineContent parameter.
        this.tabCount = this.getNumTabs(this.lineContent);

        //If object has a suggestion, hasSuggestion will be true.
        this.hasSuggestion = this.suggestions.length > 0;

    }
  
    // Counts the number of tabs before any character in a string, stopping once a curly bracket is found.
    // Returns: int containing number of tabs counted.
    getNumTabs(lineContent) {

    let tabCount = 0;

        // Loops through each character in the lineContent string.
        for (let i = 0; i < lineContent.length; i++) {

            // "\t" represents a tab. tabCount increments each time a tab is found.
            if (lineContent[i] === '\t') {

                tabCount++;

            //If a "{" or "}" is found, break out of loop.
            } else if (lineContent[i] === '{' || lineContent[i] === '}') {

                break;

            }
        }

        return tabCount;

    }
}

// Removes all comments within rawCode, performs tests on each line and sets suggestions, prints lines to screen. 
function executeTestSequence(rawCode) {

    printLinesToScreen(testLines(separateComments(rawCode)));

}

// Runs tests on nonCommentedCode for each line individually, and all lines as a whole.
// Returns an array of Line objects, one object for each line of code.
function testLines(nonCommentedCode) {

    // Stores an array containing Line objects for each respective line of code.
    const lines = [];

    // Stores an array containing Strings of code, for each respective line of code.
    let codeArray = nonCommentedCode.split('\n');

    // For each line of code, create a new Line object, storing the line's index, content, and suggestions.
    // For each line of code, runs single line tests, and sets results to the suggestions value.
    codeArray.forEach((rawLine, index) => {

        // Adds the Line objects to lines array.
        lines.push(new Line(index, rawLine, runSingleLineTests(rawLine)));

    });

    // Runs tests that require scanning multiple lines, passing the already populated lines array through functions.

    checkMisalignedBrackets(lines);
    varDecWithinLoop(nonCommentedCode, lines);
    checkForBreakOutsideOfSwitchStatement(nonCommentedCode, lines);
    checkForEmptyIfStatements(nonCommentedCode, lines)

    // Returns the lines array.
    return lines;

}

// Takes in a string of code and runs all single line tests on the code, returning a String of suggestions outputted by the tests.
function runSingleLineTests(rawLine) {
    
    // Stores string of suggestions.
    let results = '';

    // Runs each test and adds test results to results variable.
    results += checkSingleLetterVariables(rawLine);
    //results += checkNonSelfDocumentingVariables(rawLine);
    results += checkRedundantBooleanTests(rawLine);
    results += checkOverEightyCharacters(rawLine);
    results += checkStateChangesInBrackets(rawLine);
    //results += checkDeclarationsInForLoops(rawLine);
    results += checkIncompleteForLoops(rawLine);
    results += checkCurlyBraceOnSameLineAsCode(rawLine);
    results += checkForEmptyReturn(rawLine);
    results += checkForContinue(rawLine);

    return results;

}

// Prints lines to the page, injects suggestions into code, and formats accordingly.
function printLinesToScreen(lines) {

    //print total GUR deduction (summary)
document.getElementById("summary").innerHTML = "We have detected " + totalGURDeduction + " points worth of GUR violations";

    
    // Sets listElement to a new list container element in HTML page.
    let listElement = document.createElement('ul');
    listElement.setAttribute('id', 'listed-code');

    // Loops through each line.
    for (let i = 0; i < lines.length; i++) {

        // Sets listItem equal to a new list element in HTML page.
        let listItem = document.createElement('li');
        listItem.id = 'line-' + (i + 1);

        // Ensures whitespace is still visible.
        let preElement = document.createElement('pre');

        // Prints index, followed by semicolon, and the content of each line.
        if (i+1 >99)
           {
            preElement.textContent = (i + 1) + ': ' + lines[i].lineContent;
           }
        else if (i+1 >9)
           {
            preElement.textContent = (i + 1) + ' : ' + lines[i].lineContent;
           }
        else 
           {
            preElement.textContent = (i + 1) + '  : ' + lines[i].lineContent;
           }
        listItem.appendChild(preElement);
        listElement.appendChild(listItem);

        // Formats lines accordingly. If a line has a suggestion, turns the text red and lists the suggestion below it in blue.
        if (lines[i].hasSuggestion) {

            listItem.style.color = "red";
            let suggestionLine = document.createElement('li');
            let preElement = document.createElement('pre');
            preElement.textContent = '\n----- ' + lines[i].suggestions + '\n';
            suggestionLine.appendChild(preElement);
            listElement.appendChild(suggestionLine);
            suggestionLine.style.color = "#49b1fe";

        }
    }

    // Applies HTML to the page from generated HTML above.
    codeResults.innerHTML = '';
    codeResults.appendChild(listElement);

}

// Separates commented code from total code in a string of code. (Entire contents of document will be passed through as a string.)
// Returns all non-commented code in the document as a string.
function separateComments(fileContent) {

    // Array of strings created by separating code by line.
    const lines = fileContent.split('\n');
    let commentedCode = '';
    let nonCommentedCode = '';

    // Boolean keeping track of comment blocks.
    let inBlockComment = false;
  
    lines.forEach(line => {

        // Checks for block comment start.
        if (line.includes('/*')) {

            inBlockComment = true;

        }
    
        // Adds line to appropriate section.
        if (inBlockComment || line.trim().startsWith('//')) {

            commentedCode += line + '\n';

        } else {

            nonCommentedCode += line + '\n';

        }
    
        // Checks for block comment end.
        if (line.includes('*/')) {

            inBlockComment = false;

        }
    });

    return nonCommentedCode;

}

// ***** Test Methods *****


function checkSingleLetterVariables(codeString) {

    const declarationMatches = codeString.matchAll(/(int|char|float|double|bool)\s+(\w)\b/g);
    let suggestion = '';

    for (const match of declarationMatches) {

        suggestion += `Consider using a more descriptive name for variable '${match[2]}'.(GUR #1, -1 point)\n        `;
        totalGURDeduction +=1;
    }

    return suggestion;

}

function checkNonSelfDocumentingVariables(codeString) {

    const declarationMatches = codeString.matchAll(/(int|char|float|double)\s+(\w+)\b/g);
    let suggestion = '';
    const defaultNames = ['index', 'count', 'temp', 'num', 'value'];

    for (const match of declarationMatches) {

        if (defaultNames.includes(match[2])) {

            suggestion += `Consider using a more descriptive name for variable '${match[2]}'(GUR #1, -1 point)\n        `;
            totalGURDeduction+=1;
        }

        // Check if variable name is too short or too long
        else if (match[2].length < 3 || match[2].length > 20) {

            suggestion += `iammeConsider using a more descriptive name for variable '${match[2]}'(GUR #1 -1 point)\n        `;
            totalGURDeduction+=1;
        }
        
    }

    return suggestion;

}

  function checkRedundantBooleanTests(codeString) {

    let suggestion = '';

    if (codeString.includes('== true') || codeString.includes('== false')) {

        suggestion += `Consider removing the redundant '== true' or '== false' test(GUR #2, -1 point per use of this variable)\n        `;
        totalGURDeduction+=1;
    }

    return suggestion;

}

function checkOverEightyCharacters(codeString) {
     
    let suggestion = '';

    if (codeString.length > 80) {

        suggestion += "This line is over 80 characters, consider separating it to improve readability.(GUR #20, -5 points, One time deduction)\n        ";
        if (!GUR20)
           {
            totalGURDeduction+=5;
            GUR20=true;
           }
    }
    
    return suggestion;

}

function checkStateChangesInBrackets(codeString) {

    let result = '';
    let stack = [];

    for (let i = 0; i < codeString.length; i++) {

        if (codeString[i] === '(' || codeString[i] === '{' || codeString[i] === '[') {

            stack.push(i);

        } else if (codeString[i] === ')' || codeString[i] === '}' || codeString[i] === ']') {

            let start = stack.pop() + 1;
            let end = i;
            let code = codeString.slice(start, end);

            if (/\+\+|--/.test(code) && !codeString.includes("for") && !codeString.includes("while")) {

                result += 'Consider removing state change from inside brackets or function parameters. (GUR #5, -2 points)\n        ';
                totalGURDeduction +=2;
            }
        }
    }

    return result;
    
}

function checkDeclarationsInForLoops(codeString) {

    let result = '';
    let loopRegex = /for\s*\(([^;]+);([^;]+);([^)]+)\)/g;
    let match;

    while ((match = loopRegex.exec(codeString)) !== null) {

        if (match[1].includes('int') || match[1].includes('float') || match[1].includes('double')) {

            result += 'Consider declaring variables outside of loops.';
            
        }
    }

    return result;

}

function checkIncompleteForLoops(codeString) {

    let suggestion = '';
    const regex1 = /for\s*\(\s*;\s*[a-zA-Z0-9_]*\s*(<|>|<=|>=)\s*[a-zA-Z0-9_]*\s*;\s*[a-zA-Z0-9_]*\s*(\+\+|--)?\s*\)/;
    const regex2 = /for\s*\(\s*[a-zA-Z0-9_]*\s*(=|\+=|-=)\s*[a-zA-Z0-9_]*\s*;\s*;\s*[a-zA-Z0-9_]*\s*(\+\+|--)?\s*\)/;
    const regex3 = /for\s*\(\s*[a-zA-Z0-9_]*\s*(=|\+=|-=)\s*[a-zA-Z0-9_]*\s*;\s*[a-zA-Z0-9_]*\s*(<|>|<=|>=)\s*[a-zA-Z0-9_]*\s*;\s*\)/;

    if (regex1.test(codeString)) {

        suggestion = "Fix incomplete for loop.(GUR #7, -2 points)\n        ";
        totalGURDeduction+=2;

    } else if (regex2.test(codeString)) {

        suggestion = "Fix incomplete for loop.(GUR #7, -2 points)\n        ";
        totalGURDeduction+=2;

    } else if (regex3.test(codeString)) {

        suggestion = "Fix incomplete for loop.(GUR #7, -2 points)\n        ";
        totalGURDeduction+=2;

    }

    return suggestion;
    
}

function checkMisalignedBrackets(lineArray) {
    
    let indentationStack = [];
    let suggestion = '';
    
    lineArray.forEach(line => {

        if (line.lineContent.includes('{')) {

            indentationStack.push(line.lineContent.indexOf('{'));

        }
        if (line.lineContent.includes('}')) {

            if (line.lineContent.indexOf('}') !== indentationStack.pop()) {

                line.suggestions += "Misaligned curly brace detected. (GUR #2, -1 point)\n        ";
                line.hasSuggestion = true;
                totalGURDeduction+=1;
                
            }
        }
    });

    //check for missing closing brace
    if (indentationStack.length > 0)
       {
        lineArray[0].suggestions += "At least 1 missing curly brace detected. Please ensure that your code compiles before using formatter. (GUR #2, -1 point)\n        ";
                lineArray[0].hasSuggestion = true;
                totalGURDeduction+=1;
       }
}

function varDecWithinLoop(fileContents, lines)
   {
    //check for loops
    let forLoops = getControlStructureContents(fileContents, "for");

    forLoops.forEach((forLoop)=> {
        if (detectVariableDeclaration(forLoop))
           {
            lines[getLineNumber(fileContents, fileContents.indexOf(forLoop))].suggestions += "There seems to be a variable declared within this loop. Consider declaring it outside the loop.(GUR #6, -2 points per variable)\n        ";
            lines[getLineNumber(fileContents, fileContents.indexOf(forLoop))].hasSuggestion = true;
            totalGURDeduction+=2;
           }
    });

    //check while loops 
    let whileLoops =getControlStructureContents(fileContents, "while");

    whileLoops.forEach((whileLoop)=> {
        if (detectVariableDeclaration(whileLoop))
           {
            lines[getLineNumber(fileContents, fileContents.indexOf(whileLoop))].suggestions += "There seems to be a variable declared within this loop. Consider declaring it outside the loop.(GUR #6, -2 points per variable)\n        ";
            lines[getLineNumber(fileContents, fileContents.indexOf(whileLoop))].hasSuggestion = true;
            totalGURDeduction+=2;
           }
    });
   }
    

//this function searches for control structure keywords in the file and stores each instance of the structure within an index of an array. If none are found, empty array is returned.
function getControlStructureContents(fileContents, ctrlStructure)
   {
    let stack = [];
    let contents= [];
    let wkgFileContents = fileContents;
    let indexInFileContents=0;
    let indexInWkgFileContents = 0;

    while (wkgFileContents.indexOf(ctrlStructure)>=0)
       {
        indexInFileContents += wkgFileContents.indexOf(ctrlStructure);
        wkgFileContents = wkgFileContents.slice(wkgFileContents.indexOf(ctrlStructure));

        nextOpen = wkgFileContents.indexOf("{");

        if (nextOpen == -1)
           {
            return contents;
           }

        stack.push(nextOpen);

        contextString = wkgFileContents;
        indexInWkgFileContents+=nextOpen+1;
        contextString = contextString.slice(nextOpen + 1);
        
        while (stack.length > 0)
           {

            nextOpen = contextString.indexOf("{");
            nextClose = contextString.indexOf("}");

            if (nextOpen > nextClose || nextOpen ==-1 )
               {
                stack.pop();
                indexInWkgFileContents+=nextClose+1;
                contextString = contextString.slice(nextClose + 1);
               }
            else if (nextOpen >=0)
               {
                stack.push(nextOpen);
                indexInWkgFileContents+=nextOpen+1;
                contextString = contextString.slice(nextOpen + 1);
               }
           }

        contents.push(wkgFileContents.substring(0, indexInWkgFileContents));
        wkgFileContents = wkgFileContents.slice(indexInWkgFileContents);

       }
    return contents;
   }

//this function will return true if it detects the occurrence of a variable declaration keyword within the provided string. else it returns false;
function detectVariableDeclaration(string)
   {
    if (string.includes("int") || string.includes("char") || string.includes("double") || string.includes("long") || string.includes("short") || string.includes("unsigned") || string.includes("float") || string.includes("string"))
       {
        return true;
       }
    return false;
   }

//this function returns the line number that the provided index is found at within the file
function getLineNumber(fileContents, index)
   {
    return (fileContents.substring(0, index).match(/\n/g) || []).length;
   }


//GUR #9
function checkCurlyBraceOnSameLineAsCode(rawLine) 
   {
    const regex = /\S.*[{}].*/;

    rawLine = rawLine.slice(0, -1);

    let suggestion = '';

    if (regex.test(rawLine))
       {
         suggestion += 'A curly brace was detected on the same line as code. (GUR #9, -2 points)\n        ';
         totalGURDeduction+=2;
       }

    return suggestion;
   }

//GUR #12
function checkForBreakOutsideOfSwitchStatement (fileContents, lines)
   {
    //get all instances of switch statements
    let switchArray = getControlStructureContents(fileContents, "switch");
    
    console.log(switchArray);

    let lineNumModifier=0;
    
    //remove all switch statements from code
    for (i=0; i<switchArray.length; i++)
       {
        //before removal, take note of # of \n characters (needed for proper line number)
        lineNumModifier += countOccurrences(switchArray[i],'\n');

        //remove the switch statement
        fileContents = fileContents.replace(switchArray[i], '');
       }

    console.log(fileContents);
    
    //search for an occurence of break;
    while (fileContents.indexOf("break;") >= 0)
       {
        lines[getLineNumber(fileContents, fileContents.indexOf("break;")) + lineNumModifier].suggestions += "An instance of \"break\" was detected outside of a switch statement. (GUR #12, -2 points)\n        ";
        lines[getLineNumber(fileContents, fileContents.indexOf("break;")) + lineNumModifier].hasSuggestion = true;
        totalGURDeduction+=2;
        fileContents = fileContents.replace("break;", '');
       }
   }

//GUR #15
function checkForEmptyReturn (rawLine)
   {
    let suggestion = '';

    if (rawLine.indexOf("return;")>=0)
       {
        suggestion += 'An empty return statement was detected. (GUR #15, -3 points)\n        ';
        totalGURDeduction+=3;
       }

    return suggestion;
   }

//GUR 16
function checkForContinue(rawLine)
   {
    let suggestion = '';

    if (rawLine.indexOf("continue")>=0)
       {
        suggestion += 'An instance of "continue" was detected. (GUR #16, -3 points)\n        ';
        totalGURDeduction+=3;
       }

    return suggestion;
   }

//GUR 19
function checkForEmptyIfStatements(fileContents, lines)
   {
    //let regex = /(if\s*\([^{}]*\)\s*{[^{}]*})|(else\s*{[^{}]*})/g;
            //let regex = /(if|else)\s*\([^\S\n]*\)[^\S\n]*\{[^\S\n]*\}/g;
            //let regex = \{\s+\};
            const regex = /\{\s+\}/;
    //let regex = /(if|else)\s*\([^\S\r\n]*[^)]*[^\S\r\n]*\)[^\S\r\n]*{[^}\S\r\n]*}/g;

    let ifStatements = getControlStructureContents(fileContents, "if");

    let lineNum;

    for (let i =0; i< ifStatements.length; i++)
       {
        //record line number of declaration of conditional
        lineNum = getLineNumber(fileContents, fileContents.indexOf(ifStatements[i]));
        
        //cut out the declaration of conditional
        ifStatements[i] = ifStatements[i].substring(ifStatements[i].indexOf("{"));

        //check for empty code block
        if (regex.test(ifStatements[i]))
           {
            lines[lineNum].suggestions += "An empty if/else block was detected. (GUR #19, -3 points)\n        ";
            lines[lineNum].hasSuggestion = true;
            totalGURDeduction+=3;
           }
       }
   }

//count the occurrences of a char within a string
function countOccurrences (str, char) 
   {
    let count = 0;
    for (let i = 0; i < str.length; i++) 
       {
        if (str[i] === char) 
           {
            count++;
           }
      }
  return count;
}