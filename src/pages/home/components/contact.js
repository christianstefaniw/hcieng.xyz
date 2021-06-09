import { Component } from 'react'
import { Row, Col, Image, Modal } from "react-bootstrap";

import Title from './title'
import Loader from '../../../components/loader/loader'

import '../home.scss'

import messageimg from '../../../assets/decorations/message.svg'
import email from '../../../services/email'

class Contact extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            from_email: '',
            message: '',
            loading: false,
            success_sent: null
        }
    }

    start_loading = () => {
        this.setState({
            loading: true
        })
    }

    stop_loading = () => {
        this.setState({
            loading: false
        })
    }

    reset_success_sent = () => {
        this.setState({
            success_sent: null
        })
    }

    handle_change = (evt) => {
        const value = evt.target.value;
        this.setState(prevState => ({
            ...prevState,
            [evt.target.name]: value,
        }))
    }

    handle_submit = async (evt) => {
        evt.preventDefault();
        let { name, from_email, message } = this.state;
        this.start_loading();
        let sent = await email(name, from_email, message);
        this.stop_loading();
        this.setState({
            success_sent: sent
        })
    }

    render() {
        return (
            <>
                <Loader show={this.state.loading} variant='secondary' />
                <Modal centered contentClassName='loading-modal' onHide={this.reset_success_sent} show={this.state.success_sent === true || this.state.success_sent === false}>
                    <h1 className='text-center'>{this.state.success_sent ? 'Sent!' : 'Error'}</h1>
                </Modal>
                <Title title='Contact us!' subtitle='Have a Question?' />
                <Row className='justify-content-around'>
                    <Col lg={4} className='mb-4'>
                        <div className='inner-shadow rounded-circle overflow-hidden'>
                            <Image className='mb-4 sidetoside' src={messageimg} fluid />
                        </div>
                    </Col>
                    <Col lg={5}>
                        <form onSubmit={this.handle_submit} action='' className='mb-5 contact-form'>
                            <input onChange={this.handle_change} placeholder='Name' name='name' type='text' className='contact-input' required />
                            <input onChange={this.handle_change} placeholder='Email' name='from_email' type='email' className='contact-input my-4' required />
                            <textarea onChange={this.handle_change} placeholder='Message' name='message' className='contact-input' required />
                            <button type='submit' className='cta-btn-primary w-100 mat-btn mt-4'>Send</button>
                        </form>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Contact