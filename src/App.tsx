import React, { useState, useEffect } from 'react';

import { useStore, Currency } from './useStore';
import { GlobalStyle } from './components/GlobalStyle';
import { Accounts } from './components/Accounts';
import { ControlPanel } from './components/ControlPanel';
import { ExchangeButton } from './components/ExchangeButton';
import { Loading } from './components/Loading';
import { FloatInput } from './components/FloatInput';
import { Rail } from './components/Rail';
import { Screen } from './components/Screen';
import { Rate } from './components/Rate';
import { StatusBar } from './components/StatusBar';
import { roundToDecimals } from './utils';

export const App: React.VFC = () => {
  const { accounts, rates, exchange, loadFx, loading } = useStore(
    (state) => state,
  );

  const [baseCurrency, setBaseCurrency] = useState<Currency>('eur');
  const [targetCurrency, setTargetCurrency] = useState<Currency>('usd');

  const [baseAmount, setBaseAmount] = useState('0');
  const [targetAmount, setTargetAmount] = useState('0');

  useEffect(() => {
    loadFx();
    const id = setInterval(loadFx, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    calculateRatesOnBase(baseAmount);
  }, [baseCurrency, targetCurrency, accounts, loading]);

  const wrappedExchange = () => {
    exchange(baseCurrency, targetCurrency, baseAmount, targetAmount);
  };

  const exchangeButtonDisabled =
    baseCurrency === targetCurrency ||
    Number(baseAmount) === 0 ||
    // disallow small transactions where there is a small difference
    // after the second decimal between the two inputs
    roundToDecimals(Number(baseAmount)) ===
      roundToDecimals(Number(targetAmount));

  const calculateRatesOnBase = (value: string) => {
    const availableOnAccount = accounts[baseCurrency];
    const rate = rates[baseCurrency][targetCurrency];

    const cappedValue =
      Number(value) > availableOnAccount ? String(availableOnAccount) : value;

    setBaseAmount(String(cappedValue));
    setTargetAmount(String(Number(cappedValue) * rate));
  };

  const calculateRatesOnTarget = (value: string) => {
    const reverseRate = rates[targetCurrency][baseCurrency];

    const availableOnAccount = accounts[baseCurrency];
    const amountNeeded = Number(value) * reverseRate;

    if (amountNeeded > availableOnAccount) {
      const rate = rates[baseCurrency][targetCurrency];
      setBaseAmount(String(availableOnAccount));
      setTargetAmount(String(availableOnAccount * rate));
    } else {
      setBaseAmount(String(Number(value) * reverseRate));
      setTargetAmount(value);
    }
  };

  return (
    <Screen>
      <GlobalStyle />
      <StatusBar>
        <Accounts />
        <Rate baseCurrency={baseCurrency} targetCurrency={targetCurrency} />
      </StatusBar>
      <Rail
        testId="baseRail"
        selectedCurrency={baseCurrency}
        setSelectedCurrency={setBaseCurrency}
      />
      <ControlPanel
        inputs={
          <>
            <FloatInput
              testId="baseInput"
              sign="-"
              showUnderLine
              value={baseAmount}
              onChange={calculateRatesOnBase}
            />
            <FloatInput
              testId="targetInput"
              sign="+"
              value={targetAmount}
              onChange={calculateRatesOnTarget}
            />
          </>
        }
      >
        {loading ? (
          <Loading />
        ) : (
          <ExchangeButton
            onClick={wrappedExchange}
            disabled={exchangeButtonDisabled}
          />
        )}
      </ControlPanel>
      <Rail
        testId="targetRail"
        selectedCurrency={targetCurrency}
        setSelectedCurrency={setTargetCurrency}
      />
    </Screen>
  );
};
