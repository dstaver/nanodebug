import { selectPrefixColor } from './color'

export interface LogFormatter {
  (prefix: string): string[]
}

export const roundedLabelFormatter: LogFormatter = prefix => {
  const prefixColor = selectPrefixColor(prefix)
  return [
    `%c${prefix}%c`,
    `color:${prefixColor};background:rgba(0,0,0,0.5);padding:4px 8px;border-radius:6px`,
    'font-size:unset;color:unset;background:unset;padding:unset;border-radius:unset',
  ]
}
export const debugFormatter: LogFormatter = prefix => {
  const prefixColor = selectPrefixColor(prefix)
  return [
    `%c[${prefix}]%c`,
    `color:${prefixColor};`,
    'font-size:unset;color:unset;',
  ]
}
