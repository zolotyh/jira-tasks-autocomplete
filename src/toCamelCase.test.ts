import { toCamelCase } from './toCamelCase';

describe('toCamelCase', () => {
  test('simple test cases from config', () => {
    expect(toCamelCase('HELLO_WORLD')).toEqual('helloWorld');
    expect(toCamelCase('HELLO')).toEqual('hello');
  });
});
