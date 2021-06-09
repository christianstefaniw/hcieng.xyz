import { Component } from 'react'
import { Container } from 'react-bootstrap'

import TopNav from '../../components/nav/nav'

import './login.scss'

class Login extends Component {
    render() {
        return (
            <>
                <TopNav loggedin={false} />
                <Container>
                    <div className='v-center-temp'>
                        <h2 className='text-center'>Online platfrom coming soon!</h2>
                    </div>
                </Container>
            </>
        )
    }
}

export default Login