import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Feieremoji from './feier.png';

const Popup = () => {
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        const popupShown = document.cookie.split('; ').find(row => row.startsWith('popupShown'));
        if (popupShown) {
            setShowPopup(false);
        }
    }, []);

    const handleClose = () => {
        document.cookie = "popupShown=true; max-age=86400"; // Setzt das Cookie für 24 Stunden
        setShowPopup(false);
    };

    return (
        <>
            <Modal show={showPopup} onHide={handleClose}>
                <Modal.Body>
                    <div className="popup-container">
                        <div className="popup">
                            <h3><span role="img" aria-label="party" style={{fontSize: '30px'}}>🎉</span>Neuerungen auf der Webseite</h3>
                            <ul>
                                <li>Die Tabelle wird nun automatisch anhand der Gesamtpunkte sortiert</li>
                                <li>Gewinner wird im Punktebereich gold hinterlegt</li>
                                <li>Zweitplatzierter wird im Punktebereich silber hinterlegt</li>
                                <li>Drittplazierter wird im Punktebereich bronze hinterlegt</li>
                            </ul>
                            <div style={{textAlign: 'right'}}>
                                <Button onClick={handleClose} variant="success">Alles klar!</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Popup;