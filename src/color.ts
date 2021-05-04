export type HslArray = [number, number, number]
const prefixes: {
  [key: string]: string
} = {}

/**
 * Select a unique color for a prefix
 * The prefix is stored and reused if requested again
 *
 * @param {string} prefix Prefix to create color for
 * @return {string} HSL color string
 */
export function selectPrefixColor(prefix: string): string {
  if (prefixes[prefix]) {
    return prefixes[prefix]
  }
  const index = Object.keys(prefixes).length
  const increment = 24
  const row = Math.floor((index * increment) / 255)
  const alt = index % 2 ? 0 : 128
  const h = index * increment + row * 4 + alt
  const s = 100
  const l = 70
  prefixes[prefix] = hslStr([h, s, l])
  return prefixes[prefix]
}

/**
 * Convert HSL array to hsl() string usable as a CSS color value
 * @param {array} hslArray [H, S, L] Color array
 * @returns {string} hsl() string
 */
export function hslStr(hslArray: HslArray): string {
  return `hsl(${hslArray[0]},${hslArray[1]}%,${hslArray[2]}%)`
}

/**
 * Create a light background color from a color made by selectColor()
 * @param {array} hslArray HSL color to create beckground for
 * @returns {array} [H, S, L] Color array
 */
export function backgroundColor(hslArray: HslArray): HslArray {
  return [hslArray[0], hslArray[1], 94]
}

/**
 * Check if current browser supports console color styling
 * @returns True if colors are supported
 */
export function checkColorSupport(): boolean {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (
    typeof window !== 'undefined' &&
    window.process &&
    (window.process as any).type === 'renderer'
  ) {
    return true
  }
  const userAgent =
    (typeof navigator !== 'undefined' && String(navigator.userAgent)) || ''
  // Internet Explorer and Edge do not support colors.
  if (/(edge|trident)/.test(userAgent)) {
    return false
  }
  // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (
    (typeof document !== 'undefined' &&
      document.documentElement &&
      document.documentElement.style &&
      document.documentElement.style.webkitAppearance) ||
    // Is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' &&
      window.console &&
      (window.console as any).firebug) ||
    //@ts-ignore
    (window.console.exception && window.console.table) ||
    // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (/firefox\/(\d+)/.test(navigator.userAgent.toLowerCase()) &&
      parseInt(RegExp.$1, 10) >= 31) ||
    // Double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' &&
      navigator.userAgent &&
      /applewebkit\/(\d+)/.test(navigator.userAgent.toLowerCase()))
  )
}
