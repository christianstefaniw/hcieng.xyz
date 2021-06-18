import { Component } from 'react'

import Message from './message'

import '../chat.scss'
import { Container } from 'react-bootstrap';


class Messages extends Component {
    constructor() {
        super();
        this.at_top = false;
    }

    scroll_to_bottom = () => {
        if (this.el)
            this.el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }

    componentDidUpdate() {
        if (!this.at_top)
            this.scroll_to_bottom();
    }

    componentDidMount() {
        this.scroll_to_bottom();
    }

    handle_scroll = async (el) => {
        const top = el.target.scrollTop === 0;
        if (top) {
            this.at_top = true;
            
            await this.props.update_messages();
        } else {
            this.at_top = false;
        }
    }

    render() {
        return (
            <div className='messages-container' onScroll={this.handle_scroll}>
                <Container ref={el => { this.el = el }}>
                    {
                        this.props.messages.map((msg, key) => (
                            <Message key={key} msg={msg} />
                        ))
                    }
                </Container>
            </div>

        )
    }
}

export default Messages