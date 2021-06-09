import { Component } from 'react'
import { Row, Col, Image } from "react-bootstrap";

import '../home.scss'

import landingcomputer from '../../../assets/landing/landing-computer.svg'
import pinkcircle from '../../../assets/decorations/pink-circle.svg'

class Landing extends Component {
    render() {
        return (
            <>
                <Image className="circle-1" src={pinkcircle} />
                <Image className="circle-2" src={pinkcircle} />
                <Row className='justify-content-around'>
                    <Col lg={5} className='intro-text'>

                        <h1 className="landing-title">
                            Humberside Collegiate Institute's Engineering<br></br>
                                        Club
                                    </h1>
                        <div className='mt-3'>
                            <p className="text-muted">
                                Learn how to solve real world problems through hands on projects and lots of other fun activities!
                                        </p>
                        </div>
                        <div className='mt-4'>
                            <a target='_blank' rel='noreferrer'
                                href='https://classroom.google.com/c/MzUwMzE5NzA3NjIw?cjc=yi5yzyj'
                                className='cta-btn-primary px-4 mat-btn'
                            >
                                JOIN NOW
                            </a>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <Image width='90%' src={landingcomputer} fluid />
                    </Col>
                </Row>
            </>
        )
    }
}

export default Landing