/**
 * Email Validator - Basic Implementation
 *
 * This implementation works for normal emails,
 * but has gaps for edge cases. Your task is to
 * add tests that reveal these gaps.
 */

function validateEmail(email) {
  // Basic validation - works for happy path, but has many gaps!
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }

  const trimmed = email.trim();

  if (trimmed === '') {
    throw new Error('Email is required');
  }

  if (!trimmed.includes('@')) {
    throw new Error('Email must contain @');
  }

  return true;
}

module.exports = { validateEmail };
