import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LigaLogo from './LigaLogo.jpg';
import './header.css';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Registrierung from "../Registrierung/Registrierung";
import CloseButton from 'react-bootstrap/CloseButton';

const Header = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar className="navbar">
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
                        <Button className="loginButton" onClick={handleShow} variant="light">Login</Button>
                    </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Anmelden</Modal.Title>
                    <CloseButton onClick={handleClose} className="closeButton"/>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <Registrierung setShow={setShow}/>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default Header;