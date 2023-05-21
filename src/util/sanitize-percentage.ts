export function sanitisePercentage(integer: number) {
  return Math.min(100, Math.max(0, integer));
}
