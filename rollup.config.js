import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import browsersync from 'rollup-plugin-browsersync'

const watch = process.env.ROLLUP_WATCH
const production = process.env.NODE_ENV === 'production'
export default {
  input: [watch ? 'src/demo.ts' : 'src/index.ts'],
  output: {
    dir: 'dist',
    format: watch ? 'iife' : 'es',
    name: 'nanodebug',
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
    watch &&
      browsersync({
        server: 'dist',
        serveStatic: ['public'],
      }),
    production && terser(),
  ],
}
