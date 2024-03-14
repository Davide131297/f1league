import React, { useEffect, useState } from 'react';
import { db } from './../utils/firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import './TeilnehmerTabelle.css';
import { ScrollArea } from '@mantine/core';
// Flaggen
import Bahrain from './../Flaggen/bahrain.png';
import SaudiArabien from './../Flaggen/saudiarabien.png';
import Australien from './../Flaggen/australien.png';
import Aserbaidschan from './../Flaggen/azerbeidschan.png';
import USA from './../Flaggen/usa.png';
import Italien from './../Flaggen/italien.png';
import Monaco from './../Flaggen/monaco.png';
import Spanien from './../Flaggen/spanien.png';
import Kanada from './../Flaggen/kanada.png';
import Österreich from './../Flaggen/österreich.png';
import England from './../Flaggen/england.png';
import Ungarn from './../Flaggen/ungarn.png';
import Belgien from './../Flaggen/belgien.png';
import Niederlande from './../Flaggen/niederlande.png';
import Singapur from './../Flaggen/singapur.png';
import Japan from './../Flaggen/japan.png';
import Katar from './../Flaggen/katar.png';
import Mexiko from './../Flaggen/mexico.png';
import Brasilien from './../Flaggen/brasilien.png';
import AbuDhabi from './../Flaggen/abudhabi.png';




function TeilnehmerTabelle() {
    const [personen, setPersonen] = useState([]);
    const [userID, setUserID] = useState('');
    const [gesamtPunkte, setGesamtPunkte] = useState(0);

    useEffect(() => {
        const personenRef = collection(db, 'personen');
        const unsubscribe = onSnapshot(personenRef, (snapshot) => {
            let tempListe = [];
            snapshot.forEach((doc) => {
                tempListe.push({ 
                    id: doc.id, 
                    ...doc.data() // Hier werden alle Attribute des Dokuments abgerufen
                });
            });
            setPersonen(tempListe);
            console.log("Personen", tempListe);

            // Berechnen Sie die Gesamtpunkte neu
            const newGesamtPunkte = tempListe.reduce((acc, person) => {
                for (const key in person) {
                    if (key !== 'id' && key !== 'spielerID' && key !== 'team' && key !== 'passwort') {
                        acc += parseInt(person[key]) || 0;
                    }
                }
                return acc;
            }, 0);
            setGesamtPunkte(newGesamtPunkte);
            console.log("Gesamtpunkte", newGesamtPunkte);
        });

        // Aufräumen bei Unmount
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        function getCookie(name) {
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        const userID = getCookie('userID');
        setUserID(userID);
        console.log("Angemeldeter Nutzer", userID); // Hier können Sie die userID verwenden
    }, []);

    const punkte = [
        "DNF",
        "0",
        "1",
        "2",
        "4",
        "6",
        "8",
        "10",
        "12",
        "15",
        "18",
        "25",
        "26"
    ];

    const handleSelectChange = (event, personId, field) => {
        const value = event.target.value;

        // Aktualisieren Sie das Dokument in der Datenbank
        const personRef = doc(db, 'personen', personId);
        updateDoc(personRef, {
            [field]: value
        });
    };

    return (
        <div className='table-container'>
            <ScrollArea type='never' className='scrollarea'>
                <Table striped bordered hover>
                    <thead className='thead-sticky'>
                        <tr>
                            <th>Pos</th>
                            <th>Fahrer</th>
                            <th>Konstrukteur</th>
                            <th><img src={Bahrain} alt="Bahrain" className='img-size'/></th>
                            <th><img src={SaudiArabien} alt="SaudiArabien" className='img-size'/></th>
                            <th><img src={Australien} alt="Australien" className='img-size'/></th>
                            <th><img src={Aserbaidschan} alt="Aserbeidschan" className='img-size'/></th>
                            <th><img src={USA} alt="Miami" className='img-size'/></th>
                            <th><img src={Italien} alt="Italien" className='img-size'/></th>
                            <th><img src={Monaco} alt="Monaco" className='img-size'/></th>
                            <th><img src={Spanien} alt="Spanien" className='img-size'/></th>
                            <th><img src={Kanada} alt="Kanada" className='img-size'/></th>
                            <th><img src={Österreich} alt="Österreich" className='img-size'/></th>
                            <th><img src={England} alt="England" className='img-size'/></th>
                            <th><img src={Ungarn} alt="Ungarn" className='img-size'/></th>
                            <th><img src={Belgien} alt="Belgien" className='img-size'/></th>
                            <th><img src={Niederlande} alt="Niederlande" className='img-size'/></th>
                            <th><img src={Singapur} alt="Singapur" className='img-size'/></th>
                            <th><img src={Japan} alt="Japan" className='img-size'/></th>
                            <th><img src={Katar} alt="Katar" className='img-size'/></th>
                            <th><img src={USA} alt="USA" className='img-size'/></th>
                            <th><img src={Mexiko} alt="Mexiko" className='img-size'/></th>
                            <th><img src={Brasilien} alt="Brasilien" className='img-size'/></th>
                            <th><img src={USA} alt="LasVegas" className='img-size'/></th>
                            <th><img src={AbuDhabi} alt="AbuDhabi" className='img-size'/></th>
                            <th>Gesamtpunkte</th>
                        </tr>
                        </thead>
                        <tbody>
                        {personen.map((person, index) => (
                        <tr key={index}>
                            <td></td> {/* Pos */}
                            <td>{person.spielerID}</td> {/* Fahrer */}
                            {/* Rest der Zellen */}
                            <td>{person.team}</td> {/* Konstrukteur */}
                            <td> {/* Bahrain */}
                            <select 
                                value={person.bahrain || ''}
                                disabled={person.id !== userID}
                                onChange={(e) => handleSelectChange(e, person.id, 'bahrain')}
                            >
                                <option selected value={null}></option>
                                {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                            </select>
                            </td>
                            <td> {/* SaudiArabien */}
                                <select 
                                    value={person.saudiarabien || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'saudiarabien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Australien */}
                                <select 
                                    value={person.australien || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'australien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Aserbaidschan */}
                                <select 
                                    value={person.aserbaidschan || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'aserbaidschan')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Miami */}
                                <select 
                                    value={person.miami || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'miami')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Italien */}
                                <select 
                                    value={person.italien || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'italien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Monaco */}
                                <select 
                                    value={person.monaco || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'monaco')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Spanien */}
                                <select 
                                    value={person.spanien || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'spanien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Kanada */}
                                <select 
                                    value={person.kanada || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'kanada')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Österreich */}
                                <select 
                                    value={person.österreich || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'österreich')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* England */}
                                <select 
                                    value={person.england || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'england')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Ungarn */}
                                <select 
                                    value={person.ungarn || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'ungarn')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Belgien */}
                                <select 
                                    value={person.belgien || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'belgien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Niederlande */}
                                <select 
                                    value={person.niederlande || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'niederlande')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Singapur */}
                                <select 
                                    value={person.singapur || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'singapur')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Japan */}
                                <select 
                                    value={person.japan || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'japan')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Katar */}
                                <select 
                                    value={person.katar || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'katar')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* USA */}
                                <select 
                                    value={person.usa || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'usa')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Mexiko */}
                                <select 
                                    value={person.mexiko || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'mexiko')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* Brasilien */}
                                <select 
                                    value={person.brasilien || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'brasilien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* LasVegas */}
                                <select 
                                    value={person.lasvegas || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'lasvegas')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td> {/* AbuDhabi */}
                                <select 
                                    value={person.abudhabi || ''}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'abudhabi')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td>{gesamtPunkte}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </div>
    );
}

export default TeilnehmerTabelle;