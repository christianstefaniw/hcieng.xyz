import { Component } from 'react'

import TopNav from '../../components/nav/nav'
import Loader from '../../components/loader/loader'

import { websocket } from '../../constants/api_constants'
import Rooms from './components/rooms'
import { Message } from './services'

import './chat.scss'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            room_loaded: false,
            ws_loaded: false,
            ws: null,
            messages: [],
            curr_msg: '',
        }
    }

    async componentDidMount() {
        let ws = new WebSocket(websocket + this.id);

        ws.onopen = () => {
            this.setState({ ws })
            console.log('connected');
        }

        ws.onmessage = (evt) => {
            console.log('ok')
            this.setState(prevState => ({ messages: [...prevState.messages, Message.from_json(JSON.parse(evt.data))] }));
        }

        ws.onclose = () => {
            console.log('disconnected');
        }

        this.ws_loaded()
    }

    handle_input_change = (evt) => {
        const { value, name } = evt.target;
        this.setState({
            [name]: value
        });
    }

    send_message = () => {
        let message = this.state.curr_msg;
        if (!message)
            return
        message = message.replace(/\r?\n/g, '<br />');
        this.state.ws.send(
            message
        );
        this.setState({ curr_msg: '' });
    }

    handle_enter_input = (evt) => {
        if (evt.key === 'Enter') {
            this.send_message();
        }
    }

    rooms_loaded = () => {
        this.setState({
            rooms_loaded: true
        })
    }

    ws_loaded = () => {
        this.setState({
            ws_loaded: true
        })
    }

    render() {
        return (
            <>
                <TopNav />
                {
                    !this.state.ws_loaded && !this.state.room_loaded
                        ?
                        <Loader show={this.state.loading} variant='primary' />
                        :
                        <>
                            <Rooms rooms_loaded={this.rooms_loaded} />
                            {
                                this.state.messages.map((msg, key) => (
                                    <div key={key}>
                                        <p>{msg.sender.first}</p>
                                        <p>{msg.content}</p>
                                    </div>
                                ))
                            }
                            <input value={this.state.curr_msg} name='curr_msg' type='text' onKeyPress={this.handle_enter_input} onChange={this.handle_input_change} required />
                        </>

                }



            </>

        )
    }
}

export default Chat