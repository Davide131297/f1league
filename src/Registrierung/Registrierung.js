import React, { useState } from 'react';
import { Input, Button } from '@mantine/core';
import { db } from '../utils/firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import './Registrierung.css';
import { SHA256 } from 'crypto-js';

function Registrierung() {

  // Zustand für die Formulardaten
  const [spielerID, setSpielerID] = useState('');
  const [passwort, setPasswort] = useState('');

  // Funktion zum Speichern der Person in der Kollektion 'personen'
  const addPerson = async (event) => {
    event.preventDefault();

    const hashedPassword = SHA256(passwort).toString();

    const personData = {
      spielerID,
      passwort: hashedPassword
    };

    try {
      // Überprüfen, ob die SpielerID bereits existiert
      const q = query(collection(db, "personen"), where("spielerID", "==", spielerID));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert("Eine Person mit dieser SpielerID existiert bereits.");
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

  // Funktion zum Überprüfen der Anmeldeinformationen
  const checkCredentials = async () => {
  const hashedPassword = SHA256(passwort).toString();

    try {
      // Überprüfen, ob die SpielerID existiert und das Passwort korrekt ist
      const q = query(collection(db, "personen"), where("spielerID", "==", spielerID));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const personData = querySnapshot.docs[0].data();
        if (personData.passwort === hashedPassword) {
          alert("Erfolgreich eingeloggt!");
        } else {
          alert("Falsches Passwort!");
        }
      } else {
        alert("Keine Person mit dieser SpielerID gefunden.");
      }
    } catch (e) {
      console.error("Fehler beim Überprüfen der Anmeldeinformationen: ", e);
    }
  };

  return (
    <div className="registrierung">
      <form onSubmit={addPerson}>
        <Input 
          placeholder="SpielerID" 
          value={spielerID} 
          onChange={(event) => setSpielerID(event.currentTarget.value)} 
        />
        <Input 
          placeholder="Passwort" 
          type="password"
          value={passwort} 
          onChange={(event) => setPasswort(event.currentTarget.value)} 
        />
        <div className='buttons'>
          <Button type="submit">Registrieren</Button>
          <Button type="button" onClick={checkCredentials}>Login</Button>
        </div>
      </form>
    </div>
  );
}

export default Registrierung;