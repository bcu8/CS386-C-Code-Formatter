let mainBody = document.getElementById("main-body");
let resultsBody = document.getElementById("results-container");
let preElement = document.createElement('pre');

let singleLetterVariablesResults = document.getElementById("single-letter-variables-results");
let nonSelfDocumentingVariablesResults = document.getElementById("non-self-documenting-variables-results");
let redundantBooleanTestsResults = document.getElementById("redundant-boolean-tests-results");
let codeResults = document.getElementById("code-results");

class Line {
    constructor(lineNumber, lineContent, suggestions) {
      this.lineNumber = lineNumber;
      this.lineContent = lineContent;
      this.suggestions = suggestions;
      this.hasSuggestion = suggestions.length > 0;
    }
}

function readFile(input) {
    if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const rawCode = e.target.result;

        let nonCommentedCode = separateComments(rawCode);
        let testedLines = runTestsAndFillLines(nonCommentedCode);
        printLinesToScreen(testedLines);

        mainBody.style.opacity = "0";
        setTimeout(function() {
        mainBody.style.display = "none";
        resultsBody.style.display = "block";
        }, 500);
        
    };
    reader.readAsText(input.files[0]);
    }
}

function runTestsAndFillLines(nonCommentedCode) {
    const lines = [];
    let codeArray = nonCommentedCode.split('\n');

    codeArray.forEach((rawLine, index) => {
        lines.push(new Line(index, rawLine, checkSingleLetterVariables(rawLine) + checkNonSelfDocumentingVariables(rawLine) + checkRedundantBooleanTests(rawLine)));
    });

    console.log(lines);
    return lines;

}

function printLinesToScreen(lines) {
    let listElement = document.createElement('ul');
    for (let i = 0; i < lines.length; i++) {
        let listItem = document.createElement('li');
        listItem.id = 'line-' + (i + 1);
        let preElement = document.createElement('pre');
        preElement.textContent = (i + 1) + ': ' + lines[i].lineContent;
        listItem.appendChild(preElement);
        listElement.appendChild(listItem);

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
    codeResults.innerHTML = '';
    codeResults.appendChild(listElement);
}

function separateComments(fileContent) {
    const lines = fileContent.split('\n');
    let commentedCode = '';
    let nonCommentedCode = '';
    let inBlockComment = false;
  
    lines.forEach(line => {
    // Check for block comment start
        if (line.includes('/*')) {
            inBlockComment = true;
        }
    
        // Add line to appropriate section
        if (inBlockComment || line.trim().startsWith('//')) {
            commentedCode += line + '\n';
        } else {
            nonCommentedCode += line + '\n';
        }
    
        // Check for block comment end
        if (line.includes('*/')) {
            inBlockComment = false;
        }
    });

    return nonCommentedCode;

}

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
        // Check if variable name contains only uppercase letters or only lowercase letters
        else if (match[2] === match[2].toUpperCase() || match[2] === match[2].toLowerCase()) {
            suggestion += `Consider using camelCase or snake_case for variable '${match[2]}'\n`;
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

