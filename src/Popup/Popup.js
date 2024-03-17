import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import MerkelGif from './merkel-party.gif';

const Popup = () => {
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        const popupShown = document.cookie.split('; ').find(row => row.startsWith('popupNewFeatures='));
        if (popupShown) {
            setShowPopup(false);
        }
    }, []);

    const handleClose = () => {
        document.cookie = "popupNewFeatures=true"; // Setzt das Cookie ohne Ablaufdatum
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
                                <li>Gewinner wird im Punktebereich gold hinterlegt</li>
                                <li>Zweitplatzierter wird im Punktebereich silber hinterlegt</li>
                                <li>Drittplazierter wird im Punktebereich bronze hinterlegt</li>
                                <li>Klicke auf den Namen der Fahrer um auf ihre Fahrerseite zu gelangen</li>
                                <li>Die Fahrerseite zeigt dir die bisherigen Ergebnisse des Fahrers</li>
                                <li>Bewerte den Fahrer (Bewertung mittels Sternen von 1 bis 5)</li>
                            </ul>
                            <div style={{textAlign: 'center'}}>
                                <img src={MerkelGif} alt="Merkel Party" style={{maxHeight: '300px', width: 'auto'}} />
                            </div>
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