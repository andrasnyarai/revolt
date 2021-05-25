export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
export const roundToDecimals = (num: number, places = 2) => {
  return +(Math.round(Number(num + `e+${places}`)) + `e-${places}`);
};

export const truncate = (n: number, places = 2) => {
  return Math.trunc(n * Math.pow(10, places)) / Math.pow(10, places);
};

export const getKeys = Object.keys as <T extends object>(obj: T) => (keyof T)[];

export const getEntries = Object.entries as <T extends object>(
  obj: T,
) => {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
