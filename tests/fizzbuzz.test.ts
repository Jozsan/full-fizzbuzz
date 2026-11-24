import { describe, it, expect } from 'vitest'
import { DEFAULT_RULES, fizzBuzz, fizzBuzzUpTo, type Rule } from '../src/fizzbuzz'
 
describe('DEFAULT_RULES', () => {
  it('contains the Fizz (3) and Buzz (5) rules', () => {
    expect(DEFAULT_RULES).toEqual([
      { divisor: 3, output: 'Fizz' },
      { divisor: 5, output: 'Buzz' },
    ])
  })
})
 
describe('fizzBuzz', () => {
  describe('with the default rules', () => {
    it.each([
      [1, '1'],
      [2, '2'],
      [4, '4'],
      [7, '7'],
      [14, '14'],
    ])('returns the number itself for %i', (input, expected) => {
      expect(fizzBuzz(input)).toBe(expected)
    })
 
    it.each([3, 6, 9, 12, 18])('returns "Fizz" for %i', (input) => {
      expect(fizzBuzz(input)).toBe('Fizz')
    })
 
    it.each([5, 10, 20, 25])('returns "Buzz" for %i', (input) => {
      expect(fizzBuzz(input)).toBe('Buzz')
    })
 
    it.each([15, 30, 45, 90])('returns "FizzBuzz" for %i', (input) => {
      expect(fizzBuzz(input)).toBe('FizzBuzz')
    })
  })
 
  describe('with custom rules', () => {
    it('applies a single rule', () => {
      const rules: Rule[] = [{ divisor: 7, output: 'Bazz' }]
 
      expect(fizzBuzz(14, rules)).toBe('Bazz')
      expect(fizzBuzz(8, rules)).toBe('8')
    })
 
    it('concatenates outputs in the order of the rules', () => {
      const rules: Rule[] = [
        { divisor: 5, output: 'Buzz' },
        { divisor: 3, output: 'Fizz' },
      ]
 
      expect(fizzBuzz(15, rules)).toBe('BuzzFizz')
    })
 
    it('supports more than two rules', () => {
      const rules: Rule[] = [...DEFAULT_RULES, { divisor: 7, output: 'Bazz' }]
 
      expect(fizzBuzz(105, rules)).toBe('FizzBuzzBazz')
      expect(fizzBuzz(21, rules)).toBe('FizzBazz')
    })
 
    it('returns the number when the rules list is empty', () => {
      expect(fizzBuzz(15, [])).toBe('15')
    })
  })
 
})
 
describe('fizzBuzzUpTo', () => {
  it('generates the classic sequence up to 15', () => {
    expect(fizzBuzzUpTo(15)).toBe(
      '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz',
    )
  })
 
  it('returns "1" for a limit of 1', () => {
    expect(fizzBuzzUpTo(1)).toBe('1')
  })
 
  it('returns an empty string for a limit of 0', () => {
    expect(fizzBuzzUpTo(0)).toBe('')
  })
 
  it('contains as many items as the limit', () => {
    expect(fizzBuzzUpTo(100).split(',')).toHaveLength(100)
  })
 
  it('applies custom rules', () => {
    const rules: Rule[] = [{ divisor: 2, output: 'Even' }]
 
    expect(fizzBuzzUpTo(4, rules)).toBe('1,Even,3,Even')
  })
 
  it('throws if a divisor is 0', () => {
    expect(() => fizzBuzzUpTo(10, [{ divisor: 0, output: 'Zero' }])).toThrow(
      'Divisor cannot be zero',
    )
  })
})