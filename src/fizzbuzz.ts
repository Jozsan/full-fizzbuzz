export interface Rule {
  divisor: number
  output: string
}

export const DEFAULT_RULES: Rule[] = [
  { divisor: 3, output: 'Fizz' },
  { divisor: 5, output: 'Buzz' },
]

function areValidRules(rules: Rule[]): boolean {
  return !rules.some((rule) => rule.divisor === 0)
}

function computeFizzBuzz(number: number, rules: Rule[]): string {
  const words = rules
    .filter((rule) => number % rule.divisor === 0)
    .map((rule) => rule.output)

  return words.length > 0 ? words.join('') : String(number)
}

export function fizzBuzz(number: number, rules: Rule[] = DEFAULT_RULES): string {
  if (!areValidRules(rules)) throw new Error('Divisor cannot be zero')

  return computeFizzBuzz(number, rules)
}

export function fizzBuzzUpTo(limit: number, rules: Rule[] = DEFAULT_RULES): string {
  if (!areValidRules(rules)) throw new Error('Divisor cannot be zero')

  const results: string[] = []

  for (let i = 1; i <= limit; i++) {
    results.push(computeFizzBuzz(i, rules))
  }

  return results.join(',')
}