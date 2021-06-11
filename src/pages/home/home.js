import { Component } from 'react'
import { Container } from "react-bootstrap";
import OnImagesLoaded from 'react-on-images-loaded';

import TopNav from '../../components/nav/nav'
import About from './components/about'
import Landing from './components/landing'
import Contact from './components/contact'
import Footer from '../../components/footer/footer'
import Execs from './components/execs'

import './home.scss'

class Home extends Component {
    constructor() {
        super();
        this.state = { loading: true }
    }

    /**
     * The landing component has an image that takes forever to load
     * so the components that should be under it render at the top of the page
     * and it looks really bad so I implemented some loading functionallity
     */
    stop_loading = () => {
        this.setState({ loading: false });
    }

    render() {
        return (
            <div id='home'>
                <TopNav loggedin={false} />
                <div className='nav-spacing-buffer' />
                <Container>
                    <section >
                        <OnImagesLoaded onLoaded={this.stop_loading}>
                            <Landing />
                        </OnImagesLoaded>
                    </section>
                </Container>
                {this.state.loading ? <></>:
                    <>
                        <Container>
                            <div className='spacing-buffer'></div>
                            <section id='about'>
                                <About />
                            </section>
                            <div className='spacing-buffer'></div>
                           <section id='execs'>
                               <Execs />
                           </section>
                            <div className='spacing-buffer'></div>
                            <section id='contact'>
                                <Contact />
                            </section>
                        </Container>
                        <Footer />
                    </>
                }
            </div>

        )
    }
}

export default Home