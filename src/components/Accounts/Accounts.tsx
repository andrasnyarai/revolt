import React from 'react';
import { useStore, Account } from '../../useStore';

import * as S from './styles';

const currencyToSymbol = {
  eur: '€',
  usd: '$',
  gbp: '£',
};

export const Accounts = () => {
  const accounts = useStore((state) => state.accounts);

  return (
    <S.Root>
      {Object.entries(accounts).map(([currency, amount]) => {
        const symbol = currencyToSymbol[currency as Account];
        return (
          <div key={symbol}>
            {symbol}: {amount}
          </div>
        );
      })}
    </S.Root>
  );
};
