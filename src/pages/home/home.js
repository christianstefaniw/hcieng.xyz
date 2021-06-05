import { Component } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Lines from './components/lines'
import NavBar from './components/navbar'
import './home.scss'

import computer from '../../assets/landing/computer.svg'


class Home extends Component {
    render() {
        return (
            <>
                <NavBar />
                <Container className="mt-5">
                    <Row className="justify-content-between align-items-center">
                        <Col lg={5}>
                            <h5 class="subtitle">Learn, build, explore</h5>
                            <h1 className="title">
                                Humberside C.I.'s
                            <br></br>
                            Engineering Club
                        </h1>
                            <div className="text-muted">
                                <p>fewgregregrer fewgregregrer fewgregregrer fewgregregrer fewgregregrer fewgregregrer fewgregregrer fewgregregrer fewgregregrer</p>
                            </div>
                            <div>
                                <div>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </div>
                        </Col>
                        <Col lg={5}>
                            <Image width="100%" src={computer} fluid alt="decoration" />
                        </Col>
                    </Row>

                </Container>
            </>
        )
    }
}

export default Home