import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --primaryTextColor: #fff;
    --secondaryTextColor: #b3b3b3;
    --orange: #ff9000;
    --primaryFont: 'Raleway', sans-serif;
    --secondaryFont: 'Montserrat', sans-serif;

    --bg-1: #121212;
    --bg-2: #181818;
    --bg-3: #282828;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: var(--bg-1);
    color: var(--secondaryTextColor);
    font-family: var(--primaryFont);
    font-size: 16px;
    font-variant-numeric: lining-nums;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--secondaryFont);
    color: var(--primaryTextColor);
    margin: 0;
    &.pop {
      text-shadow: 1px 1px 4px rgb(0 0 0 / 80%), 0px 0px 4px;
    }
  }

  p {
    line-height: 1.5;
  }

  code, pre {
    background: var(--vscode-bg);
    color: var(--vscode-white);
    padding: 1em;
  }
`;
