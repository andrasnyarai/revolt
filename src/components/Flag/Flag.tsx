import React from 'react';

import { Eu } from './Eu';
import { Us } from './Us';
import { Gb } from './Gb';
import type { Currency } from '../../useStore';

type Props = {
  className?: string;
  currency: Currency;
};

const currencyToFlag = {
  eur: Eu,
  usd: Us,
  gbp: Gb,
};

export const Flag: React.VFC<Props> = ({ currency, className }) => {
  const SVG = currencyToFlag[currency];
  return <SVG className={className} />;
};
