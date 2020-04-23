export function domConsoleArgsFormat(first?: any, ...args: any[]): string {
  if (typeof first === 'string' && first.length) {
    let offset = 0
    let styled = 0
    const msg = `${first.replace(/\%[sdifoOc]{1}/g, match => {
      const value = args[offset]
      offset++
      switch (match) {
        case '%c':
          styled++
          return `${styled > 1 ? '</span>' : ''}<span style="${value}">`
        case '%d':
          return String(parseInt(value, 10))
        case '%i':
          return String(parseInt(value, 10))
        case '%f':
          return String(parseFloat(value))
        case '%s':
          return String(value)
        case '%o':
          return JSON.stringify(value)
        case '%O':
          return JSON.stringify(value)
        default:
          return String(value)
      }
    })}`
    const remaining = args.slice(offset)
    const space = remaining.length ? ' ' : ''
    const closeStyleTag = styled ? '</span>' : ''
    return `${msg}${closeStyleTag}${space}${remaining.join(' ')}`
  }
  const msg = [first, ...args].join(' ')
  return msg
}
