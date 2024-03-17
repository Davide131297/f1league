import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import Header  from './../src/header/header';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Header />
        {/* Rest of your components */}
      </Router>
    </MantineProvider>
  );
}
export default App;