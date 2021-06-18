import { Component } from 'react'

import Messages from './messages'

class Chat extends Component {
    render() {
        return (
            <>
                {
                    this.props.error
                        ?
                        <p className='text-danger'>{this.props.error}</p>
                        :
                        <Messages messages={this.props.curr_room.messages} update_messages={this.props.update_room_messages} />
                }
            </>
        )
    }
}


export default Chat