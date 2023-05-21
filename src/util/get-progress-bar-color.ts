/**
 * Progress bar changes from green > red.
 * @param {Number} percent
 * @returns {String} color the bar should use
 */
export function getProgressBarColor(percent: number) {
  const hue = (percent * 1.2).toString(10);
  return "hsl(" + hue + ",75%,50%)";
}
