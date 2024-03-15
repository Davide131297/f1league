import React, { useState } from 'react';
import { Input, Button } from '@mantine/core';
import { db } from '../utils/firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import './Registrierung.css';
import { SHA256 } from 'crypto-js';
import Form from 'react-bootstrap/Form';


function Registrierung({ setShow, setIsAuthenticated }) {

  // Zustand für die Formulardaten
  const [spielerID, setSpielerID] = useState('');
  const [passwort, setPasswort] = useState('');
  const [team, setTeam] = useState('');

  const teams = [
    "Mercedes",
    "Red Bull",
    "Ferrari",
    "McLaren",
    "Aston Martin",
    "Alpine",
    "AlphaTauri",
    "Alfa Romeo",
    "Williams",
    "Haas"
  ];


  // Funktion zum Speichern der Person in der Kollektion 'personen'
  const addPerson = async (event) => {
    event.preventDefault();

    // Überprüfen, ob sowohl SpielerID als auch Passwort und Team eingegeben wurden
    if (!spielerID || !passwort || !team) {
      alert('Bitte geben Sie SpielerID, Passwort und Team ein.');
      return;
    }

    const hashedPassword = SHA256(passwort).toString();

    const personData = {
      spielerID,
      passwort: hashedPassword,
      team,
    };

    try {
      // Überprüfen, ob die SpielerID bereits existiert
      const q = query(collection(db, "personen"), where("spielerID", "==", spielerID));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert("Eine Person mit dieser SpielerID existiert bereits.");
        return;
      }

      // Überprüfen, ob das Team bereits zwei Personen hat
      const teamQuery = query(collection(db, "personen"), where("team", "==", team));
      const teamSnapshot = await getDocs(teamQuery);
      if (teamSnapshot.size >= 2) {
        alert("Bitte wähle ein anderes Team, dieses Team ist bereits voll.");
        return;
      }

      const docRef = await addDoc(collection(db, "personen"), personData);

      // Fügen Sie die generierte ID dem Personendatensatz hinzu
      await updateDoc(doc(db, "personen", docRef.id), {
        id: docRef.id
      });
      setShow(false);
    } catch (e) {
      console.error("Fehler beim Speichern der Person: ", e);
    }
  };

  // Funktion zum Überprüfen der Anmeldeinformationen
  const checkCredentials = async () => {
  // Überprüfen, ob sowohl SpielerID als auch Passwort eingegeben wurden
  if (!spielerID || !passwort) {
    alert('Bitte geben Sie sowohl SpielerID als auch Passwort ein.');
    return;
  }
  const hashedPassword = SHA256(passwort).toString();

    try {
      // Überprüfen, ob die SpielerID existiert und das Passwort korrekt ist
      const q = query(collection(db, "personen"), where("spielerID", "==", spielerID));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const personData = querySnapshot.docs[0].data();
        if (personData.passwort === hashedPassword) {
          alert("Erfolgreich eingeloggt!");
          // Cookie
          let date = new Date();
          date.setTime(date.getTime() + (1*60*60*1000)); // Cookie läuft nach 1 Stunde ab
          let expires = "; expires=" + date.toUTCString();
          document.cookie = "userID=" + personData.id + expires + "; path=/";
          setShow(false);
          setIsAuthenticated(true);
          window.location.reload();
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

  // Funktion zum Löschen des Fahrers
  const accDelete = async () => {
    if (!spielerID || !passwort) {
      alert('Bitte geben Sie sowohl SpielerID als auch Passwort ein.');
      return;
    }
    const hashedPassword = SHA256(passwort).toString();
    try {
      // Überprüfen, ob die SpielerID existiert und das Passwort korrekt ist
      const q = query(collection(db, "personen"), where("spielerID", "==", spielerID));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const personData = querySnapshot.docs[0].data();
        if (personData.passwort === hashedPassword) {
          const personID = personData.id;
          // Bestätigung vor dem Löschen
          if (window.confirm('Fahrerprofil wirklich löschen?')) {
            await deleteDoc(doc(db, "personen", personID));
            alert("Fahrerprofil wurde erfolgreich gelöscht.");
            setShow(false);
          }
        }
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Accounts: ", error);
    } finally {
      console.log("Operation abgeschlossen");
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
        <Form.Select aria-label="Wähle dein Team" onChange={(event) => setTeam(event.currentTarget.value)}>
          <option>Wähle dein Team</option>
          {teams.map((team, index) => (
            <option key={index} value={team}>{team}</option>
          ))}
        </Form.Select>
        <div className='buttons'>
          <Button type="submit">Registrieren</Button>
          <Button type="button" onClick={checkCredentials}>Login</Button>
        </div>
        <div className='deleteAcc'>
            <span type="button" onClick={accDelete}>Fahrer löschen</span>
        </div>
      </form>
    </div>
  );
}

export default Registrierung;