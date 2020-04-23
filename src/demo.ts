import { debugFormatter } from './formatters'
import { createLogger } from './logger'

localStorage.debug = 'test*,dom*'
const log = createLogger('test', {
  formatter: debugFormatter,
})
log('Log message from test.ts')

const logEl = document.getElementById('log')
if (logEl) {
  const domLog = createLogger('dom', {
    formatter: debugFormatter,
    output: 'dom',
    domElement: logEl,
  })
  domLog('Dom log message from test.ts')
}
