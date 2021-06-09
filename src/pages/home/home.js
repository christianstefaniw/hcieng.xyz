import { Component } from 'react'
import { Container } from "react-bootstrap";

import TopNav from '../../components/nav/nav'
import About from './components/about'
import Landing from './components/landing'
import Contact from './components/contact'
import Footer from '../../components/footer/footer'

import './home.scss'

class Home extends Component {
    render() {
        return (
            <div id='home'>
                <TopNav loggedin={false} />
                <div className='nav-spacing-buffer' />
                <Container>
                    <section >
                        <Landing />
                    </section>
                    <div className='spacing-buffer'></div>
                    <section id='about'>
                        <About />
                    </section>
                    <div className='spacing-buffer'></div>
                    <section id='contact'>
                        <Contact start_loading={this.start_loading} stop_loading={this.stop_loading} />
                    </section>
                </Container>
                <Footer />
            </div>
        )
    }
}

export default Home