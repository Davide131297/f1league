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


const Profil = () => {
    let { id } = useParams();
    const [person, setPerson] = useState(null);
    const [value, setValue] = useState(0);

    //Auslesen der Daten aus der Datenbank
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'personen', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPerson(docSnap.data());
                console.log("Document data:", docSnap.data());
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
            const docRef = doc(db, 'personen', id);
            await updateDoc(docRef, {
                bewertung: value
            });
        };
        updateRating();
    }, [value, id]);

    useEffect(() => {
        if (person && person.bewertung) {
            console.log(`Die Bewertung aus der Datenbank ist ${person.bewertung}.`);
        }
    }, [person]);

    return (
        <React.Fragment>
            <div>
                <h1>Test</h1>
                <p>ID: {id}</p>
                {person && <p>Fahrer: {person.spielerID}</p>}
            </div>
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
                            <Rating value={value} onChange={setValue} />
                        </Card.Section>
                    </Card>
                </div>

                <div id='rechts'>
                    2
                </div>
            </SimpleGrid>
        </React.Fragment>
    );
};

export default Profil;