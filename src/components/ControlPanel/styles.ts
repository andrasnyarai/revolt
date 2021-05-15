import styled from 'styled-components';

export const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  justify-self: flex-end;
  transform: translateX(-85px);
`;
