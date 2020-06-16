import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`  
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
  font-size: 62.5%;
  }
  
  body {
    font-size: 1.6rem;
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyle;
