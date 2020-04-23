import { LogFormatter, roundedLabelFormatter } from './formatters'
import { stringMatchesRules } from './stringMatchesRules'
import { createDomLogger } from './domLogger'
export interface LoggerFunction {
  (...args: any[]): void
}
export interface LoggerOptions {
  formatter: LogFormatter
  output: 'console' | 'dom'
  domElement?: HTMLElement
}

const defaults: LoggerOptions = {
  formatter: roundedLabelFormatter,
  output: 'console',
}

export const createLoggerFactory = (options: Partial<LoggerOptions> = {}) => (
  prefix: string,
) => createLogger(prefix, options)
export function createLogger(
  prefix: string,
  options: Partial<LoggerOptions> = {},
) {
  const { formatter, output }: LoggerOptions = {
    ...defaults,
    ...options,
  }
  const rules = window.localStorage.getItem('debug') || ''
  if (!stringMatchesRules(prefix, rules)) {
    return () => {
      // Does nothing
    }
  }
  if (output === 'console') {
    return Function.prototype.bind.call(
      window.console.log,
      window.console,
      ...formatter(prefix),
    )
  }
  if (output === 'dom') {
    const domLogger = createDomLogger(options.domElement)
    return domLogger.bind(null, ...formatter(prefix))
  }
}
