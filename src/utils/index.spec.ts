import { roundToDecimals } from './index';

describe('roundToDecimals', () => {
  it('should leave integers the same', () => {
    expect(roundToDecimals(123)).toBe(123);
  });

  it('should round after 2 decimals', () => {
    expect(roundToDecimals(123.125)).toBe(123.13);
  });

  it('should round after 6 decimals', () => {
    expect(roundToDecimals(123.1111119, 6)).toBe(123.111112);
  });
});
