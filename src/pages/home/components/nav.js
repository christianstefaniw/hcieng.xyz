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
                        src={ logo }
                        width="90"
                        height="79"
                        className="d-inline-block align-top"
                        alt="HCI Eng"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="w-100 justify-content-end">
                        <a href="#honm">Home</a>
                        <a href="#home">About</a>
                        <a href="#honm">Schedule</a>
                        <a href="#honm">Executives</a>
                        <a href="#home" className="cta-btn-primary mat-btn">LOGIN</a>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNav