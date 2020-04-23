export function stringMatchesRules(str: string, rules: string): boolean {
  const result = rules
    .split(',')
    .map(item => {
      const [, isNegated, debugStr, isWildcard] =
        item.match(/^(-)?([^*]*)(\*)?$/) || []
      const isEnabled =
        debugStr && (isWildcard ? str.startsWith(debugStr) : str === debugStr)
      return {
        isEnabled,
        isNegated,
      }
    })
    .filter(item => item.isEnabled)

  if (result.length) {
    const item = result[result.length - 1]
    return Boolean(item.isEnabled && !item.isNegated)
  }
  return false
}
