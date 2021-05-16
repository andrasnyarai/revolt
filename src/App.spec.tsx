import * as React from 'react';
import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';

import App from './App';
import { useStore } from './useStore';

const initialStoreState = useStore.getState();

const renderApp = async (): Promise<void> => {
  render(<App />);
  await waitForElementToBeRemoved(await screen.findByText('loading.'));
};

const getInputs = () => {
  const baseInput = screen.getByTestId('baseInput');
  const targetInput = screen.getByTestId('targetInput');

  return {
    baseInput: baseInput as HTMLInputElement,
    targetInput: targetInput as HTMLInputElement,
  };
};

describe('<App>', () => {
  beforeEach(() => {
    // zustand state isnt stored in the react tree
    useStore.setState(initialStoreState, true);
  });

  it('exchange button should be enabled', async () => {
    await renderApp();

    expect(screen.getByText(/exchange/i)).toBeInTheDocument();
  });

  it('cant type in letters into input', async () => {
    await renderApp();
    const { baseInput } = getInputs();

    fireEvent.change(baseInput, { target: { value: 'abc' } });
    expect(baseInput.value).toBe('0');
  });

  it('cant type in scientific number notation', async () => {
    await renderApp();
    const { baseInput } = getInputs();

    fireEvent.change(baseInput, { target: { value: '1.23e+5' } });
    expect(baseInput.value).toBe('0');
  });

  it('cant type in more than two decimals', async () => {
    await renderApp();
    const { baseInput } = getInputs();

    fireEvent.change(baseInput, { target: { value: '1.2345' } });
    expect(baseInput.value).toBe('0');
  });

  it('cant type leading zeroes', async () => {
    await renderApp();
    const { baseInput } = getInputs();

    fireEvent.change(baseInput, { target: { value: '000.1' } });
    expect(baseInput.value).toBe('0.1');
  });

  it('cant type more than in balance', async () => {
    await renderApp();
    const { baseInput } = getInputs();

    fireEvent.change(baseInput, { target: { value: '1000' } });
    expect(baseInput.value).toBe('100');
  });

  it('target input should show converted rate', async () => {
    await renderApp();
    const { baseInput, targetInput } = getInputs();

    fireEvent.change(baseInput, { target: { value: '0.1' } });
    expect(baseInput.value).toBe('0.1');
    expect(targetInput.value).toBe('0.2');
  });

  it('when setting target amount, base input should reflect', async () => {
    await renderApp();
    const { baseInput, targetInput } = getInputs();

    fireEvent.change(targetInput, { target: { value: '10' } });
    expect(baseInput.value).toBe('5');
    expect(targetInput.value).toBe('10');
  });

  it('should change base currency', async () => {
    await renderApp();
    const { baseInput, targetInput } = getInputs();
    const targetCurrencyRightArrow = screen.getByTestId('targetRail-right');

    fireEvent.change(baseInput, { target: { value: '1' } });
    fireEvent.click(targetCurrencyRightArrow);

    expect(baseInput.value).toBe('1');
    expect(targetInput.value).toBe('0.5');
  });

  it('dont allow conversion between the same currencies', async () => {
    await renderApp();
    const { baseInput, targetInput } = getInputs();
    const targetCurrencyLeftArrow = screen.getByTestId('targetRail-left');

    const exchangeButton = screen.getByTestId('exchange-button');
    expect(screen.getByText('€: 100')).toBeDefined();
    expect(screen.getByText('$: 50')).toBeDefined();
    expect(screen.getByText('£: 30')).toBeDefined();

    fireEvent.change(baseInput, { target: { value: '1' } });
    fireEvent.click(targetCurrencyLeftArrow);
    fireEvent.click(exchangeButton);

    expect(baseInput.value).toBe('1');
    expect(targetInput.value).toBe('1');

    expect(screen.getByText('€: 100')).toBeDefined();
    expect(screen.getByText('$: 50')).toBeDefined();
    expect(screen.getByText('£: 30')).toBeDefined();
  });

  it('exchange button should add to balance', async () => {
    await renderApp();
    const { baseInput, targetInput } = getInputs();

    const exchangeButton = screen.getByTestId('exchange-button');
    expect(screen.getByText('€: 100')).toBeDefined();
    expect(screen.getByText('$: 50')).toBeDefined();
    expect(screen.getByText('£: 30')).toBeDefined();

    fireEvent.change(baseInput, { target: { value: '5' } });
    fireEvent.click(exchangeButton);

    expect(baseInput.value).toBe('5');
    expect(targetInput.value).toBe('10');

    expect(screen.getByText('€: 95')).toBeDefined();
    expect(screen.getByText('$: 60')).toBeDefined();
    expect(screen.getByText('£: 30')).toBeDefined();
  });
});
