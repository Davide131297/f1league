import React from 'react';
import Header from './header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css';
import './App.css';
import Teilnehmerliste from './Tabelle/TeilnehmerTabelle';
import Popup from './Popup/Popup';

function App() {

  return (
    <React.Fragment>
      <div className="app">
        <Header />
        <Popup />
        <Teilnehmerliste />
      </div>
    </React.Fragment>
  );
}

export default App;