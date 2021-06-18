import { Component } from 'react'
import { Container } from 'react-bootstrap'

import Loader from '../../components/loader/loader'

import { websocket } from '../../constants/api_constants'
import Messages from './components/messages'
import { Message, room_data } from './services'
import Rooms from './components/rooms'
import { all_rooms } from './services'

import './chat.scss'
import AccountContext from '../../providers/account_provider'


// TODO REFACTOR THE LIVING SHIT OUTTA THIS

class Chat extends Component {
    static contextType = AccountContext;

    constructor(props) {
        super(props);

        this.num_msg_loaded = 0;

        this.state = {
            loading: true,
            rooms_loaded: false,
            ws_loaded: false,
            ws: null,
            curr_room: null,
            messages_loaded: false,
            curr_msg: '',
            error: '',
            rooms: [],
            load_overlay: false,
            load_non_rooms: false,
        }
    }

    reset = () => {
        this.setState({ error: '', ws_loaded: false, messages_loaded: false, load_non_rooms: true });
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
            this.check_loading();
            return;
        }

        let ws = new WebSocket(`${websocket}/${this.props.match.params.id}`);

        ws.onopen = () => {
            this.setState({ ws })
            console.log('connected');
        }

        ws.onmessage = (evt) => {
            let { curr_room } = this.state;
            curr_room.messages.push(Message.from_json(JSON.parse(evt.data)));
            this.setState({ curr_room });
        }

        ws.onclose = () => {
            console.log('disconnected');
        }

        this.setState({ curr_room })
        this.setState({
            messages_loaded: true,
            ws_loaded: true
        });
        this.check_loading();
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

    check_loading = () => {
        let loaded = this.state.ws_loaded && this.state.messages_loaded && this.state.rooms_loaded;
        this.setState({
            loading: !loaded,
            load_non_rooms: !loaded
        })
    }

    render() {
        return (
            <>
                <Container className='m-auto mt-5'>
                    <Loader show={this.state.load_overlay} />
                    {
                        this.state.loading
                            ?
                            <Loader show={this.state.loading} />
                            :
                            <>
                                <Rooms rooms={this.state.rooms} />
                                <Container key={this.props.match.params.id} className='chat'>
                                    <div className='messages-container'>
                                        {
                                            this.state.load_non_rooms
                                                ?
                                                <Loader show={this.state.loading} />
                                                :
                                                <>
                                                    {
                                                        this.state.error
                                                            ?
                                                            <p className='text-danger'>{this.state.error}</p>
                                                            :
                                                            <Messages messages={this.state.curr_room.messages} update_messages={this.update_room_messages} />
                                                    }
                                                </>

                                        }
                                    </div>
                                    {
                                        this.state.curr_room.admin_text_only && !this.context.account_info.is_admin
                                            ?
                                            <>You do not have permissions to text in this room</>
                                            :
                                            <input value={this.state.curr_msg} name='curr_msg' type='text' onKeyPress={this.handle_enter_input} onChange={this.handle_input_change} required />
                                    }
                                </Container>
                            </>
                    }

                </Container>
            </>

        )
    }
}

export default Chat