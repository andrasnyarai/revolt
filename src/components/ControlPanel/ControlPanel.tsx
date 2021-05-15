import React from 'react';

import * as S from './styles';

type Props = {
  inputs: React.ReactElement;
};

export const ControlPanel: React.FC<Props> = ({ inputs, children }) => {
  return (
    <S.Root>
      {children}
      <S.InputsWrapper>{inputs}</S.InputsWrapper>
    </S.Root>
  );
};
