import React from 'react';
import Registrierung from './Registrierung/Registrierung';
import Header from './header/header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <React.Fragment>
      <Header />
      <Registrierung />
    </React.Fragment>
  );
}

export default App;