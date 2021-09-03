import { Navbar, Nav } from 'react-bootstrap'
import { HashLink as Link } from 'react-router-hash-link';

import Button from '../button/button';

import './nav.scss'

import logo from '../../assets/logos/hci-eng-logo-transparent.png'

export default function TopNav() {
    return (
        <Navbar bg="transparent" expand="lg">
            <Navbar.Brand href="/#home">
                <img
                    src={logo}
                    width="90"
                    height="79"
                    className="d-inline-block align-top logo"
                    alt="HCI Eng"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="w-100 justify-content-end">
                    <Link to="/#home">Home</Link>
                    <Link to="/#about">About</Link>
                    <Link to="/#execs">Executives</Link>
                    <Button primary={true} to="/#contact">CONTACT</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}