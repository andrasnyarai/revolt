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

function App() {
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
    const rate = rates[baseCurrency][targetCurrency];
    const availableOnAccount = accounts[baseCurrency];
    const cappedAmount =
      Number(baseAmount) > availableOnAccount
        ? String(availableOnAccount)
        : baseAmount;

    setBaseAmount(cappedAmount);
    setTargetAmount(String(Number(cappedAmount) * rate));
  }, [baseCurrency, targetCurrency, accounts, loading]);

  const wrappedExchange = () => {
    exchange(baseCurrency, targetCurrency, baseAmount, targetAmount);
  };

  return (
    <Screen>
      <GlobalStyle />
      <StatusBar>
        <Accounts />
        <Rate />
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
              onChange={(value) => {
                const availableOnAccount = accounts[baseCurrency];

                const cappedValue =
                  Number(value) > availableOnAccount
                    ? String(availableOnAccount)
                    : value;

                const rate = rates[baseCurrency][targetCurrency];

                setBaseAmount(String(cappedValue));
                setTargetAmount(String(Number(cappedValue) * rate));
              }}
            />
            <FloatInput
              testId="targetInput"
              sign="+"
              value={targetAmount}
              onChange={(value) => {
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
              }}
            />
          </>
        }
      >
        {loading ? (
          <Loading />
        ) : (
          <ExchangeButton
            onClick={wrappedExchange}
            disabled={
              baseCurrency === targetCurrency || Number(baseAmount) === 0
            }
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
}

export default App;
