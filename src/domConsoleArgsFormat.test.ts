import { domConsoleArgsFormat as d } from './domConsoleArgsFormat'

it('converts %s to string', () => {
  const actual = d('*%s*', 'test')
  const expected = '*test*'
  expect(actual).toBe(expected)
})

it('converts %o and %O to stringified object', () => {
  ;['%o', '%O'].forEach(input => {
    const actual = d(input, { key: 'value' })
    const expected = '{"key":"value"}'
    expect(actual).toBe(expected)
  })
})

it('converts %c to styles', () => {
  const actual = d('*%c%s%c*', 'color:red', 'test', 'color:blue', 'not styled')
  const expected =
    '*<span style="color:red">test</span><span style="color:blue">*</span> not styled'
  expect(actual).toBe(expected)
})

it('converts %i to number', () => {
  expect(d('%i', 'aaa')).toBe('NaN')
  expect(d('%i', '010')).toBe('10')
  expect(d('%i', {})).toBe('NaN')
  expect(d('%i', 10.999)).toBe('10')
  expect(d('%i', 10.123)).toBe('10')
  expect(d('%i', 10)).toBe('10')
  expect(d('%i', 0o10)).toBe('8')
})

it('converts %f to float', () => {
  expect(d('%f', 'aaa')).toBe('NaN')
  expect(d('%f', '010')).toBe('10')
  expect(d('%f', {})).toBe('NaN')
  expect(d('%f', 10.999)).toBe('10.999')
  expect(d('%f', 10.123)).toBe('10.123')
  expect(d('%f', 10)).toBe('10')
  expect(d('%f', 0o10)).toBe('8')
})

it('adds remaining args', () => {
  const actual = d('*%s*', 1, 2, 3, 4, 5)
  const expected = '*1* 2 3 4 5'
  expect(actual).toBe(expected)
})
