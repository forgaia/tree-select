import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import theme from '../src/assets/themes/index';
import { mockedStore } from '../src/helpers/testsHelpers/testsHelpers';
import { MemoryRouter } from 'react-router';
import { ActionBar } from '../src/components';
import { Provider } from 'react-redux';

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <Provider store={mockedStore}>
      <MemoryRouter>
        <div style={{ background: '#fff', padding: '50px' }}>{storyFn()}</div>
      </MemoryRouter>
    </Provider>
  </ThemeProvider>
));
