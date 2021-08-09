import { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

import ExecCard from './components/execs-card/execs-card'
import Title from '../../../../components/title/title'
import ScrollAnimation from 'react-animate-on-scroll';

import './execs.scss'

import owen from '../../../../assets/execs/owen.jpg'
import gavin from '../../../../assets/execs/gavin.jpg'
import christian from '../../../../assets/execs/christian.jpg'

class Execs extends Component {
    render() {
        return (
            <>
                <Title title='Executives' subtitle='Meet the team!' />
                <Row className='justify-content-around'>
                    <Col className='mb-4' lg={3}>
                        <ScrollAnimation className='h-100' animateIn='fadeIn' animateOnce>
                            <ExecCard
                                img={gavin}
                                role='Vice President'
                                name='Gavin Bhattacharya'
                                content='Gavin is a senior at HCI. He hopes to achieve a degree in mechanical engineering from Dalhousie. Gavin may also want a designation in naval engineering.'
                            />
                        </ScrollAnimation>
                    </Col>
                    <Col className='mb-4' lg={3}>
                        <ScrollAnimation className='h-100' animateIn='fadeIn' animateOnce>
                            <ExecCard
                                img={owen}
                                role='Co-President'
                                name='Owen Manson'
                                content='Owen is a senior at HCI. He is very interested in biomedical engineering and hopes to presue a biomed degree in university.'
                            />
                        </ScrollAnimation>
                    </Col>
                    <Col className='mb-4' lg={3}>
                        <ScrollAnimation className='h-100' animateIn='fadeIn' animateOnce>
                            <ExecCard
                                img={christian}
                                role='Co-President'
                                name='Christian Stefaniw'
                                content='Christian is a senior at HCI. He is very interested in computer programming. Christian hopes to achieve a computer science degree from McGill.'
                            />
                        </ScrollAnimation>
                    </Col>
                </Row>

            </>
        );
    }
}

export default Execs