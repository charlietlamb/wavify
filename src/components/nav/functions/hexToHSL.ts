export function hexToHSL(H: string) {
  let r: number = 0,
    g: number = 0,
    b: number = 0
  if (H.length === 4) {
    r = parseInt(H[1] + H[1], 16)
    g = parseInt(H[2] + H[2], 16)
    b = parseInt(H[3] + H[3], 16)
  } else if (H.length === 7) {
    r = parseInt(H[1] + H[2], 16)
    g = parseInt(H[3] + H[4], 16)
    b = parseInt(H[5] + H[6], 16)
  }
  // Then to HSL
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    if (h) h /= 6
  }
  h = h ? Math.round(360 * h) : 0
  s = Math.round(s * 100)
  l = Math.round(l * 100)
  return `${h} ${s}% ${l}%`
}
