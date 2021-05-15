import React from 'react';
import { useSpring } from '@react-spring/core';

import * as S from './styles';

export const Loading: React.VFC = () => {
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: 'var(--main-color)' },
      { opacity: 0, color: 'var(--accent-color)' },
    ],
    from: { opacity: 0, color: 'var(--accent-color)' },
  });
  return <S.Root style={styles}>loading.</S.Root>;
};
