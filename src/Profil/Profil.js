import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { SimpleGrid } from '@mantine/core';
import {
    Card,
    Image,
} from '@mantine/core';
import classes from'./Profil.css';
import f1helm from './f1helm.jpeg';
import { db } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Profiltabelle from './Profiltabelle';
import { FaUserEdit } from "react-icons/fa";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Input, Button, Divider, Select } from '@mantine/core';

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
    const [siege, setSiege] = useState(0);
    const [opened, { open, close }] = useDisclosure(false);
    const [spielerID, setSpielerID] = useState('');
    const [team, setTeam] = useState('');
    const [reload, setReload] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const teamLogos = {
        'Aston Martin': AstonMartin,
        'Ferrari': Ferrari,
        'McLaren': McLaren,
        'Mercedes': Mercedes,
        'Red Bull': RedBull,
        'Williams': Williams,
        'Alpine': Alpine,
        'AlphaTauri': AlphaTauri,
        'Alfa Romeo': AlfaRomeo,
        'Haas': Haas
    };

    //Auslesen der Daten aus der Datenbank
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'personen', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const personData = docSnap.data();
                setPerson(personData);
                setSpielerID(personData.spielerID);
                setTeam(personData.team);
                console.log("Document data:", personData);

                const cookies = document.cookie.split('; ');
                const userIDCookie = cookies.find(row => row.startsWith('userID'));
                if (userIDCookie) {
                    const userID = userIDCookie.split('=')[1];
                    setIsLoggedIn(userID === personData.id);
                }

                // Berechnung der Siege
                let siege = 0;
                for (let key in personData) {
                    if (key !== 'id' && key !== 'passwort' && key !== 'spielerID' && key !== 'team' && key !== 'gesamtPunkte') {
                        if (personData[key] === 25 || personData[key] === 26) {
                            siege++;
                        }
                    }
                }
                console.log("Anzahl der Siege:", siege);
                setSiege(siege);
            } else {
                console.log("Kein solches Dokument!");
            }
        };
        fetchData();
    }, [id, reload]);

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

    function abbrechen() {
        console.log("Abbrechen");
        close();
    }

    function speichern() {
        const docRef = doc(db, 'personen', id);
        const newSpielerID = spielerID !== '' ? spielerID : person.spielerID;
        const newTeam = team !== '' ? team : person.team;
        setDoc(docRef, { spielerID: newSpielerID, team: newTeam }, { merge: true })
            .then(() => {
                console.log("Änderungen erfolgreich geschrieben!");
                setReload(!reload);
                close();
            })
            .catch((error) => {
                console.error("Fehler beim Schreiben des Dokuments: ", error);
            });
    }

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
                            <div className='profildaten' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    {person && <span id="spielername" style={{color: teamColors[person.team]}}>{person.spielerID}</span>}
                                    <br></br>
                                    {person && <span className="spielerinfos">Team: {person.team}</span>}
                                    <br></br>
                                    {person && <span className="spielerinfos">Punkte: {person.gesamtPunkte}</span>}
                                    <br></br>
                                    {person && <span className="spielerinfos">Siege: {siege}</span>}
                                </div>
                                {isLoggedIn && <FaUserEdit size={20} className='userEdit' onClick={open}/>}
                            </div>
                        </Card.Section>
                    </Card>
                </div>

                <div id='rechts'>
                    <Profiltabelle person={person} />
                </div>
            </SimpleGrid>

            {person && person.team && (
                <div id='teamlogo' style={{marginTop: '-20px'}}>
                    <img 
                        src={teamLogos[person.team]} 
                        alt={person.team} 
                        style={{
                            width: person.team === 'Ferrari' ? '200px' : 
                            (person.team === 'Williams' ? '150px' : 
                            (person.team === 'Alpine' ? '150px' : 
                            (person.team === 'AlfaRomeo' ? '150px' : 
                            (person.team === 'Haas' ? '150px' : 
                            (person.team === 'AlphaTauri' ? '150px' : '300px'))))),
                            height: person.team === 'Ferrari' ? '150px' : (person.team === 'Williams' ? '150px' : '300px'), 
                            marginTop: person.team === 'Ferrari' ? '40px' 
                                : (person.team === 'Williams' ? '30px' 
                                    : (person.team === 'McLaren' ? '-40px' 
                                        : (person.team === 'Red Bull' ? '-50px' 
                                            : (person.team === 'Aston Martin' ? '-40px' 
                                                : (person.team === 'Mercedes' ? '-35px'
                                                : (person.team === 'Alpine' ? '-30px'
                                                : (person.team === 'AlphaTauri' ? '-30px'
                                                : (person.team === 'Haas' ? '-30px'
                                                : (person.team === 'Alfa Romeo' ? '-30px' : '0px'))))))))),
                            objectFit: 'contain'
                        }} 
                    />
                </div> 
            )}

                <Modal
                    opened={opened}
                    onClose={close}
                    withCloseButton={false}
                    closeOnClickOutside={false}
                    centered
                    title={
                        <h2>
                            Profildaten bearbeiten
                        </h2>
                    }
                >
                    <Divider />
                    <div id='modalinputs'>
                    <Input.Wrapper label="Spieler-ID ändern">
                        <Input placeholder="Spieler-ID" value={spielerID} onChange={(e) => setSpielerID(e.target.value)}/>
                    </Input.Wrapper>
                    <Select
                        label="Team ändern"
                        placeholder="Team auswählen"
                        value={team}
                        onChange={(value) => setTeam(value)}
                        data={[
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
                        ]}
                        searchable
                    />
                    </div>

                    <div id='modalButtons'>
                        <Button variant="filled" color="red" onClick={abbrechen}>Abbrechen</Button>
                        <Button variant="filled" color="rgba(0, 153, 10, 1)" style={{marginLeft: '10px'}} onClick={speichern}>Speichern</Button>
                    </div>
                </Modal>

        </React.Fragment>
    );
};

export default Profil;