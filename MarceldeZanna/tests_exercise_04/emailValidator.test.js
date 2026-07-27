const { validateEmail } = require('./emailValidator');

// These tests are all happy path - no edge cases!
// Your task: Add at least 10 edge case tests.

describe('validateEmail - Happy Path', () => {
  test('should accept valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  test('should accept email with subdomain', () => {
    expect(validateEmail('user@mail.example.com')).toBe(true);
  });

  test('should accept email with numbers', () => {
    expect(validateEmail('user123@example.com')).toBe(true);
  });
});

describe('validateEmail - Boundary Cases', () => {
  test('should accept minimum length email', () => {
    expect(validateEmail('a@b.c')).toBe(true);
  });

  test('should reject email that is too short', () => {
    expect(() => validateEmail('a@b')).toThrow('Invalid email format');
  });

  test('should reject email that is too long', () => {
    function repeatLetter(letter, count) {
      return letter.repeat(count);
    };
    expect(() => validateEmail(`${repeatLetter('a', 255)}@b.c`)).toThrow('Invalid email is too long')
  });
});

describe('validateEmail - Null/Undefined/EmptyCase', () => {
  test('should not accept NULL', () => {
    expect(() => validateEmail(null)).toThrow('Email is required')
  });

  test('should not be undefined', () => {
    expect(() => validateEmail(undefined)).toThrow('Email is required')
  });

  test('should not be empty string', () => {
    expect(() => validateEmail('')).toThrow('Email is required')
  });

  test('should reject whitespace-only string', () => {
    expect(() => validateEmail('   ')).toThrow('Email is required')
  });
});

describe('validateEmail - Invalid Format Cases', () => {
  test('should contain one @', () => {
    expect(() => validateEmail('ab.c')).toThrow('Email must contain @')
  });

  test('should not contain more than one @', () => {
    expect(() => validateEmail('a@b@.c')).toThrow('Email must contain @')
  });

  test('should not allow consecutive dots after @', () => {
    expect(() => validateEmail('user@domain..com')).toThrow('Please enter a valid email address');
  });
});

describe('validateEmail - Special Characters', () => {
  test('should accept plus sign in local part', () => {
    expect(validateEmail('user+tag@example.com')).toBe(true);
  });

  test('should accept underscore in local part', () => {
    expect(validateEmail('user_name@example.com')).toBe(true);
  });

  test('should reject spaces inside the email', () => {
    expect(() => validateEmail('user @example.com')).toThrow('Please enter a valid email address');
  });

  test('should reject invalid special characters', () => {
    expect(() => validateEmail('user,example@example.com')).toThrow('Please enter a valid email address');
  });

  test('should reject leading dot in local part', () => {
    expect(() => validateEmail('.user@example.com')).toThrow('Please enter a valid email address');
  });
});

// TODO: Add your edge case tests here!
//
// Use the checklists from the article:
// 1. Boundary Cases (very short/long emails)
// 2. Null/Undefined/Empty Cases
// 3. Invalid Format Cases (no @, multiple @, etc.)
// 4. Special Characters
//
// Example:
// describe('validateEmail - Boundary Cases', () => {
//   test('should accept minimum length email', () => {
//     expect(validateEmail('a@b.c')).toBe(true);
//   });
//
//   test('should reject email that is too short', () => {
//     expect(() => validateEmail('a@b')).toThrow('Invalid email format');
//   });
// });
