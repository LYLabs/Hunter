import styled, { createGlobalStyle } from 'styled-components';
import { Theme } from './Theme';

const GlobalStyle = createGlobalStyle`
*, *:after, *:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${({ theme }) => theme.bodyFontColor};
  background: ${({ theme }) => theme.bodyBackgroundColor};
  text-align: center;
  min-width: 100vh;
  min-height: 100vh;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}
`;

export default GlobalStyle;
