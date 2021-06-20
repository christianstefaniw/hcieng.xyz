import React, { Component } from 'react'
import Sidebar from "react-sidebar";

import '../chat.scss'

import history from '../../../history'
import { Col, Container, Row } from 'react-bootstrap';


const mql = window.matchMedia(`(min-width: 1700px)`);

class Rooms extends Component {
    constructor() {
        super();
        this.state = {
            sidebar_open: false,
            sidebar_docked: mql.matches,
        };
    }

    shouldComponentUpdate(prevProps, prevState) {
        return this.props.rooms !== prevProps.rooms || prevState.sidebar_open !== this.state.sidebar_open;
    }


    toggle_sidebar = () => {
        this.setState(prev_state => ({ sidebar_open: !prev_state.sidebar_open }))
    }

    componentDidMount = () => {
        mql.addEventListener('', this.media_query_changed)
    }

    componentWillUnmount = () => {
        mql.removeEventListener('', this.media_query_changed)
    }

    media_query_changed = () => {
        this.setState({ sidebar_docked: mql.matches, sidebar_open: false })
    }


    render() {
        return (
            <>

                <Sidebar
                    styles={!this.state.sidebar_open ? { 'root': { 'zIndex': '-1' } } : ''}
                    sidebarClassName='bg-white'
                    sidebar={<SidebarContent rooms={this.props.rooms} toggle={this.toggle_sidebar} />}
                    open={this.state.sidebar_open}
                    onSetOpen={this.toggle_sidebar}
                    docked={this.state.sidebar_docked}
                >
                    {
                        this.state.sidebar_docked
                            ?
                            <> </>
                            :
                            <div style={{position: 'absolute', top: '1rem', left: '1rem'}}>
                                <i role='button' onClick={this.toggle_sidebar} class="fas fa-bars fa-lg"></i>
                            </div>
                    }
                </Sidebar>
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

export default Rooms