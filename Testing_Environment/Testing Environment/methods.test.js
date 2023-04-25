const { checkSingleLetterVariables, checkNonSelfDocumentingVariables, checkRedundantBooleanTests, checkOverEightyCharacters, checkStateChangesInBrackets, checkDeclarationsInForLoops, checkIncompleteForLoops } = require('./testMethods');

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
        const codeString = 'int x = 5; char longVariableNameTwentyOrAbove = "a";';
        const result = checkNonSelfDocumentingVariables(codeString);
        expect(result).toBe("Consider using a more descriptive name for variable 'x'\nConsider using a more descriptive name for variable 'longVariableNameTwentyOrAbove'\n");
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

describe('checkOverEightyCharacters', () => {
    test('Should suggest shortening line of code if over 80 characters', () => {
        const codeString = 'if (veryLongVariableThatIsWayTooLongAndDumb > anotherVeryLongVariableThatIsWayTooLongAndDumb) {veryLongVariableThatIsWayTooLongAndDumb = anotherVeryLongVariableThatIsWayTooLongAndDumb}';
        const result = checkOverEightyCharacters(codeString);
        expect(result).toBe('This line is over 80 characters, consider separating it to improve readability.');
    });

    test('Should not suggest shortening line of code if under 80 characters', () => {
        const codeString = 'if (x > y) {x = y}';
        const result = checkOverEightyCharacters(codeString);
        expect(result).toBe('');
    });
});

describe('checkStateChangesInBrackets', () => {
    test('Should suggest removing state change if in brackets and uses ++ or --.', () => {
        expect(checkStateChangesInBrackets('value = array[ index++ ]')).toBe('Consider removing state change from inside brackets or function parameters.');
    });

    test('Should not suggest removing state change if out of brackets or uses + 1 form.', () => {
        expect(checkStateChangesInBrackets('array[ index + 1 ]; index++;')).toBe('');
    });
});

describe('checkDeclarationsInForLoops', () => {
    test('Should suggest if variable declaration is inside loop', () => {
        expect(checkDeclarationsInForLoops('for (int i = 0; i < 10; i++) {}')).toBe('Consider declaring variables outside of loops.');
    });

    test('Should not suggest if variable declaration is outside loop', () => {
        expect(checkDeclarationsInForLoops('int i; for (i = 0; i < 10; i++) {}')).toBe('');
    });
});

describe("checkIncompleteForLoops function", () => {
    test("returns 'Fix incomplete for loop.' when given an incomplete for loop, index declaration", () => {
      const codeString = "for( ; index < 5; index++)";
      expect(checkIncompleteForLoops(codeString)).toBe("Fix incomplete for loop.");
    });

    test("returns 'Fix incomplete for loop.' when given an incomplete for loop, condition", () => {
        const codeString = "for(i = 0; ; index++)";
        expect(checkIncompleteForLoops(codeString)).toBe("Fix incomplete for loop.");
    });

    test("returns 'Fix incomplete for loop.' when given an incomplete for loop, increment", () => {
        const codeString = "for(i = 0; index < 5; )";
        expect(checkIncompleteForLoops(codeString)).toBe("Fix incomplete for loop.");
    });
  
    test("returns an empty string when given a complete for loop", () => {
      const codeString = "for (i = 0; i < 10; i++)";
      expect(checkIncompleteForLoops(codeString)).toBe("");
    });
  
    test("returns an empty string when given a non-for loop", () => {
      const codeString = "while (x < 10) { x++; }";
      expect(checkIncompleteForLoops(codeString)).toBe("");
    });
  });
  



