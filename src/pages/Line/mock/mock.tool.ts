export function getRandomNum(min: number, max: number): number {
  if (min >= 1) {
    var Range = max - min
    var Rand = Math.random()
    return min + Math.round(Rand * Range)
  } else {
    return min + Math.random() * 0.1
  }
}
