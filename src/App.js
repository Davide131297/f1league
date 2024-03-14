import React from 'react';
import Header from './header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Teilnehmerliste from './Tabelle/TeilnehmerTabelle';

function App() {

  return (
    <React.Fragment>
      <div className="app">
        <Header />
        <Teilnehmerliste />
      </div>
    </React.Fragment>
  );
}

export default App;