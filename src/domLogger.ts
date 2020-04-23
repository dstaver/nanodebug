import { domConsoleArgsFormat } from './domConsoleArgsFormat'

export type DomLogger = (...args: any[]) => void

export function createDomLogger(el?: HTMLElement): DomLogger {
  const logEl = el || document.createElement('div')
  if (!logEl.id) {
    logEl.id = 'dom-logger'
  }
  if (!el) {
    document.body.appendChild(logEl)
  }
  return (...args: any[]) => {
    const msgEl = document.createElement('div')
    const msg = domConsoleArgsFormat(...args)
    msgEl.innerHTML = msg
    logEl.appendChild(msgEl)
  }
}
