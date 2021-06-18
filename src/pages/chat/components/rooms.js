import React, { Component } from 'react'
import SideNav, { NavItem, NavText, NavIcon } from '@trendmicro/react-sidenav';
import ClickOutside from 'react-click-outside'

import '../chat.scss'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import history from '../../../history'

class Rooms extends Component {
    constructor() {
        super();
        this.state = {
            sidebar_open: false
        };
    }

    shouldComponentUpdate(prevProps, prevState) {
        return this.props.rooms !== prevProps.rooms || prevState.sidebar_open !== this.state.sidebar_open;
    }


    toggle_sidebar = () => {
        this.setState(prev_state => ({ sidebar_open: !prev_state.sidebar_open }))
    }

    render() {
        return (
            <>
                <ClickOutside
                    onClickOutside={() => {
                        this.setState({ sidebar_open: false });
                    }}
                >
                    <SideNav className='sidebar' expanded={this.state.sidebar_open} onSelect={(selected) => {
                        if (selected === 'exit') {
                            history.push('/');
                            return
                        }
                        history.push(selected);
                        this.setState({ sidebar_open: false });
                    }}
                        onToggle={(expanded) => this.setState({ sidebar_open: expanded })}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="">
                            {
                                this.props.rooms.map((room, key) => (
                                    <NavItem key={key} eventKey={room.id}>
                                        <NavIcon>
                                            <i className={room.name === 'Announcements' ? 'fas fa-bullhorn lg' : 'fas fa-comment fa-lg'} />
                                        </NavIcon>
                                        <NavText>
                                            {room.name}
                                        </NavText>
                                    </NavItem>

                                ))
                            }
                            <NavItem eventKey="exit">
                                <NavIcon>
                                    <i className="fas fa-arrow-left fa-lg" />
                                </NavIcon>
                                <NavText>
                                    EXIT
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                </ClickOutside>
            </>
        )
    }
}

export default Rooms