import React from 'react';
import { hot } from 'react-hot-loader/root';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { CssBaseline } from '@material-ui/core';

const App = () => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  </>
);

export default hot(App);
