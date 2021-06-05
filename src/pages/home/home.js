import { Component } from 'react'
import { Row, Col, Container, Image } from "react-bootstrap";

import TopNav from './components/nav'

import './home.scss'

import landingcomputer from '../../assets/landing/landing-computer.svg'
import pinkcircle from '../../assets/decorations/pink-circle.svg'

class Home extends Component {
    render() {
        return (
            <>
                <TopNav />
                <div className='landing-nav-buffer' />
                <Container>
                    <Row className='justify-content-around'>
                        <Col lg={5} className='intro-text'>
                            <Image className="circle-1" src={pinkcircle} />
                            <h1 className="landing-title">
                                Humberside Collegiate Institute's Engineering<br></br>Club
                            </h1>
                            <div className='mt-3'>
                                <p className="text-muted">
                                    Learn how to solve real world problems through hands on projects and lots of other fun activities!
                                </p>
                            </div>
                            <div className='mt-4'>
                                <a href="#home" className="cta-btn-primary px-4 mat-btn">LEARN MORE</a>
                            </div>
                        </Col>
                        <Col lg={5}>
                            <Image className="circle-2" src={pinkcircle} />
                            <Image width='100%' src={landingcomputer} fluid />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Home