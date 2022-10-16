import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/global';
import App from './App';

const AppContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <App />
      </>
    </ThemeProvider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<AppContainer />);
