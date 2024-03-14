import React from 'react';
import Registrierung from './Registrierung/Registrierung';
import Header from './header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <React.Fragment>
      <div className="app">
        <Header />
      </div>
    </React.Fragment>
  );
}

export default App;