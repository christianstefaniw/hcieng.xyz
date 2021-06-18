import { Component } from 'react'

import '../chat.scss'

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
            <div onScroll={this.handle_scroll}>
                <div>
                    {
                        this.props.messages.map((msg, key) => (
                            <div key={key} className='message' ref={el => { this.el = el }}>
                                <p>{msg.sender.first}</p>
                                <p>{msg.content}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

        )
    }
}

export default Messages