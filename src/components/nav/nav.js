import { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoggedinContext from '../../providers/loggedin_provider'

import './nav.scss'

import logo from '../../assets/logos/hci-eng-logo-transparent.png'

class TopNav extends Component {
    static contextType = LoggedinContext;
   
    render() {
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
                        <Link to="/#contact">Contact</Link>
                        {
                            this.context.loggedin ?
                                <Link to="/account" className="cta-btn-primary mat-btn">ACCOUNT</Link> :
                                <Link to="/login" className="cta-btn-primary mat-btn">LOGIN</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNav