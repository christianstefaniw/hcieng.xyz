import { Component } from 'react'
import { Row, Col, Container, Image } from "react-bootstrap";

import TopNav from './components/nav'
import WhatWeOfferCard from './components/what-we-offer-card'

import './home.scss'

import landingcomputer from '../../assets/landing/landing-computer.svg'
import pinkcircle from '../../assets/decorations/pink-circle.svg'
import projecticon from '../../assets/icons/what-we-offer/projects.svg'
import presentationicon from '../../assets/icons/what-we-offer/presentations.svg'
import speakersicon from '../../assets/icons/what-we-offer/speakers.svg'

class Home extends Component {
    render() {
        return (
            <>
                <Image className="circle-1" src={pinkcircle} />
                <Image className="circle-2" src={pinkcircle} />
                <div>
                    <TopNav />
                    <div className='landing-nav-buffer' />
                    <Container>
                        <Row className='justify-content-around'>
                            <Col lg={5} className='intro-text'>

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
                                <Image width='95%' src={landingcomputer} fluid />
                            </Col>
                        </Row>
                        <div style={{ marginTop: '11rem', marginBottom: '10rem' }}>
                            <div className='w-100 text-center' style={{ marginBottom: '4rem' }}>
                                <p className='text-secondary mb-0'>Our Club</p>
                                <h2>What we offer?</h2>
                            </div>

                            <Row className='justify-content-around'>
                                <Col className='mb-5' lg={3}>
                                    <WhatWeOfferCard
                                        icon={projecticon}
                                        title="Real World Projects"
                                        content="Build practical real world projects such as engines."
                                    />
                                </Col>
                                <Col className='mb-5' lg={3}>
                                    <WhatWeOfferCard
                                        icon={presentationicon}
                                        title="STEM Presentations"
                                        content="Learn about STEM University programs and real world theory of engineering projects."
                                    />
                                </Col>
                                <Col className='mb-5' lg={3}>
                                    <WhatWeOfferCard
                                        icon={speakersicon}
                                        title="Engineer Speakers"
                                        content="Talk to Engieering professionals about their field and experiences."
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    </div>
            </>
        )
    }
}

export default Home