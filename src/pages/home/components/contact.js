import { Component } from 'react'
import { Row, Col, Image } from 'react-bootstrap'

import Title from './title'

import '../home.scss'

import messageimg from '../../../assets/decorations/message.svg'

class Contact extends Component {
    render() {
        return (
            <>
                <Title title='Contact us!' subtitle='Have a Question?' />
                <Row className='justify-content-around'>
                    <Col lg={4} className='mb-4'>
                        <div className='inner-shadow rounded-circle overflow-hidden'>
                            <Image className='mb-4 sidetoside' src={messageimg} fluid />
                        </div>
                    </Col>
                    <Col lg={5}>
                        <form className='mb-5 contact-form'>
                            <input placeholder='Name' type='text' className='contact-input' required />
                            <input placeholder='Email' type='text' className='contact-input my-4' required />
                            <textarea placeholder='Question' className='contact-input' required />
                            <button className='cta-btn-primary w-100 mat-btn mt-4'>Send</button>
                        </form>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Contact