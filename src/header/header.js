import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LigaLogo from './LigaLogo.jpg';
import './header.css';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Registrierung from "../Registrierung/Registrierung";
import CloseButton from 'react-bootstrap/CloseButton';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

const Header = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isAuthenticated, setIsAuthenticated] = useState(getCookie('userID') ? true : false);
    const [showLogout, setShowLogout] = useState(false);
    const handleLogoutClose = () => setShowLogout(false);
    const handleLogoutShow = () => setShowLogout(true);
    const [adminID, setAdminID] = useState(null);
    
    const handleLogout = () => {
        const confirmLogout = window.confirm("Möchtest du dich wirklich ausloggen?");
        if (confirmLogout) {
            document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "adminrechte=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setIsAuthenticated(false);
            window.location.reload();
        }
    };

    useEffect(() => {
        function getCookie(name) {
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        const userID = getCookie('userID');
        setAdminID(userID);
    }, []);

    const getButtonText = () => {
        const adminRights = document.cookie.split('; ').find(row => row.startsWith('adminrechte='));
        return adminRights ? 'Admin Rechte deaktivieren' : 'Admin Rechte aktivieren';
    }

    const toggleAdminRights = () => {
        const adminRights = document.cookie.split('; ').find(row => row.startsWith('adminrechte='));
        if (adminRights) {
            // Wenn das Cookie existiert, löschen Sie es
            document.cookie = "adminrechte=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
            // Wenn das Cookie nicht existiert, erstellen Sie es
            document.cookie = "adminrechte=true";
        }
        window.location.reload();
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Admin Feld</Popover.Header>
          <Popover.Body>
            <Button onClick={toggleAdminRights}>{getButtonText()}</Button>
          </Popover.Body>
        </Popover>
    );

    return (
        <>
            <Navbar className="navbar">
                <Container>
                    <Navbar.Brand className="navbar-brand">
                        <img
                            alt=""
                            src={LigaLogo}
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                        />{' '}
                        <span className="title">Int-Legendz F1 Liga</span>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        {adminID === "BfdB6WOoEXvglEhpiuJh" && 
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                            <Button variant="info">Test</Button>
                        </OverlayTrigger>}
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {isAuthenticated === false ? 
                            <Button onClick={handleShow} variant="light">Login</Button> 
                            : 
                            <Button onClick={handleLogout} variant="light">Logout</Button>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Anmelden</Modal.Title>
                    <CloseButton onClick={handleClose} className="closeButton"/>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <Registrierung setShow={setShow} setIsAuthenticated={setIsAuthenticated}/>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default Header;