export function isHSL(color: string): boolean {
  // Regular expression to match the new HSL format
  const hslRegex =
    /^\s*(\d{1,3})\s+([1-9]?[0-9]%,?|100%)\s+([1-9]?[0-9]%,?|100%)\s*$/

  return hslRegex.test(color)
}
