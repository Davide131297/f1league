import React, { useState } from 'react';
import { Input, Button } from '@mantine/core';
import { db } from '../../utils/firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import './Registrierung.css';

function Registrierung() {

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
      // Überprüfen, ob der Vorname bereits existiert
      const q = query(collection(db, "personen"), where("vorname", "==", vorname));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert("Eine Person mit diesem Vornamen existiert bereits.");
        return;
      }

      const docRef = await addDoc(collection(db, "personen"), personData);
      console.log("Person wurde erfolgreich gespeichert mit ID: ", docRef.id);

      // Fügen Sie die generierte ID dem Personendatensatz hinzu
      await updateDoc(doc(db, "personen", docRef.id), {
        id: docRef.id
      });
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

export default Registrierung;