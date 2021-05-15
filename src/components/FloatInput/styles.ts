import styled from 'styled-components';

export const Root = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Input = styled.input<{ size: number }>`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  padding: 0;
  border: none;
  outline: none;

  color: var(--text-color);
  background-color: var(--body-background-color);
  caret-color: var(--main-color);

  text-align: right;
  font-size: 20px;
  font-weight: bold;
  width: ${({ size }) => size + 1.25}ch;
  max-width: 150px;
`;

export const Sign = styled.div`
  display: inline-block;
`;

export const Line = styled.div<{ showUnderLine: boolean; size: number }>`
  position: absolute;
  height: 1.75px;
  bottom: -2px;

  width: ${({ size }) => (size + 2.25) * 10}px;
  ${({ showUnderLine }) =>
    showUnderLine ? 'background-color: var(--main-color);' : ''}
`;
