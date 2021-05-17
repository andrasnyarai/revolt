import React from 'react';
import { getEntries } from 'src/utils';
import { useStore, Currency } from '../../useStore';

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
      {getEntries(accounts).map(([currency, amount]) => {
        const symbol = currencyToSymbol[currency];
        return (
          <div key={currency}>
            {symbol}: {amount}
          </div>
        );
      })}
    </S.Root>
  );
};
