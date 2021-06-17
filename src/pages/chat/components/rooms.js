import { Component } from 'react'

import { all_rooms } from '../services'


class Rooms extends Component {
    constructor() {
        super();
        this.state = {
            rooms: []
        };
    }

    async componentDidMount() {
        this.setState({ rooms: await all_rooms() });
        this.props.rooms_loaded();
    }

    render() {
        return (
            <>
                {
                    this.state.rooms.map((room, key) => (
                        <div key={key}>
                            <p>{room.id}</p>
                            <p>{room.name}</p>
                        </div>
                    ))
                }
            </>
        )
    }
}

export default Rooms