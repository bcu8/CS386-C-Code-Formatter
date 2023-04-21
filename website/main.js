
// Connect HTML elements to JavaScript variables.
let codeResults = document.getElementById("code-results");

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

    // Prints lines array to console for testing.
    console.log(lines);

    // Returns the lines array.
    return lines;

}

// Takes in a string of code and runs all single line tests on the code, returning a String of suggestions outputted by the tests.
function runSingleLineTests(rawLine) {
    
    // Stores string of suggestions.
    let results = '';

    // Runs each test and adds test results to results variable.
    results += checkSingleLetterVariables(rawLine);
    results += checkNonSelfDocumentingVariables(rawLine);
    results += checkRedundantBooleanTests(rawLine);
    results += checkOverEightyCharacters(rawLine);
    results += checkStateChangesInBrackets(rawLine);
    results += checkDeclarationsInForLoops(rawLine);
    results += checkIncompleteForLoops(rawLine);

    return results;

}

// Prints lines to the page, injects suggestions into code, and formats accordingly.
function printLinesToScreen(lines) {

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
        preElement.textContent = (i + 1) + ': ' + lines[i].lineContent;
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

        suggestion += `Consider using a more descriptive name for variable '${match[2]}'. `;

    }

    return suggestion;

}

function checkNonSelfDocumentingVariables(codeString) {

    const declarationMatches = codeString.matchAll(/(int|char|float|double)\s+(\w+)\b/g);
    let suggestion = '';
    const defaultNames = ['index', 'count', 'temp', 'num', 'value'];

    for (const match of declarationMatches) {

        if (defaultNames.includes(match[2])) {

            suggestion += `Consider using a more descriptive name for variable '${match[2]}'\n`;

        }

        // Check if variable name is too short or too long
        else if (match[2].length < 3 || match[2].length > 20) {

            suggestion += `Consider using a more descriptive name for variable '${match[2]}'\n`;

        }
        
    }

    return suggestion;

}

  function checkRedundantBooleanTests(codeString) {

    let suggestion = '';

    if (codeString.includes('== true') || codeString.includes('== false')) {

        suggestion += `Consider removing the redundant '== true' or '== false' test\n`;

    }

    return suggestion;

}

function checkOverEightyCharacters(codeString) {
     
    let suggestion = '';

    if (codeString.length > 80) {

        suggestion += "This line is over 80 characters, consider separating it to improve readability.";

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

            if (/\+\+|--/.test(code)) {

                result += 'Consider removing state change from inside brackets or function parameters.';
                
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

        suggestion = "Fix incomplete for loop.";

    } else if (regex2.test(codeString)) {

        suggestion = "Fix incomplete for loop.";

    } else if (regex3.test(codeString)) {

        suggestion = "Fix incomplete for loop.";

    }

    return suggestion;
    
}

function checkMisalignedBrackets(lineArray) {
    
    let indentationStack = [];
    let suggestion = '';
    
    lineArray.forEach(line => {

        if (line.lineContent.includes('{')) {

            indentationStack.push(line.tabCount);

        } else if (line.lineContent.includes('}')) {

            if (line.tabCount !== indentationStack.pop()) {

                line.suggestions += "Fix Indentation";
                line.hasSuggestion = true;
                
            }
        }
    });
}

