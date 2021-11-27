import { Row, Col } from 'react-bootstrap'

import ExecCard from './components/execs-card/execs-card'
import Title from '../../../../components/title/title'

import './execs.scss'

import owen from '../../../../assets/execs/owen.jpg'
import gavin from '../../../../assets/execs/gavin.jpg'
import christian from '../../../../assets/execs/christian.jpg'

export default function Execs() {
    return (
        <>
            <Title title='Executives' subtitle='Meet the team!' mb='1.8rem' />
            <Row className='justify-content-around'>
                <Col className='mb-4' lg={3}>
                    <ExecCard
                        img={gavin}
                        role='Vice President'
                        name='Gavin Bhattacharya'
                        content='Gavin is a senior at HCI. He hopes to achieve a degree in mechanical engineering from Dalhousie. Gavin may also want a designation in naval engineering.'
                    />
                </Col>
                <Col className='mb-4' lg={3}>
                    <ExecCard
                        img={owen}
                        role='Co-President'
                        name='Owen Manson'
                        content='Owen is a senior at HCI. He is very interested in biomedical engineering and hopes to presue a biomed degree in university.'
                    />
                </Col>
                <Col className='mb-4' lg={3}>
                    <ExecCard
                        img={christian}
                        role='Co-President'
                        name='Christian Stefaniw'
                        content='Christian is a senior at HCI. He is very interested in computer programming and entrepreneurship. Christian hopes to achieve a computer science degree or a business degree.'
                    />
                </Col>
            </Row>

        </>
    );
}