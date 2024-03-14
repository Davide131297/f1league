import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LigaLogo from './LigaLogo.jpg';
import './header.css';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Registrierung from "../Registrierung/Registrierung";
import CloseButton from 'react-bootstrap/CloseButton';

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
    
    const handleLogout = () => {
        const confirmLogout = window.confirm("Möchtest du dich wirklich ausloggen?");
        if (confirmLogout) {
            document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setIsAuthenticated(false);
        }
    };

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