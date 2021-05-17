import React from 'react';

import { Currency, useStore } from '../../useStore';
import { roundToDecimals } from '../../utils';

type Props = {
  baseCurrency: Currency;
  targetCurrency: Currency;
};

export const Rate: React.VFC<Props> = ({ baseCurrency, targetCurrency }) => {
  const rates = useStore((state) => state.rates);
  const rate = rates[baseCurrency][targetCurrency];

  const baseAmount = 1;
  const targetAmount = roundToDecimals(baseAmount * rate, 6);
  return (
    <div>
      {`${baseAmount} ${baseCurrency.toUpperCase()} = ${targetAmount} ${targetCurrency.toUpperCase()}`}
    </div>
  );
};
