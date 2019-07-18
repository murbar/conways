import { createGlobalStyle } from 'styled-components';
import bgBlocks from '../images/bg-blocks.svg';

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
    background: url(${bgBlocks}) no-repeat, ${p => p.theme.colors.background};
    font-size: 1.8rem;
    line-height: 1.5;
    font-family: ${p => p.theme.fontFamily};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${p => p.theme.fontFamily};
    font-weight: 400;
  }

  a {
    color: ${p => p.theme.colors.cream};
    &:hover {
      color: ${p => p.theme.colors.primary};
    }
  }
`;
