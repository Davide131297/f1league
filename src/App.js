import React, { useState } from 'react';
import './App.css';
import { Input, Button } from '@mantine/core';
import { db } from './utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {

  // Zustand für die Formulardaten
  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [geburtstag, setGeburtstag] = useState('');

  // Funktion zum Speichern der Person in der Kollektion 'personen'
  const addPerson = async (event) => {
    event.preventDefault();

    const personData = {
      vorname,
      nachname,
      geburtstag
    };

    try {
      const docRef = await addDoc(collection(db, "personen"), personData);
      console.log("Person wurde erfolgreich gespeichert mit ID: ", docRef.id);
    } catch (e) {
      console.error("Fehler beim Speichern der Person: ", e);
    }
  };

  return (
    <div className="App">
      <form onSubmit={addPerson}>
        <Input 
          placeholder="Vorname" 
          value={vorname} 
          onChange={(event) => setVorname(event.currentTarget.value)} 
        />
        <Input 
          placeholder="Nachname" 
          value={nachname} 
          onChange={(event) => setNachname(event.currentTarget.value)} 
        />
        <Input 
          placeholder="Geburtstag (DD.MM.YYYY)" 
          value={geburtstag} 
          onChange={(event) => setGeburtstag(event.currentTarget.value)} 
        />
        <Button type="submit">Senden</Button>
      </form>
    </div>
  );
}

export default App;