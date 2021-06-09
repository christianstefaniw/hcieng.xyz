import { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import './footer.scss'


class Footer extends Component {
    render() {
        return (
            <div className='py-5 mt-5' style={{backgroundColor: '#F5F5F5'}}>
                <Container className='text-muted text-center'>
                    <Row className='justify-content-center my-4'>
                        <Col xs={2}>
                            <a href="https://www.instagram.com/hci.eng">
                                <div className="social-btn">
                                    <i className="fa-2x fab fa-instagram"></i>
                                </div>
                            </a>
                        </Col>
                        <Col xs={2}>
                            <a href="https://github.com/hciengclub">
                                <div className="social-btn">
                                    <i className="fa-2x fab fa-github"></i>
                                </div>
                            </a>
                        </Col>
                        <Col xs={2}>
                            <a href="https://classroom.google.com/c/MzUwMzE5NzA3NjIw?cjc=yi5yzyj">
                                <div className="social-btn">
                                    <i className="fa-2x fab fa-google"></i>
                                </div>
                            </a>
                        </Col>
                    </Row>
                    <p>© Humerside CI Engineer Club. All rights reserved</p>
                </Container>
            </div>
        )
    }
}

export default Footer