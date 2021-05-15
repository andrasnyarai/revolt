import styled from 'styled-components';
import { animated } from '@react-spring/web';

import { cardWidth, cardHeight } from './constants';
import { Flag } from '../Flag';
import { Chevron } from '../Chevron';

export const Root = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  height: ${cardHeight}px;
  width: ${cardWidth}px;
  overflow: hidden;
  position: relative;
  cursor: grab;
  border-radius: 10px;
  background-color: var(--background-color);
  touch-action: pan-y;
`;

export const Card = styled(animated.div)`
  height: ${cardHeight}px;
  position: absolute;
  width: ${cardWidth}px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 5px;
`;

export const StyledFlag = styled(Flag)`
  border-radius: 30%;
  width: 70px;
`;

export const Title = styled.p`
  font-size: 50px;
  letter-spacing: 2px;
`;

export const IndexIndicator = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Circle = styled.div<{ active: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${({ active }) =>
    active ? 'var(--main-color)' : 'var(--accent-color)'};
`;

export const StyledChevron = styled(Chevron)<{ mirrored?: boolean }>`
  width: 25px;
  height: 20px;
  fill: var(--background-color);
  cursor: pointer;
  ${({ mirrored }) => (mirrored ? 'transform: rotateY(180deg);' : '')}

  &:active {
    fill: var(--main-color);
  }
`;
