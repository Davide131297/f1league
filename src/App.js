import React from 'react';
import Registrierung from './pages/Registrierung/Registrierung';
import Header from './components/header';
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