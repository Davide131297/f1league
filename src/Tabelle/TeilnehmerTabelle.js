import React, { useEffect, useState } from 'react';
import { db } from './../utils/firebase';
import { collection, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import './TeilnehmerTabelle.css';
import { ScrollArea } from '@mantine/core';
import {useNavigate} from 'react-router-dom';
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
    const navigate = useNavigate();

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
            tempListe.sort((a, b) => b.gesamtPunkte - a.gesamtPunkte);
            setPersonen(tempListe);
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
    }, []);

    const punkte = [
        "0",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        15,
        16,
        18,
        19,
        25,
        26
    ];

    const handleSelectChange = async (event, personId, field) => {
        let value = parseInt(event.target.value);
        console.log('Value: ', value);

        // Wenn value null ist, beenden Sie die Funktion frühzeitig
        if (value === null) {
            return;
        }

        // Aktualisieren Sie das Dokument in der Datenbank
        const personRef = doc(db, 'personen', personId);

        // Aktualisieren Sie das Dokument mit dem neuen Wert
        await updateDoc(personRef, {
            [field]: value
        });

        // Holen Sie das aktualisierte Dokument
        const personDoc = await getDoc(personRef);

        // Holen Sie alle Daten aus dem Dokument
        let personData = personDoc.data();

        // Initialisieren Sie gesamtPunkte mit 0
        let gesamtPunkte = 0;

        // Durchlaufen Sie alle Attribute in den Daten
        for (let attribute in personData) {
            // Überprüfen Sie, ob der Wert ein Integer ist und das Attribut nicht gesamtPunkte ist
            if (attribute !== 'gesamtPunkte' && Number.isInteger(personData[attribute])) {
                // Addieren Sie den Wert zu gesamtPunkte
                gesamtPunkte += personData[attribute];
            }
        }

        // Aktualisieren Sie das Dokument mit gesamtPunkte
        await updateDoc(personRef, {
            gesamtPunkte: gesamtPunkte
        });

        console.log('PersonenID: ', personId, 'Feld: ', field, 'Wert: ', value);
        console.log('Gesamtpunkte: ', gesamtPunkte);
    };

    function getCellStyle(value) {
        if (value === 25 || value === 26) {
            return { backgroundColor: 'gold' };
        }
        if (value === 18 || value === 19) {
            return { backgroundColor: 'silver' };
        }
        if (value === 15 || value === 16) {
            return { backgroundColor: 'peru' };
        }
        return { backgroundColor: 'transparent' };
    }

    const handleClick = (name) => {
        navigate(`/f1league/profil/${name}`);
    }

    return (
        <div className='table-container'>
            <ScrollArea type='never' className='scrollarea'>
                <Table striped bordered hover>
                    <thead className='thead-sticky'>
                        <tr>
                            <th>Pos</th>
                            <th id='fahrer'>Fahrer</th>
                            <th style={{zIndex: '10'}}>Konstrukteur</th>
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
                            <td>{index + 1}</td> {/* Pos */}
                            <td className='fahrer' onClick={() => handleClick(person.spielerID)}>{person.spielerID}</td> {/* Fahrer */}
                            <td>{person.team}</td> {/* Konstrukteur */}
                            <td style={getCellStyle(person.bahrain)}> {/* Bahrain */}
                            <select 
                                value={person.bahrain === null ? '' : person.bahrain}
                                disabled={person.id !== userID}
                                onChange={(e) => handleSelectChange(e, person.id, 'bahrain')}
                            >
                                <option value={null}></option>
                                {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                            </select>

                            </td>
                            <td style={getCellStyle(person.saudiarabien)}> {/* SaudiArabien */}
                                <select 
                                    value={person.saudiarabien === null ? '' : person.saudiarabien}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'saudiarabien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.australien)}> {/* Australien */}
                                <select 
                                    value={person.australien === null ? '' : person.australien}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'australien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.aserbaidschan)}> {/* Aserbaidschan */}
                                <select 
                                    value={person.aserbaidschan === null ? '' : person.aserbaidschan}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'aserbaidschan')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.miami)}> {/* Miami */}
                                <select 
                                    value={person.miami === null ? '' : person.miami}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'miami')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.italien)}> {/* Italien */}
                                <select 
                                    value={person.italien === null ? '' : person.italien}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'italien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.monaco)}> {/* Monaco */}
                                <select 
                                    value={person.monaco === null ? '' : person.monaco}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'monaco')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.spanien)}> {/* Spanien */}
                                <select 
                                    value={person.spanien === null ? '' : person.spanien}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'spanien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.kanada)}> {/* Kanada */}
                                <select 
                                    value={person.kanada === null ? '' : person.kanada}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'kanada')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.österreich)}> {/* Österreich */}
                                <select 
                                    value={person.österreich === null ? '' : person.österreich}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'österreich')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.england)}> {/* England */}
                                <select 
                                    value={person.england === null ? '' : person.england}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'england')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.ungarn)}> {/* Ungarn */}
                                <select 
                                    value={person.ungarn === null ? '' : person.ungarn}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'ungarn')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.belgien)}> {/* Belgien */}
                                <select 
                                    value={person.belgien === null ? '' : person.belgien}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'belgien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.niederlande)}> {/* Niederlande */}
                                <select 
                                    value={person.neiderlande === null ? '' : person.niederlande}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'niederlande')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.singapur)}> {/* Singapur */}
                                <select 
                                    value={person.singapur === null ? '' : person.singapur}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'singapur')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.japan)}> {/* Japan */}
                                <select 
                                    value={person.japan === null ? '' : person.japan}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'japan')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.katar)}> {/* Katar */}
                                <select 
                                    value={person.katar === null ? '' : person.katar}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'katar')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.usa)}> {/* USA */}
                                <select 
                                    value={person.usa === null ? '' : person.usa}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'usa')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.mexiko)}> {/* Mexiko */}
                                <select 
                                    value={person.mexiko === null ? '' : person.mexiko}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'mexiko')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.brasilien)}> {/* Brasilien */}
                                <select 
                                    value={person.brasilien === null ? '' : person.brasilien}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'brasilien')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.lasvegas)}> {/* LasVegas */}
                                <select 
                                    value={person.lasvegas === null ? '' : person.lasvegas}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'lasvegas')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td style={getCellStyle(person.abudhabi)}> {/* AbuDhabi */}
                                <select 
                                    value={person.abudhabi === null ? '' : person.abudhabi}
                                    disabled={person.id !== userID}
                                    onChange={(e) => handleSelectChange(e, person.id, 'abudhabi')}
                                >
                                    <option selected value={null}></option>
                                    {punkte.map((punkt, i) => <option key={i} value={punkt}>{punkt}</option>)}
                                </select>
                            </td>
                            <td>{person.gesamtPunkte || 0}</td> {/* Gesamtpunkte */}
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </div>
    );
}

export default TeilnehmerTabelle;