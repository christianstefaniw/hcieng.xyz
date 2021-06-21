import { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

import '../chat.scss'

const colors = ['#DDD8D8', '#C1AEA8', '#FFA564', '#FFE2C8', '#FFA64D'];

class Message extends Component {
    shouldComponentUpdate() {
        return false;
    }


    render() {
        return (
            <Row className='message'>
                <Col lg={1}>
                    <div className='message-icon' style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>
                        <h4>{this.props.msg.sender.first[0].toUpperCase()}</h4>
                    </div>
                </Col>
                <Col lg={11}>
                    <div>
                        <p className='text-muted mb-0'>{this.props.msg.sender.first}</p>
                        <p dangerouslySetInnerHTML={{ __html: this.props.msg.content} } />
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Message