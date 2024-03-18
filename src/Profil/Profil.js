import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { SimpleGrid } from '@mantine/core';
import {
    Card,
    Image,
} from '@mantine/core';
import { Rating } from '@mantine/core';
import classes from'./Profil.css';
import f1helm from './f1helm.jpeg';
import { db } from '../utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Profiltabelle from './Profiltabelle';

import AlfaRomeo from './../Teamlogos/AlfaRomeo.png';
import Alpine from './../Teamlogos/Alpine.png';
import AstonMartin from './../Teamlogos/AstonMartin.png';
import Ferrari from './../Teamlogos/Ferrari.png';
import Haas from './../Teamlogos/Haas.png';
import McLaren from './../Teamlogos/Mclaren.png';
import Mercedes from './../Teamlogos/Mercedes.png';
import RedBull from './../Teamlogos/RedBull.png';
import Williams from './../Teamlogos/Williams.png';
import AlphaTauri from './../Teamlogos/AlphaTauri.png';

const Profil = () => {
    let { id } = useParams();
    const [person, setPerson] = useState(null);
    const [value, setValue] = useState(0);
    const [angemeldeterUserID, setAngemeldeterUserID] = useState(null);
    const [userRating, setUserRating] = useState(null);

    const teamLogos = {
      //  'Alfa Romeo': AlfaRomeo,
      //  'Alpine': Alpine,
        'Aston Martin': AstonMartin,
        'Ferrari': Ferrari,
       // 'Haas': Haas,
        'McLaren': McLaren,
        'Mercedes': Mercedes,
        'Red Bull': RedBull,
        'Williams': Williams,
      //  'AlphaTauri': AlphaTauri
    };

    //Auslesen der Daten aus der Datenbank
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'personen', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const personData = docSnap.data();
                setPerson(personData);
                setValue(personData.bewertung || 0); // Setzen den Wert auf person.bewertung, wenn es existiert, sonst auf 0
                console.log("Document data:", personData);
            } else {
                console.log("Kein solches Dokument!");
            }
        };
        fetchData();
    }, [id]);

    //Ausgabe der Bewertung
    useEffect(() => {
        console.log(value);
    }, [value]);

    //Aktualisierung der Bewertung in der Datenbank
    useEffect(() => {
        const updateRating = async () => {
            if (userRating === null) return; // Führen Sie den Code nur aus, wenn der Benutzer eine Bewertung abgegeben hat
    
            const docRef = doc(db, 'personen', id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists() && angemeldeterUserID && person) {
                const data = docSnap.data();
                const newRatings = {...(data.bewertungen || {}), [angemeldeterUserID]: userRating};
                const averageRating = Object.values(newRatings).reduce((a, b) => a + b, 0) / Object.values(newRatings).length;
    
                await updateDoc(docRef, {
                    bewertung: averageRating,
                    bewertungen: newRatings
                });
    
                const userDocRef = doc(db, 'personen', angemeldeterUserID);
                await updateDoc(userDocRef, {
                    [`bewertet.${person.spielerID}`]: userRating
                });
            }
        };
        updateRating();
    }, [userRating, id, angemeldeterUserID, person]); // Abhängigkeit von userRating statt value

    //Ausgabe der Bewertung aus der Datenbank
    useEffect(() => {
        if (person && person.bewertung) {
            console.log(`Die Bewertung aus der Datenbank ist ${person.bewertung}.`);
        }
    }, [person]);

    //Auslesen der ID des angemeldeten Users
    useEffect(() => {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            if (name.trim() === 'userID') {
                setAngemeldeterUserID(value);
                console.log(`Die ID des angemeldeten Users ist ${value}.`);
            }
        });
    }, []);

    const teamColors = {
        'Ferrari': 'red',
        'Mercedes': '#788086',
        'McLaren': '#fc8404',
        'Red Bull': 'darkblue',
        'Alpine': '#041c2c',
        'AlphaTauri': '#040505',
        'Aston Martin': 'green',
        'Alfa Romeo': 'red',
        'Haas': 'red',
        'Williams': '#049cdc'
    };

    return (
        <React.Fragment>

            <SimpleGrid cols={2} spacing="sm">

                <div id='links'>
                    <Card withBorder padding="lg" spacing="xl" radius="md" className={classes.card}>
                        <Card.Section mb="sm">
                            <Image
                            src={f1helm}
                            height={250}
                            />
                        </Card.Section>

                        <Card.Section>
                            <div className='profildaten'>
                                {person && <span id="spielername" style={{color: teamColors[person.team]}}>{person.spielerID}</span>}
                                <br></br>
                                {person && <span id="spielerinfos">Team: {person.team}</span>}
                                <br></br>
                                {person && <span id="spielerinfos">Punkte: {person.gesamtPunkte}</span>}
                            </div>
                        </Card.Section>

                        <Card.Section className={classes.footer}>
                            <div className='profildaten'>
                                <span id='fahrerbewertung'>
                                Fahrer bewerten
                                </span>
                                    <Rating value={value} onChange={(newValue) => {
                                        if (angemeldeterUserID) {
                                            setValue(newValue);
                                            setUserRating(newValue); // Aktualisiert userRating, wenn der Benutzer eine Bewertung abgibt
                                        } else {
                                            alert('Bitte melde dich an, um eine Bewertung abzugeben.');
                                        }
                                    }} />
                            </div>
                        </Card.Section>
                    </Card>
                </div>

                <div id='rechts'>
                    <Profiltabelle person={person} />
                </div>
            </SimpleGrid>

            {person && person.team && (
            <div id='teamlogo'>
                <img src={teamLogos[person.team]} alt={person.team} style={{width: '300px', height: '300px', objectFit: 'contain'}} />
            </div>
        )}


        </React.Fragment>
    );
};

export default Profil;