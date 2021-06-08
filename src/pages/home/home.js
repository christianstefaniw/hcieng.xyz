import { Component } from 'react'
import { Container } from "react-bootstrap";

import TopNav from './components/nav'
import About from './components/about'
import Landing from './components/landing'
import Contact from './components/contact'
import Footer from '../../components/footer/footer'

import './home.scss'

class Home extends Component {
    render() {
        return (
            <>
                <TopNav />
                <div className='nav-spacing-buffer' />
                <Container>
                    <section id='home'>
                        <Landing />
                    </section>
                    <div className='spacing-buffer'></div>
                    <section id='about'>
                        <About />
                    </section>
                    <div className='spacing-buffer'></div>
                    <section id='contact'>
                        <Contact />
                    </section>
                </Container>
                <Footer />
            </>
        )
    }
}

export default Home