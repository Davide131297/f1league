import React, { useEffect, useState } from 'react';
import { db } from './../utils/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function TeilnehmerTabelle() {
    const [personen, setPersonen] = useState([]);

    useEffect(() => {
        const personenRef = collection(db, 'personen');
        const unsubscribe = onSnapshot(personenRef, (snapshot) => {
            let tempListe = [];
            snapshot.forEach((doc) => {
                tempListe.push({ spielerID: doc.data().spielerID });
            });
            setPersonen(tempListe);
        });

        // Aufräumen bei Unmount
        return () => unsubscribe();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>SpielerID</th>
                </tr>
            </thead>
            <tbody>
                {personen.map((person, index) => (
                    <tr key={index}>
                        <td>{person.spielerID}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TeilnehmerTabelle;