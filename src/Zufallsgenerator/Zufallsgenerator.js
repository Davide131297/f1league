import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { db } from '../utils/firebase';
import { doc, getDoc, updateDoc, getDocs, where, collection, query } from 'firebase/firestore';
import { notifications } from '@mantine/notifications';

const Zufallsgenerator = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [randomTeam, setRandomTeam] = useState('');
    const [angemeldeterSpieler, setAngemeldeterSpieler] = useState('');
    const [userHasTeam, setUserHasTeam] = useState('');

    function handleClose() {
        setShowPopup(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            const userID = getCookie("userID");
            setAngemeldeterSpieler(userID);
            if (userID !== undefined && userID !== "") {
                const docRef = doc(db, 'personen', userID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Dokument existiert!", docSnap.data());
                    if (docSnap.data().team) {
                        setUserHasTeam('true');
                        setShowPopup(false);
                        console.log("User hat bereits ein Team!");
                    } else {
                        setUserHasTeam('false');
                        setShowPopup(true);
                        console.log("User hat noch kein Team!");
                    }
                } else {
                    console.log("Kein solches Dokument!");
                }
            }
        };
        fetchData();
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const teams = [
        "Mercedes", 
        "Red Bull", 
        "Ferrari", 
        "McLaren", 
        "Aston Martin", 
       // "Alpine", 
       // "AlphaTauri", 
       // "Alfa Romeo", 
        "Williams", 
       // "Haas"
    ];

    const generateRandomTeam = () => {
        const randomIndex = Math.floor(Math.random() * teams.length);
        setRandomTeam(teams[randomIndex]);
    };

    const assignRandomTeam = async () => {
        const randomIndex = Math.floor(Math.random() * teams.length);
        const newRandomTeam = teams[randomIndex];
        const docRef = doc(db, 'personen', angemeldeterSpieler);

        // Überprüfen, wie viele Spieler bereits das ausgewählte Team haben
        const teamQuery = query(collection(db, 'personen'), where('team', '==', newRandomTeam));
        const querySnapshot = await getDocs(teamQuery);
        const teamCount = querySnapshot.size;

        if (teamCount >= 2) {
            alert("Ups, dieses Team ist bereits voll, bitte drücke nochmal");
            return;
        }

        await updateDoc(docRef, { team: newRandomTeam });

        const updatedDocSnap = await getDoc(docRef);
        if (updatedDocSnap.exists() && updatedDocSnap.data().team) {
            setUserHasTeam("true");
            setShowPopup(false);
            notifications.show({
                title: 'Team Zuweisung',
                message: 'Du wurdest erfolgreich einem Team zugewiesen!',
            });
        } else {
            setUserHasTeam("false");
        }
    };

    return (
        <>
            <Modal show={showPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Zufallsgenerator
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Das zufällige Team ist:</p>
                    <h1>{randomTeam}</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={generateRandomTeam}>Zufallsgenerator ausprobieren</Button>
                    <Button variant="success" onClick={assignRandomTeam} disabled={userHasTeam === "true"}>Hier Team losen</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Zufallsgenerator;