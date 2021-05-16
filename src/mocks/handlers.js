import { rest } from 'msw';

const testRates = {
  USD: 2,
  GBP: 0.5,
};

export const handlers = [
  rest.get('https://api.exchangerate.host/latest', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        rates: testRates,
      }),
    );
  }),
];
