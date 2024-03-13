import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LigaLogo from './LigaLogo.jpg';
import './header.css';
import { Button } from "react-bootstrap";

const Header = () => {
    return (
        <>
            <Navbar className="navbar" expand="lg">
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
                        <Button variant="light">Login</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
export default Header;