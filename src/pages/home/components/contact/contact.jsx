import React from 'react'
import { Row, Col, Image, Form } from "react-bootstrap";
import ReCaptcha from 'react-google-recaptcha'

import Title from '../../../../components/title/title'
import Loader from '../../../../components/loader/loader'
import Button from '../../../../components/button/button'
import { email } from '../../../../services/contact/api';

import './contact.scss'

import messageimg from '../../../../assets/decorations/message.svg'

class Contact extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            from_email: '',
            message: '',
            loading: false,
            email_sent: false,
            form_errors: '',
        }
        this.recaptchaRef = React.createRef();
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

    reset_state = () => {
        this.setState({
            email_sent: false,
            form_errors: '',
        })
    }

    handle_change = (evt) => {
        const { value, name } = evt.target
        this.setState({
            [name]: value,
        })
    }

    handle_submit = async (evt) => {
        evt.preventDefault();
        this.reset_state();
        if (!this.validate_recaptcha())
            return;
        this.start_loading();
        await this.send_email();
        this.stop_loading();

    }

    validate_recaptcha = () => {
        const recaptcha_valid = Boolean(this.recaptchaRef.current.getValue())
        if (!recaptcha_valid)
            this.setState({
                form_errors: { general_error: 'invalid recaptcha' },
            });
        return recaptcha_valid;
    }

    send_email = async () => {
        const { name, from_email, message } = this.state;
        const result = await email(name, from_email, message);
        if (result.error)
            this.handle_email_error(result.error);
        else
            this.setState({
                email_sent: true
            })

    }

    handle_email_error = (error) => {
        console.log(error.status)
        if (error.status === 400 && error.data)
            this.setState({
                form_errors: error.data,
            })
        else
            this.setState({
                form_errors: { general_error: 'failed to send email' },
            })
    }

    render() {
        const { email_sent, loading, form_errors, name, from_email, message } = this.state;
        return (
            <>
                <Loader show={loading} variant='secondary' />

                <Title title='Contact us!' subtitle='Have a question?' />
                <Row className='justify-content-around'>
                    <Col lg={4} className='mb-4'>
                        <div className='inner-shadow rounded-circle overflow-hidden'>
                            <Image className='mb-4 sidetoside' src={messageimg} fluid />
                        </div>
                    </Col>
                    <Col lg={5}>
                        <form onSubmit={this.handle_submit} action='' className='mb-5 contact-form'>
                            <Form.Group>
                                <Form.Control
                                    type='text' onChange={this.handle_change}
                                    value={name}
                                    placeholder='Name' name='name'
                                    className='contact-input' required
                                />
                                <span className='text-danger'>{form_errors['name']}</span>
                            </Form.Group>

                            <Form.Group className='my-4'>
                                <Form.Control
                                    onChange={this.handle_change} placeholder='Email'
                                    value={from_email}
                                    name='from_email' type='email'
                                    className='contact-input' required
                                />
                                <span className='text-danger'>{form_errors['email']}</span>
                            </Form.Group>

                            <div className='mb-4'>
                                <Form.Group>
                                    <Form.Control
                                        onChange={this.handle_change} placeholder='Message'
                                        name='message' as='textarea'
                                        value={message}
                                        className='contact-input' required
                                    />
                                </Form.Group>
                            </div>

                            <div className='mb-2'>
                                {email_sent ? <p className='text-success text-center'>Sent!</p> : <></>}
                                <p className='text-danger text-center'>{form_errors['general_error']}</p>
                            </div>


                            <div className='d-flex justify-content-center'>
                                <ReCaptcha
                                    className='mb-4'
                                    sitekey='6LeVaOsbAAAAALI_K5hwv7t0Bf1PbfDkshHgSeAH'
                                    ref={this.recaptchaRef}
                                />
                            </div>


                            <Button isButton={true} primary={true} className='w-100 outer-shadow'>Send</Button>

                        </form>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Contact