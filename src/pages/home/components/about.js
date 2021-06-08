import { Component } from 'react'
import { Row, Col } from "react-bootstrap";

import WhatWeOfferCard from './what-we-offer-card'
import Title from './title'

import '../home.scss'

import projecticon from '../../../assets/icons/what-we-offer/projects.svg'
import presentationicon from '../../../assets/icons/what-we-offer/presentations.svg'
import speakersicon from '../../../assets/icons/what-we-offer/speakers.svg'

class About extends Component {
    render() {
        return (
            <>
                <Title title='What we offer?' subtitle='Our Club' mb='3.5rem' />
                <Row className='justify-content-around'>
                    <Col className='mb-5' lg={3}>
                        <WhatWeOfferCard
                            icon={projecticon}
                            title="Real World Projects"
                            content="Build practical real world projects such as engines."
                        />
                    </Col>
                    <Col className='mb-5' lg={3}>
                        <WhatWeOfferCard
                            icon={presentationicon}
                            title="STEM Presentations"
                            content="Learn about STEM University programs and real world theory of engineering projects."
                        />
                    </Col>
                    <Col className='mb-5' lg={3}>
                        <WhatWeOfferCard
                            icon={speakersicon}
                            title="Engineer Speakers"
                            content="Talk to Engieering professionals about their field and experiences."
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

export default About