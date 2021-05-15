import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --main-color: #396af5;
    --accent-color: #2c2c4e;
    --background-color: #171721;
    --text-color: #f1f1f1;
    --body-background-color: #000;
  }

  body {
    margin: 0;
    background-color: var(--body-background-color);
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    color: var(--text-color);
    user-select: none;
  }

  #root {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
