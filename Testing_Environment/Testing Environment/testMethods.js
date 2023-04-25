


Array.prototype.peek = function() {
    return this[this.length - 1];
};

class Line {
    constructor(lineNumber, lineContent, suggestions, tabCount) {
      this.lineNumber = lineNumber;
      this.lineContent = lineContent;
      this.suggestions = suggestions;
      this.tabCount = 0;
  
      this.tabCount = this.getNumTabs(this.lineContent);
      this.hasSuggestion = this.suggestions.length > 0;
    }
  
    getNumTabs(lineContent) {
      let tabCount = 0;
      for (let i = 0; i < lineContent.length; i++) {
        if (lineContent[i] === '\t') {
          tabCount++;
        } else if (lineContent[i] === '{' || lineContent[i] === '}') {
            break;
        }
      }
      return tabCount;
    }
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

function checkMisalignedBrackets(lineArray) {
    let indentationStack = [];
    
    lineArray.forEach(line => {

        if (line.lineContent.includes('{')) {

            indentationStack.push(line.tabCount);

        } else if (line.lineContent.includes('}')) {

            if (line.tabCount !== indentationStack.pop()) {

                console.log(line.lineNumber + 1);
                
            }
        }
    });
}

function checkIncompleteForLoops(codeString) {
    let suggestion = '';
    const regex1 = /for\s*\(\s*;\s*[a-zA-Z0-9_]*\s*(<|>|<=|>=)\s*[a-zA-Z0-9_]*\s*;\s*[a-zA-Z0-9_]*\s*(\+\+|--)?\s*\)/;
    const regex2 = /for\s*\(\s*[a-zA-Z0-9_]*\s*(=|\+=|-=)\s*[a-zA-Z0-9_]*\s*;\s*;\s*[a-zA-Z0-9_]*\s*(\+\+|--)?\s*\)/;
    const regex3 = /for\s*\(\s*[a-zA-Z0-9_]*\s*(=|\+=|-=)\s*[a-zA-Z0-9_]*\s*;\s*[a-zA-Z0-9_]*\s*(<|>|<=|>=)\s*[a-zA-Z0-9_]*\s*;\s*\)/;

    if (regex1.test(codeString)) {
        suggestion = " Fix incomplete for loop.";
    } else if (regex2.test(codeString)) {
        suggestion = " Fix incomplete for loop.";
    } else if (regex3.test(codeString)) {
        suggestion = " Fix incomplete for loop.";
    }

    return suggestion;
    
}

module.exports = {
    checkSingleLetterVariables,
    checkNonSelfDocumentingVariables,
    checkRedundantBooleanTests,
    checkOverEightyCharacters,
    checkStateChangesInBrackets,
    checkDeclarationsInForLoops,
    checkMisalignedBrackets,
    checkIncompleteForLoops
};

