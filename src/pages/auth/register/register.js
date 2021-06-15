import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopNav from '../../../components/nav/nav'
import { OauthRegister, register } from './services'
import history from '../../../history';
import AccountContext from '../../../providers/account_provider'

import '../auth.scss'


class Register extends Component {
    static contextType = AccountContext;

    constructor() {
        super();
        this.state = {
            show_pass_first: false,
            show_pass_second: false,
            fields: {},
            errors: {}
        };
    }

    start_loading = () => {
        this.setState({
            loading: true
        });
    }

    stop_loading = () => {
        this.setState({
            loading: false
        });
    }

    validate_name(name) {
        if (!name) {
            return 'cannot be empty';
        } else {
            if (!name.match(/^[a-zA-Z]+$/))
                return 'only letters';
        }
        return null;
    }

    validate_email(email) {
        if (!email)
            return 'cannot be empty';
        return null;
    }

    validate_passwords(pass1, pass2) {
        if (pass1 !== pass2)
            return 'passwords do not match';

        if (pass2.length < 8)
            return 'password must be longer than 8';

        if (pass2.replace(/[^0-9]/g, '').length < 2)
            return 'password must have at least 2 numbers';

        if (pass2.replace(/[^A-Z]/g, '').length < 1)
            return 'password must have at least one uppercase'

        return null;
    }

    handle_validation = () => {
        let errors = {};
        let fields = this.state.fields;

        let email_invalid_msg = this.validate_email(fields.email);
        if (email_invalid_msg)
            errors['email'] = email_invalid_msg;

        let first_name_invalid_msg = this.validate_name(fields.first_name);
        if (first_name_invalid_msg)
            errors['first_name'] = first_name_invalid_msg;

        let last_name_invalid_msg = this.validate_name(fields.last_name);
        if (last_name_invalid_msg)
            errors['last_name'] = last_name_invalid_msg;

        let passwords_invalid_msg = this.validate_passwords(fields.password_1, fields.password_2);
        if (passwords_invalid_msg)
            errors['password_2'] = passwords_invalid_msg;

        let valid = !Boolean(Object.keys(errors).length);
        if (!valid)
            this.setState({ errors });

        return valid;
    }

    handle_change = (evt) => {
        const value = evt.target.value;
        let fields = this.state.fields;
        fields[evt.target.name] = value;
        this.setState({ fields })
    }

    handle_submit = async (evt) => {
        evt.preventDefault();
        if (!this.handle_validation())
            return
        let { email, first_name, last_name, password_2 } = this.state.fields;
        this.start_loading();
        await register(email, first_name, last_name, password_2, this.context.add_account_info);
        this.stop_loading();
        history.push('/account');
    }

    toggle_show_first_pass = () => {
        this.setState(prev_state => ({ show_pass_first: !prev_state.show_pass_first }))
    }

    toggle_show_second_pass = () => {
        this.setState(prev_state => ({ show_pass_second: !prev_state.show_pass_second }))
    }

    render() {
        return (
            <>
                <TopNav />
                <Container className='register-container'>
                    <div>
                        <div className='auth-text'>
                            <h3 className='mb-1'>REGISTER FOR ENG CLUB</h3>
                            <p className='text-muted'>join the eng community at humberside</p>
                        </div>
                        <form className='auth' action='' onSubmit={this.handle_submit} >
                            <div>
                                <input value={this.state.fields['email']} name='email' onChange={this.handle_change} placeholder='email' type='email' required />
                                <span className='text-danger'>{this.state.errors['email']}</span>
                            </div>
                            <Row>
                                <Col lg={6}>
                                    <input value={this.state.fields['first_name']} name='first_name' onChange={this.handle_change} placeholder='first name' type='text' required />
                                    <span className='text-danger'>{this.state.errors['first_name']}</span>
                                </Col>
                                <Col lg={6}>
                                    <input value={this.state.fields['last_name']} name='last_name' onChange={this.handle_change} placeholder='last name' type='text' required />
                                    <span className='text-danger'>{this.state.errors['last_name']}</span>
                                </Col>
                            </Row>
                            <div className='d-flex'>
                                <input value={this.state.fields['password_1']} name='password_1' onChange={this.handle_change} placeholder='password' type={this.state.show_pass_first ? 'text' : 'password'} required />
                                <i onClick={this.toggle_show_first_pass}><FontAwesomeIcon icon={faEye} /></i>
                            </div>
                            <div>
                                <div className='d-flex'>
                                    <input value={this.state.fields['password_2']} name='password_2' onChange={this.handle_change} placeholder='re-enter password' type={this.state.show_pass_second ? 'text' : 'password'} required />
                                    <i onClick={this.toggle_show_second_pass}><FontAwesomeIcon icon={faEye} /></i>
                                </div>
                                <span className='text-danger'>{this.state.errors['password_2']}</span>
                            </div>
                            <button type='submit' className='cta-btn-primary w-100 mat-btn outer-shadow'>Register</button>
                        </form>
                        <div className="strike my-3">
                            <span className='text-muted'>or sign up with google</span>
                        </div>
                        <div className='text-center'>
                            <GoogleLogin
                                clientId="835439685490-8j1kg7tk53vhflhp5n9ifmrs164mmbom.apps.googleusercontent.com"
                                buttonText='Sign up With Google'
                                onSuccess={
                                    async (response) => {
                                        await OauthRegister.oauth_register_from_response(response, this.context.add_account_info);
                                        history.push('/account');
                                    }}
                            />
                        </div>

                    </div>
                </Container>
            </>
        )
    }
}

export default Register