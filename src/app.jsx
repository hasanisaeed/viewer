import delay from 'delay';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { PersistGate } from 'redux-persist/es/integration/react';

import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

import DragDropHandler from './components/DragDropHandler';
import MainTopLevelView from './components/MainTopLevelView';
import Sidebar from './components/Sidebar';
import SplashScreen from './components/SplashScreen';
import WindowTitleManager from './components/WindowTitleManager';

import AppHotkeys from './hotkeys';
import { persistor, store } from './store';
import ThemeProvider from './theme';

require('~/../assets/css/aframe.less');

require('react-cover-page/themes/dark.css');
require('typeface-fira-sans');

const waitForTopLevelView = async () => {
  // Give some time for the 3D scene to initialize itself
  await delay(1000);
};

const App = () => (
  <StoreProvider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <ToastProvider placement='top-center'>
          <PersistGate persistor={persistor} onBeforeLift={waitForTopLevelView}>
            {(bootstrapped) => (
              <>
                <SplashScreen visible={!bootstrapped} />
                <DragDropHandler />
                <WindowTitleManager
                  loading={!bootstrapped}
                  appName='Skybrush Viewer'
                />
                <CssBaseline />
                <AppHotkeys>
                  <MainTopLevelView />
                </AppHotkeys>
                <Sidebar />
              </>
            )}
          </PersistGate>
        </ToastProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StoreProvider>
);

export default App;
