import { Component } from 'react'

import ExecCard from './execs-card'
import Title from './title'
class Execs extends Component {
    render() {
        return (
            <>
                <Title title='Executives' subtitle='Meet the team!' />
                <ExecCard />
            </>
        );
    }
}

export default Execs