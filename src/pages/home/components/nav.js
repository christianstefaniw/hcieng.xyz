import { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import '../home.scss'

import logo from '../../../assets/logos/hci-eng-logo-transparent.png'

class TopNav extends Component {
    render() {
        return (
            <Navbar bg="transparent" expand="lg">
                <Navbar.Brand href="#home">
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
                        <a href='#home'>Home</a>
                        <a href="#about">About</a>
                        <a href='#execs'>Executives</a>
                        <a href='#contact'>Contact</a>
                        <a href="#login" className="cta-btn-primary mat-btn">LOGIN</a>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNav