import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from "react-sidebar";

import Loader from '../../components/loader/loader'

import { websocket } from '../../constants/api_constants'
import history from '../../history'
import { Message, room_data, all_rooms, LoadingHelpers, LoadingStatusEnum } from './services'
import Chat from './components/chat'

import './chat.scss'
import AccountContext from '../../providers/account_provider'

// TODO refactor all of this


const mql = window.matchMedia(`(min-width: 1700px)`);

class ChatPage extends Component {
    static contextType = AccountContext;

    constructor(props) {
        super(props);

        this.num_msg_loaded = 0;

        this.state = {
            loading: LoadingStatusEnum.none_loaded,
            ws: null,
            curr_room: null,
            curr_msg: '',
            error: '',
            rooms: [],
            load_overlay: false,
            sidebar_open: false,
            sidebar_docked: mql.matches,
            first_load: true
        }
    }

    reset = () => {
        if (this.state.ws)
            this.state.ws.close();
        this.setState({ error: '', loading: LoadingHelpers.unload_ws_and_messages() });
        this.num_msg_loaded = 0;
    }

    update_num_msg_loaded = (num_loaded) => {
        this.num_msg_loaded = num_loaded
    }

    update_room_messages = async () => {
        let new_room_data;

        this.setState({
            load_overlay: true,
        })

        try {
            room_data = await room_data(this.props.match.params.id, this.num_msg_loaded, this.update_num_msg_loaded)
            let messages = new_room_data.messages.concat(this.state.curr_room.messages)
            new_room_data.messages = messages;
        } catch (_) {
            new_room_data = this.state.curr_room;
        }

        this.setState({
            load_overlay: false,
            curr_room: new_room_data
        })
    }

    connect = async () => {
        let curr_room;

        if (this.state.ws)
            this.state.ws.close();

        let loaded_rooms = await all_rooms();
        this.setState(prev_state => ({
            rooms: loaded_rooms,
            loading: LoadingHelpers.rooms_loaded(prev_state.loading)
        }));

        try {
            curr_room = await room_data(this.props.match.params.id, this.num_msg_loaded, this.update_num_msg_loaded)
        } catch (err) {
            let loading_state = LoadingHelpers.ws_loaded(this.state.loading)
            loading_state = LoadingHelpers.messages_loaded(loading_state)
            this.setState({
                error: 'invalid room',
                loading: loading_state
            });
            return;
        }

        let ws = new WebSocket(`${websocket}/${this.props.match.params.id}`);

        ws.onopen = () => {
            this.setState(prev_state => ({ ws, loading: LoadingHelpers.ws_loaded(prev_state.loading) }))
        }

        ws.onmessage = (evt) => {
            let { curr_room } = this.state;
            curr_room.messages.push(Message.from_json(JSON.parse(evt.data)));
            this.setState({ curr_room });
        }

        ws.onclose = () => { console.log('close') }

        this.setState({ curr_room })
        this.setState(prev_state => ({ loading: LoadingHelpers.messages_loaded(prev_state.loading) }))

    }

    async componentDidMount() {
        mql.addEventListener('', this.media_query_changed)
        await this.connect();
    }

    async componentWillReceiveProps(new_props) {
        if (new_props.match.params.id !== this.props.match.params.id) {
            this.reset();
            await this.connect();
        }
    }

    media_query_changed = () => {
        this.setState({ sidebar_docked: mql.matches, sidebar_open: false })
    }

    toggle_sidebar = () => {
        this.setState(prev_state => ({ sidebar_open: !prev_state.sidebar_open }))
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

    componentWillUnmount() {
        this.reset();
        mql.removeEventListener('', this.media_query_changed)
    }

    rooms_load = () => {
        if (this.state.first_load)
            return LoadingHelpers.fully_loaded(this.state.loading)
        return LoadingHelpers.check_rooms_loaded(this.state.loading)
    }

    chat_load = () => {
        if (this.state.first_load) {
            this.setState({ first_load: false });
            return false;
        }
        return !LoadingHelpers.fully_loaded(this.state.loading)
    }

    render() {
        return (
            <>
                <Loader show={this.state.load_overlay} />
                {

                    (() => { return this.rooms_load() })()
                        ?
                        <Sidebar
                            sidebarClassName='bg-white'
                            sidebar={<SidebarContent rooms={this.state.rooms} toggle={this.toggle_sidebar} />}
                            open={this.state.sidebar_open}
                            onSetOpen={this.toggle_sidebar}
                            docked={this.state.sidebar_docked}
                        >
                            <>
                                {
                                    this.state.sidebar_docked
                                        ?
                                        <> </>
                                        :
                                        <div>
                                            <i role='button' onClick={this.toggle_sidebar} class="fas fa-bars fa-lg"></i>
                                        </div>
                                }
                                {
                                    (() => { return this.chat_load() })()
                                        ?
                                        <Loader show={(() => { return this.chat_load() })()} />
                                        :
                                        <>
                                            <Container className='chat'>
                                                <Chat
                                                    id={this.props.match.params.id}
                                                    error={this.state.error}
                                                    curr_room={this.state.curr_room} update_room_messages={this.update_room_messages}
                                                />
                                                {
                                                    this.state.error ? <> </> :
                                                        this.state.curr_room.admin_text_only && !this.context.account_info.is_admin
                                                            ?
                                                            <>You do not have permissions to text in this room</>
                                                            :
                                                            <Row className='justify-content-around'>
                                                                <Col xs={9}>
                                                                    <textarea
                                                                        className='message-type'
                                                                        placeholder='message'
                                                                        value={this.state.curr_msg} name='curr_msg' type='text'
                                                                        onChange={this.handle_input_change} required
                                                                    />
                                                                </Col>
                                                                <Col xs={3}>
                                                                    <i onClick={this.send_message} className="fa fa-paper-plane fa-lg v-center send-icon"></i>
                                                                </Col>
                                                            </Row>

                                                }
                                            </Container>
                                        </>
                                }
                            </>
                        </Sidebar>
                        :
                        <Loader show={(() => { return this.rooms_load() })()} />
                }
            </>


        )
    }
}


class SidebarContent extends Component {
    on_select = (selected) => {
        if (selected === 'exit') {
            history.push('/');
            return
        }
        this.props.toggle();
        history.push(selected.id);
    }

    render() {
        return (
            <Container>
                {
                    this.props.rooms.map((room, key) => (
                        <Row role='button' onClick={() => this.on_select(room)} key={key} className={key === 0 ? 'mt-3' : ''}>
                            <Col md={2}>
                                <i className={room.name === 'Announcements' ? 'fas fa-bullhorn lg' : 'fas fa-comment fa-lg'} />
                            </Col>
                            <Col md={10}>
                                <p>{room.name}</p>
                            </Col>
                        </Row>
                    ))
                }
                <Row role='button' onClick={() => this.on_select('exit')}>
                    <Col md={2}>
                        <i className="fas fa-arrow-left fa-lg" />
                    </Col>
                    <Col md={10}>
                        <p>EXIT</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ChatPage