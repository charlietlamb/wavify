export function hslToHex(hsl: string): string {
  let [h, s, l] = hsl.split(' ')
  s = s.replace('%', '')
  l = l.replace('%', '')

  let hNum: number = Number(h) / 360
  let sNum: number = Number(s) / 100
  let lNum: number = Number(l) / 100

  let r: number, g: number, b: number

  if (sNum === 0) {
    r = g = b = lNum // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q: number = lNum < 0.5 ? lNum * (1 + sNum) : lNum + sNum - lNum * sNum
    const p: number = 2 * lNum - q

    r = hue2rgb(p, q, hNum + 1 / 3)
    g = hue2rgb(p, q, hNum)
    b = hue2rgb(p, q, hNum - 1 / 3)
  }

  const toHex = (x: number): string => {
    const hex: string = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return '#' + toHex(r) + toHex(g) + toHex(b)
}
