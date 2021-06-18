import { Component } from 'react'
import { Container } from 'react-bootstrap'

import Loader from '../../components/loader/loader'

import { websocket } from '../../constants/api_constants'
import { Message, room_data } from './services'
import Rooms from './components/rooms'
import { all_rooms } from './services'
import Chat from './components/chat'

import './chat.scss'
import AccountContext from '../../providers/account_provider'


class ChatPage extends Component {
    static contextType = AccountContext;

    constructor(props) {
        super(props);

        this.num_msg_loaded = 0;

        this.state = {
            rooms_loaded: false,
            ws_loaded: false,
            ws: null,
            curr_room: null,
            messages_loaded: false,
            curr_msg: '',
            error: '',
            rooms: [],
            load_overlay: false,
        }
    }

    reset = () => {
        this.state.ws.close();
        this.setState({ error: '', ws_loaded: false, messages_loaded: false });
        this.num_msg_loaded = 0;
    }

    update_num_msg_loaded = (num_loaded) => {
        this.num_msg_loaded = num_loaded
    }

    update_room_messages = async () => {
        this.setState({
            load_overlay: true,
        })
        let new_room_data = await room_data(this.props.match.params.id, this.num_msg_loaded, this.update_num_msg_loaded)
        if (new_room_data !== false) {
            let messages = new_room_data.messages.concat(this.state.curr_room.messages)
            new_room_data.messages = messages;
        } else {
            new_room_data = this.state.curr_room;
        }
        this.setState({
            load_overlay: false,
            curr_room: new_room_data
        })
    }

    connect = async () => {
        if (this.state.ws_loaded)
            this.state.ws.close();

        this.setState({
            rooms: await all_rooms(),
            rooms_loaded: true,
        })

        let curr_room;

        try {
            curr_room = await room_data(this.props.match.params.id, this.num_msg_loaded, this.update_num_msg_loaded)
        } catch (err) {
            this.setState({
                error: 'invalid room',
                messages_loaded: true,
                ws_loaded: true
            })
            return;
        }

        let ws = new WebSocket(`${websocket}/${this.props.match.params.id}`);

        ws.onopen = () => {
            this.setState({ ws, ws_loaded: true })
        }

        ws.onmessage = (evt) => {
            let { curr_room } = this.state;
            curr_room.messages.push(Message.from_json(JSON.parse(evt.data)));
            this.setState({ curr_room });
        }

        ws.onclose = () => {}

        this.setState({ curr_room })
        this.setState({
            messages_loaded: true,
        });
    }

    async componentDidMount() {
        await this.connect();
    }

    async componentWillReceiveProps(new_props) {
        if (new_props.match.params.id !== this.props.match.params.id) {
            this.reset();
            await this.connect();
        }
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

    render() {
        return (
            <>
                <Container className='m-auto mt-5'>
                    <Loader show={this.state.load_overlay} />
                    {
                        this.state.rooms_loaded ? <Rooms rooms={this.state.rooms} /> : <></>
                    }
                    {
                        !this.state.ws_loaded && !this.state.messages_loaded
                            ?
                            <Loader show={!this.state.ws_loaded && !this.state.messages_loaded} />
                            :
                            <>
                                <Container className='chat'>
                                    <Chat
                                        id={this.props.match.params.id}
                                        error={this.state.error}
                                        curr_room={this.state.curr_room} update_room_messages={this.update_room_messages}
                                    />
                                    {
                                        this.state.curr_room.admin_text_only && !this.context.account_info.is_admin
                                            ?
                                            <>You do not have permissions to text in this room</>
                                            :
                                            <input
                                                value={this.state.curr_msg} name='curr_msg' type='text'
                                                onKeyPress={this.handle_enter_input} onChange={this.handle_input_change} required
                                            />
                                    }
                                </Container>
                            </>
                    }

                </Container>
            </>

        )
    }
}

export default ChatPage