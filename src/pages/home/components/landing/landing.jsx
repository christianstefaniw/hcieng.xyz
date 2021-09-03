import { Row, Col, Image } from "react-bootstrap";

import Button from '../../../../components/button/button';

import './landing.scss'

import landingcomputer from '../../../../assets/landing/landing-computer.svg'
import pinkcircle from '../../../../assets/decorations/pink-circle.svg'

export default function Landing() {
    return (
        <>
            <Image className="circle-1" src={pinkcircle} />
            <Image className="circle-2" src={pinkcircle} />
            <Row className='justify-content-around'>
                <Col lg={5} className='intro-text'>
                    <h1 className="landing-title">
                        Humberside Collegiate Institute's Engineering<br></br>
                        Club
                    </h1>
                    <div className='mt-3'>
                        <p className="text-muted">
                            Learn how to solve real world problems through hands on projects and lots of other fun activities!
                        </p>
                    </div>
                    <div className='mt-4'>
                        <Button
                            target='_blank' rel='noreferrer'
                            to={{ pathname: 'https://classroom.google.com/c/MzUwMzE5NzA3NjIw?cjc=yi5yzyj' }}
                            className='px-4'
                        >
                            JOIN NOW
                        </Button>
                    </div>
                </Col>
                <Col lg={5}>
                    <Image width='90%' src={landingcomputer} fluid />
                </Col>
            </Row>
        </>
    );
}