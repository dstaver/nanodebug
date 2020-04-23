import { createDomLogger } from './domLogger'

let log: ReturnType<typeof createDomLogger>

beforeAll(() => {
  log = createDomLogger()
})

it('logs message', () => {
  const expected = 'test'
  log(expected)
  const actual = document.querySelector('#dom-logger > :last-child')
    ?.textContent
  expect(actual).toBe(expected)
})
