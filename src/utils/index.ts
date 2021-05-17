export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
export const roundToDecimals = (num: number, places = 2) => {
  return +(Math.round(Number(num + `e+${places}`)) + `e-${places}`);
};
