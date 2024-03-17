import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';

function App() {

  return (
    <MantineProvider>
    <Router />
    </MantineProvider>

  );
}

export default App;