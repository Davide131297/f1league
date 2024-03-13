import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LigaLogo from './LigaLogo.jpg';
import './header.css';

const Header = () => {
    return (
        <>
            <Navbar className="navbar" expand="lg">
                <Container>
                    <Navbar.Brand className="navbar-brand">
                        <img
                            alt=""
                            src={LigaLogo}
                            width="100"
                            height="100"
                            className="d-inline-block align-top"
                        />{' '}
                        <span className="title">Int-Legendz F1 Liga</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};
export default Header;