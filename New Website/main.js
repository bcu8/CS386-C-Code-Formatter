let mainBody = document.getElementById("main-body");
let resultsBody = document.getElementById("results-body");
let preElement = document.createElement('pre');

let singleLetterVariablesResults = document.getElementById("single-letter-variables-results");
let nonSelfDocumentingVariablesResults = document.getElementById("non-self-documenting-variables-results");
let nonAlignedBracesAndBracketsResults = document.getElementById("non-aligned-braces-and-brackets-results");
let redundantBooleanTestsResults = document.getElementById("redundant-boolean-tests-results");
let codeResults = document.getElementById("code-results");
let slvCount = document.getElementById("slv-count");
let nsdvCount = document.getElementById("nsdv-count");
let nababCount = document.getElementById("nabab-count");
let rbtCount = document.getElementById("rbt-count");

function readFile(input) {
    if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const rawCode = e.target.result;
        let nonCommentedCode = separateComments(rawCode);
        runTestsAndUpdateDisplay(nonCommentedCode);
    };
    reader.readAsText(input.files[0]);
    }
}

function runTestsAndUpdateDisplay(nonCommentedCode) {
    mainBody.style.opacity = "0";
    setTimeout(function() {
        mainBody.style.display = "none";
    }, 500);
    resultsBody.style.display = "flex";

    singleLetterVariablesResults.innerHTML = checkSingleLetterVariables(nonCommentedCode);
    nonSelfDocumentingVariablesResults.innerHTML = checkNonSelfDocumentingVariables(nonCommentedCode);
    nonAlignedBracesAndBracketsResults.innerHTML = checkBraces(nonCommentedCode);
    redundantBooleanTestsResults.innerHTML = checkRedundantBooleanTests(nonCommentedCode);
    
    let slvResult = checkSingleLetterVariables(nonCommentedCode);
    if (slvResult[0] > 0) slvCount.innerHTML = slvResult[0];

    let nsdvResult = checkNonSelfDocumentingVariables(nonCommentedCode);
    if (nsdvResult[0] > 0) nsdvCount.innerHTML = nsdvResult[0];

    let nababResult = checkBraces(nonCommentedCode);
    if (nababResult[0] > 0) nababCount.innerHTML = nababResult[0];

    let rbtResult = checkRedundantBooleanTests(nonCommentedCode);
    if (rbtResult[0] > 0) rbtCount.innerHTML = rbtResult[0];

    createResultCodeList(nonCommentedCode);
    
}

function createResultCodeList(codeString) {
    let codeArray = codeString.split('\n');
    let listElement = document.createElement('ul');
    for (let i = 0; i < codeArray.length; i++) {
        let listItem = document.createElement('li');
        let preElement = document.createElement('pre');
        preElement.textContent = (i + 1) + ': ' + codeArray[i];
        listItem.appendChild(preElement);
        listElement.appendChild(listItem);
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

function checkSingleLetterVariables(nonCommentedCode) {
    const lines = nonCommentedCode.split('\n');
    let lineNumber = 1;
    let testResult = [];
    let errorCount = 0;
    let linesWithErrors = [];

    lines.forEach(line => {
        // Check for variable declarations
        const declarationMatches = line.matchAll(/(int|char|float|double|bool)\s+(\w)\b/g);
        for (const match of declarationMatches) {
            testResult.push(`Line ${lineNumber}: Consider using a more descriptive name for variable '${match[2]}'`);
            linesWithErrors.push(lineNumber);
        }
        lineNumber++;
    });

    errorCount = testResult.length;
    testResult.unshift(errorCount);

    console.log(linesWithErrors);

    return testResult;

}

function checkNonSelfDocumentingVariables(nonCommentedCode) {
    const lines = nonCommentedCode.split('\n');
    let lineNumber = 1;
    let testResult = [];
    let errorCount = 0;
    const defaultNames = ['index', 'count', 'temp', 'num', 'value'];
  
    lines.forEach(line => {
        // Check for variable declarations
        const declarationMatches = line.matchAll(/(int|char|float|double)\s+(\w+)\b/g);
        for (const match of declarationMatches) {
            // Check if variable name is a common default name
            if (defaultNames.includes(match[2])) {
                testResult.push(`Line ${lineNumber}: Consider using a more descriptive name for variable '${match[2]}'\n`);
            }
            // Check if variable name is too short or too long
            else if (match[2].length < 3 || match[2].length > 20) {
                testResult.push(`Line ${lineNumber}: Consider using a more descriptive name for variable '${match[2]}'\n`);
            }
            // Check if variable name contains only uppercase letters or only lowercase letters
            else if (match[2] === match[2].toUpperCase() || match[2] === match[2].toLowerCase()) {
                testResult.push(`Line ${lineNumber}: Consider using camelCase or snake_case for variable '${match[2]}'\n`);
            }
        }
        lineNumber++;
    });

    errorCount = testResult.length;
    testResult.unshift(errorCount);
  
    return testResult;

}

function checkBraces(nonCommentedCode) {
    let testResult = [];
    let errorCount = 0;
    let lines = nonCommentedCode.split('\n');
    let stack = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for (let j = 0; j < line.length; j++) {
            // If the current character is an opening brace or bracket, push it onto the stack along with its line number
            if (line[j] === '{' || line[j] === '[') {
                stack.push({char: line[j], line: i});
            } else if (line[j] === '}') {
                // If the current character is a closing curly brace, check if it matches with an opening curly brace on top of the stack
                if (stack.length === 0 || stack[stack.length - 1].char !== '{') {
                    testResult.push(`Line ${i + 1}: Extra closing curly brace\n`);
                } else {
                    stack.pop();
                }
            } else if (line[j] === ']') {
                if (stack.length === 0 || stack[stack.length - 1].char !== '[') {
                    testResult.push(`Line ${i + 1}: Extra closing square bracket\n`);
                } else {
                    stack.pop();
                }
            }
        }
    }
    while (stack.length > 0) {
        let item = stack.pop();
        if (item.char === '{') {
            testResult.push(`Line ${item.line + 1}: Unclosed curly brace\n`);
        } else if (item.char === '[') {
            testResult.push(`Line ${item.line + 1}: Unclosed square bracket\n`);
        }
    }

    errorCount = testResult.length;
    testResult.unshift(errorCount);

    return testResult;

}

function checkRedundantBooleanTests(nonCommentedCode) {
    const lines = nonCommentedCode.split('\n');
    let lineNumber = 1;
    let testResult = [];
    let errorCount = 0;
  
    lines.forEach(line => {
        // Check for redundant boolean tests
        if (line.includes('== true') || line.includes('== false')) {
            testResult.push(`Line ${lineNumber}: Consider removing the redundant '== true' or '== false' test\n`);
        }
        lineNumber++;
    });
    
    errorCount = testResult.length;
    testResult.unshift(errorCount);

    return testResult;

  }

