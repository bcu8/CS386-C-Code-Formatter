

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

module.exports = {
    checkSingleLetterVariables,
    checkNonSelfDocumentingVariables,
    checkRedundantBooleanTests
};

