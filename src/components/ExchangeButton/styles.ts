import styled from 'styled-components';
import { animated } from '@react-spring/web';

export const Root = styled(animated.div)<{ disabled: boolean }>`
  display: flex;
  margin-left: 60px;
  padding: 6px;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  background-color: var(--background-color);

  ${({ disabled }) => {
    return disabled
      ? `color: var(--accent-color);`
      : `cursor: pointer;
      &:hover {
        background-color: var(--main-color);
      }`;
  }}
`;
