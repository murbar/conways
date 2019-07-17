import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { 
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    color: ${p => p.theme.colors.foreground};
    background: ${p => p.theme.colors.background};
    font-size: 1.8rem;
    line-height: 1.5;
    font-family: 'Rubik', sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    ${'' /* text-transform: uppercase; */}
  }

  a {
    color: ${p => p.theme.colors.cream};
    &:hover {
      color: ${p => p.theme.colors.primary};
    }
  }
`;
