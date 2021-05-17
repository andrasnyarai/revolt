import create, { SetState, GetState } from 'zustand';
import { roundToDecimals } from './utils';

export type Currency = 'eur' | 'usd' | 'gbp';

type Store = {
  accounts: {
    [C in Currency]: number;
  };
  rates: {
    [C in Currency]: { [C in Currency]: number };
  };
  loading: boolean;
  loadFx: () => Promise<void>;
  exchange: (
    base: Currency,
    to: Currency,
    baseAmount: string,
    targetAmount: string,
  ) => void;
};

const fxUrl = 'https://api.exchangerate.host/latest?base=eur';

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
            usd: 1,
            gbp: roundToDecimals(gbp / usd, 6),
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
          [base]: roundToDecimals(
            accounts[base] - roundToDecimals(Number(baseAmount)),
          ),
          [target]: roundToDecimals(
            accounts[target] + roundToDecimals(Number(targetAmount)),
          ),
        },
      });
    },
  }),
);
