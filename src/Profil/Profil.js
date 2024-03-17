import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea, SimpleGrid } from '@mantine/core';
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

const Profil = () => {
    let { id } = useParams();
    const [person, setPerson] = useState(null);
    const [value, setValue] = useState(0);
    const [angemeldeterUserID, setAngemeldeterUserID] = useState(null);
    const [userRating, setUserRating] = useState(null);


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
                            {person && <span id="spielername">{person.spielerID}</span>}
                            <br></br>
                            {person && <span id="spielerinfos">Team: {person.team}</span>}
                            <br></br>
                            {person && <span id="spielerinfos">Punkte: {person.gesamtPunkte}</span>}
                        </Card.Section>

                        <Card.Section className={classes.footer}>
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
                        </Card.Section>
                    </Card>
                </div>

                <div id='rechts'>
                    <Profiltabelle person={person} />
                </div>
            </SimpleGrid>
        </React.Fragment>
    );
};

export default Profil;