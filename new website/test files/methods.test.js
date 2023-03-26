const { checkSingleLetterVariables, checkNonSelfDocumentingVariables, checkRedundantBooleanTests } = require('./testMethods');

describe('checkSingleLetterVariables', () => {
    test('should suggest more descriptive names for single-letter variables', () => {
        const codeString = 'int x = 5; char y = "a";';
        const result = checkSingleLetterVariables(codeString);
        expect(result).toBe("Consider using a more descriptive name for variable 'x'. Consider using a more descriptive name for variable 'y'. ");
    });

    test('should not suggest more descriptive names for multi-letter variables', () => {
        const codeString = 'int num = 5; char letter = "a";';
        const result = checkSingleLetterVariables(codeString);
        expect(result).toBe('');
    });
});

describe('checkNonSelfDocumentingVariables', () => {
    test('should suggest more descriptive names for default-named variables', () => {
        const codeString = 'int index = 5; char temp = "a";';
        const result = checkNonSelfDocumentingVariables(codeString);
        expect(result).toBe("Consider using a more descriptive name for variable 'index'\nConsider using a more descriptive name for variable 'temp'\n");
    });

    test('should suggest more descriptive names for too short or too long variables', () => {
        const codeString = 'int x = 5; char longVariableName = "a";';
        const result = checkNonSelfDocumentingVariables(codeString);
        expect(result).toBe("Consider using a more descriptive name for variable 'x'\nConsider using a more descriptive name for variable 'longVariableName'\n");
    });

    test('should suggest camelCase or snake_case for variables with only uppercase or only lowercase letters', () => {
        const codeString = 'int ALLCAPS = 5; char lowercase = "a";';
        const result = checkNonSelfDocumentingVariables(codeString);
        expect(result).toBe("Consider using camelCase or snake_case for variable 'ALLCAPS'\nConsider using camelCase or snake_case for variable 'lowercase'\n");
    });
});

describe('checkRedundantBooleanTests', () => {
    test('should suggest removing redundant boolean tests', () => {
        const codeString = 'if (x == true) { y = 5; }';
        const result = checkRedundantBooleanTests(codeString);
        expect(result).toBe("Consider removing the redundant '== true' or '== false' test\n");
    });

    test('should not suggest removing non-redundant boolean tests', () => {
        const codeString = 'if (x) { y = 5; }';
        const result = checkRedundantBooleanTests(codeString);
        expect(result).toBe('');
    });
});

