import React from 'react';
import { getEntries } from '../../utils';
import { useStore } from '../../useStore';

const currencyToSymbol = {
  eur: '€',
  usd: '$',
  gbp: '£',
};

export const Accounts = () => {
  const accounts = useStore((state) => state.accounts);

  return (
    <div>
      {getEntries(accounts).map(([currency, amount]) => {
        const symbol = currencyToSymbol[currency];
        return (
          <div key={currency}>
            {symbol}: {amount}
          </div>
        );
      })}
    </div>
  );
};
