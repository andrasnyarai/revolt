import React from 'react';

import * as S from './styles';

export const Screen: React.FC = ({ children }) => {
  return <S.Root>{children}</S.Root>;
};
