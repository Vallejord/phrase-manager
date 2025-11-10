import { describe, it, expect } from 'vitest';
import { escapeRegExp } from './searchHelpers';

describe('escapeRegExp', () => {
  it('should return the same string if no special characters', () => {
    expect(escapeRegExp('hello')).toBe('hello');
    expect(escapeRegExp('test123')).toBe('test123');
    expect(escapeRegExp('HelloWorld')).toBe('HelloWorld');
  });

  it('should escape dot character', () => {
    expect(escapeRegExp('test.')).toBe('test\\.');
    expect(escapeRegExp('3.14')).toBe('3\\.14');
  });

  it('should escape asterisk character', () => {
    expect(escapeRegExp('a*b')).toBe('a\\*b');
    expect(escapeRegExp('***')).toBe('\\*\\*\\*');
  });

  it('should escape plus character', () => {
    expect(escapeRegExp('a+b')).toBe('a\\+b');
    expect(escapeRegExp('C++')).toBe('C\\+\\+');
  });

  it('should escape question mark', () => {
    expect(escapeRegExp('a?b')).toBe('a\\?b');
    expect(escapeRegExp('what?')).toBe('what\\?');
  });

  it('should escape parentheses', () => {
    expect(escapeRegExp('(test)')).toBe('\\(test\\)');
    expect(escapeRegExp('func()')).toBe('func\\(\\)');
  });

  it('should escape brackets', () => {
    expect(escapeRegExp('[value]')).toBe('\\[value\\]');
    expect(escapeRegExp('array[0]')).toBe('array\\[0\\]');
  });

  it('should escape curly braces', () => {
    expect(escapeRegExp('{key}')).toBe('\\{key\\}');
    expect(escapeRegExp('a{2,3}')).toBe('a\\{2,3\\}');
  });

  it('should escape caret and dollar signs', () => {
    expect(escapeRegExp('^start')).toBe('\\^start');
    expect(escapeRegExp('end$')).toBe('end\\$');
    expect(escapeRegExp('$100')).toBe('\\$100');
  });

  it('should escape pipe character', () => {
    expect(escapeRegExp('a|b')).toBe('a\\|b');
  });

  it('should escape backslash', () => {
    expect(escapeRegExp('path\\to\\file')).toBe('path\\\\to\\\\file');
  });

  it('should escape multiple special characters in one string', () => {
    expect(escapeRegExp('price: $10.99 (sale!)')).toBe('price: \\$10\\.99 \\(sale!\\)');
    expect(escapeRegExp('regex: ^test.*$')).toBe('regex: \\^test\\.\\*\\$');
  });

  it('should handle empty string', () => {
    expect(escapeRegExp('')).toBe('');
  });

  it('should handle string with spaces', () => {
    expect(escapeRegExp('hello world')).toBe('hello world');
    expect(escapeRegExp('test (hello)')).toBe('test \\(hello\\)');
  });

  it('should work correctly with RegExp constructor', () => {
    // Verificar que los strings escapados funcionan correctamente en RegExp
    const testCases = [
      { input: 'test.', text: 'test.com', shouldMatch: true },
      { input: 'test.', text: 'testa', shouldMatch: false },
      { input: '(hello)', text: '(hello) world', shouldMatch: true },
      { input: '(hello)', text: 'hello world', shouldMatch: false },
      { input: '$10', text: 'price $10', shouldMatch: true },
      { input: '$10', text: 'price 10', shouldMatch: false },
    ];

    testCases.forEach(({ input, text, shouldMatch }) => {
      const escaped = escapeRegExp(input);
      const regex = new RegExp(escaped, 'i');
      expect(regex.test(text)).toBe(shouldMatch);
    });
  });
});


