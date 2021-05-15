import React, { ChangeEvent, KeyboardEvent, useRef } from 'react';
import { roundToDecimals } from '../../useStore';

import * as S from './styles';

type Props = {
  sign: '-' | '+';
  value: string;
  showUnderLine?: boolean;
  onChange: (value: string) => void;
};

export const FloatInput: React.VFC<Props> = ({
  sign,
  value,
  onChange,
  showUnderLine = false,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [, decimals = ''] = String(value).split('.');

  const normalizedValue =
    decimals.length > 2 ? String(roundToDecimals(value)) : value;

  const isFloat = normalizedValue.includes('.');
  const size = normalizedValue.replace('.', '').length + (isFloat ? 0.5 : 0);

  return (
    <S.Root>
      {Number(value) > 0 && <S.Sign>{sign}</S.Sign>}
      <S.Input
        ref={ref}
        size={size}
        value={normalizedValue}
        type="number"
        step="0.01"
        min="0"
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onWheel={() => {
          ref.current?.blur();
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const [, decimals] = String(e.target.value).split('.');
          if (decimals && decimals.length > 2) {
            return;
          }

          // trim leading zeroes
          let value = e.target.value;
          while (value[0] === '0' && value[1] !== '.') {
            value = value.substring(1);
          }

          onChange(value || '0');
        }}
      />
      <S.Line size={size} showUnderLine={showUnderLine} />
    </S.Root>
  );
};
