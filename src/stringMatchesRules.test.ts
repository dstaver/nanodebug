import { stringMatchesRules } from './stringMatchesRules'

it('Returns false when rule is and empty string', () => {
  expect(stringMatchesRules('test', '')).toBe(false)
})
it('Matches when rule equals string', () => {
  expect(stringMatchesRules('test', 'test')).toBe(true)
})
it('Last rule overrides previous rules', () => {
  expect(stringMatchesRules('test', 'test,-test')).toBe(false)
  expect(stringMatchesRules('test', 'test,-test,te*')).toBe(true)
  expect(stringMatchesRules('test', 'test,-test,te*,-test')).toBe(false)
  expect(stringMatchesRules('test', '-test,test')).toBe(true)
})
it('Matches wildcard rule', () => {
  expect(stringMatchesRules('test', 't*')).toBe(true)
  expect(stringMatchesRules('test', 'te*')).toBe(true)
  expect(stringMatchesRules('test', 'test*')).toBe(true)
})
it('Does not match negated wildcard rule', () => {
  expect(stringMatchesRules('test', '-t*')).toBe(false)
  expect(stringMatchesRules('test', '-te*')).toBe(false)
  expect(stringMatchesRules('test', '-test*')).toBe(false)
})
it('Wildcard not allowed in middle of rule', () => {
  expect(stringMatchesRules('test', 't*st*')).toBe(false)
})
it('Returns false on matching negated wildcard rule', () => {
  expect(stringMatchesRules('test', '-t*')).toBe(false)
  expect(stringMatchesRules('test', '-te*')).toBe(false)
  expect(stringMatchesRules('test', 'a,b,c,-test*,d,e,f')).toBe(false)
})
it('Returns false on matching negated single rule', () => {
  expect(stringMatchesRules('test', '-test')).toBe(false)
})
it('Returns true on matching one of multiple rules', () => {
  expect(stringMatchesRules('test', 'a,b,c,d,test,e,f,g')).toBe(true)
})
