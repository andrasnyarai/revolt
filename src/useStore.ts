import create, { SetState, GetState } from 'zustand';

export type Account = 'eur' | 'usd' | 'gbp';

type Store = {
  accounts: {
    [A in Account]: number;
  };
  rates: {
    [A in Account]: { [A in Account]: number };
  };
  loading: boolean;
  loadFx: () => Promise<void>;
  exchange: (
    base: Account,
    to: Account,
    baseAmount: string,
    targetAmount: string,
  ) => void;
};

const fxUrl = 'https://api.exchangerate.host/latest?base=eur';

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
export function roundToDecimals(num: string | number, places = 2) {
  // @ts-ignore
  return +(Math.round(num + `e+${places}`) + `e-${places}`);
}

const testRates = {
  eur: {
    eur: 1,
    usd: 2,
    gbp: 0.5,
  },
  usd: {
    eur: 0.5,
    usd: 1,
    gbp: 0.25,
  },
  gbp: {
    eur: 2,
    usd: 4,
    gbp: 1,
  },
};

export const useStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    loading: true,
    accounts: {
      eur: 100.0,
      usd: 50.0,
      gbp: 30.0,
    },
    rates: {
      eur: {
        eur: 0,
        usd: 0,
        gbp: 0,
      },
      usd: {
        eur: 0,
        usd: 0,
        gbp: 0,
      },
      gbp: {
        eur: 0,
        usd: 0,
        gbp: 0,
      },
    },
    loadFx: async () => {
      const response = await fetch(fxUrl);
      const { rates } = await response.json();

      const usd = rates.USD;
      const gbp = rates.GBP;

      set({
        rates: {
          eur: {
            eur: 1,
            usd,
            gbp,
          },
          usd: {
            eur: roundToDecimals(1 / usd, 6),
            usd: roundToDecimals(gbp / usd, 6),
            gbp: 1,
          },
          gbp: {
            eur: roundToDecimals(1 / gbp, 6),
            usd: roundToDecimals(usd / gbp, 6),
            gbp: 1,
          },
        },
      });
      set({ loading: false });
    },
    exchange: (base, target, baseAmount, targetAmount) => {
      const { accounts } = get();

      set({
        accounts: {
          ...accounts,
          [base]: roundToDecimals(accounts[base] - roundToDecimals(baseAmount)),
          [target]: roundToDecimals(
            accounts[target] + roundToDecimals(targetAmount),
          ),
        },
      });
    },
  }),
);
