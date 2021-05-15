import React from 'react';
import { useSpring } from '@react-spring/core';

import * as S from './styles';

type Props = {
  onClick: () => void;
  disabled: boolean;
};

export const ExchangeButton: React.VFC<Props> = ({ onClick, disabled }) => {
  const [styles, api] = useSpring(() => ({
    from: { scale: 1 },
    config: { duration: 100 },
  }));

  const wrappedOnClick = () => {
    if (disabled) return;
    api.start({ to: [{ scale: 0.9 }, { scale: 1 }] });
    onClick();
  };

  return (
    <S.Root disabled={disabled} onClick={wrappedOnClick} style={styles}>
      exchange
    </S.Root>
  );
};
