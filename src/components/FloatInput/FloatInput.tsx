import React, {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useRef,
} from 'react';
import { roundToDecimals } from '../../utils';

import * as S from './styles';

type Props = {
  sign: '-' | '+';
  value: string;
  onChange: (value: string) => void;
  showUnderLine?: boolean;
  testId?: string;
};

const invalidCharacters = ['e', 'E', '+', '-'];

export const FloatInput: React.VFC<Props> = ({
  sign,
  value,
  onChange,
  showUnderLine = false,
  testId = '',
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [, decimals = ''] = String(value).split('.');

  const normalizedValue =
    decimals.length > 2 ? String(roundToDecimals(Number(value))) : value;

  const isFloat = normalizedValue.includes('.');
  const size = normalizedValue.replace('.', '').length + (isFloat ? 0.5 : 0);

  return (
    <S.Root>
      {Number(value) > 0 && <div>{sign}</div>}
      <S.Input
        data-testid={testId}
        ref={ref}
        size={size}
        value={normalizedValue}
        type="number"
        step="0.01"
        min="0"
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (invalidCharacters.includes(e.key)) {
            e.preventDefault();
          }
        }}
        onWheel={() => {
          ref.current?.blur();
        }}
        onPaste={(e: ClipboardEvent<HTMLInputElement>) => {
          const value = e.clipboardData.getData('Text');
          const haveInvalidCharacter = invalidCharacters.some((character) =>
            value.includes(character),
          );
          if (haveInvalidCharacter) {
            e.preventDefault();
          }
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
