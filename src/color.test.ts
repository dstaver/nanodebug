import { selectPrefixColor } from './color'

it('Returns same color for same prefix', () => {
  const a1 = selectPrefixColor('a')
  selectPrefixColor('b')
  selectPrefixColor('c')
  selectPrefixColor('d')
  const a2 = selectPrefixColor('a')
  expect(a1).toBe(a2)
})
it('Returns unique colors for 100 unique prefixes', () => {
  const expected = 100
  const prefixes = new Array(expected)
    .fill('a')
    .map(() => selectPrefixColor(String(Math.random())))
  // Remove duplicates
  const actual = Array.from(new Set(prefixes)).length
  expect(actual).toBe(expected)
})
