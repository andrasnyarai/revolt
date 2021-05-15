import React, { Dispatch, SetStateAction, useRef } from 'react';
import { useSprings } from '@react-spring/core';
import { useDrag } from 'react-use-gesture';

import { useStore, Account } from '../../useStore';
import { cardWidth } from './constants';
import * as S from './styles';

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

type Props = {
  selectedCurrency: Account;
  setSelectedCurrency: Dispatch<SetStateAction<Account>>;
};

export const Rail: React.VFC<Props> = ({
  selectedCurrency,
  setSelectedCurrency,
}) => {
  const accounts = useStore((state) => state.accounts);
  const currencies = Object.keys(accounts);

  const index = useRef(currencies.findIndex((c) => c === selectedCurrency));

  const [springs, api] = useSprings(currencies.length, (i) => ({
    x: i * cardWidth - index.current * cardWidth,
  }));

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (active && distance > cardWidth / 2) {
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          currencies.length - 1,
        );
        setSelectedCurrency(currencies[index.current] as Account);
        cancel();
      }
      api((i) => {
        const x = (i - index.current) * cardWidth + (active ? mx : 0);
        return { x };
      });
    },
  );

  const slide = (direction: -1 | 1) => {
    index.current = clamp(index.current + direction, 0, currencies.length - 1);
    api((i) => {
      const x = (i - index.current) * cardWidth;
      return { x };
    });
    setSelectedCurrency(currencies[index.current] as Account);
  };

  return (
    <S.Root>
      <S.StyledChevron
        mirrored
        onClick={() => {
          slide(-1);
        }}
      />
      <S.Container {...bind()}>
        <>
          {springs.map((styles, i) => {
            const currency = currencies[i];

            return (
              <S.Card style={styles} key={i}>
                <S.Title>{currency.toUpperCase()}</S.Title>
                <S.StyledFlag currency={currency as Account} />
              </S.Card>
            );
          })}
        </>
        <S.IndexIndicator>
          {currencies.map((currency) => (
            <S.Circle key={currency} active={currency === selectedCurrency} />
          ))}
        </S.IndexIndicator>
      </S.Container>
      <S.StyledChevron
        onClick={() => {
          slide(1);
        }}
      />
    </S.Root>
  );
};
