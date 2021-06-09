import { Component } from 'react'

class SocialBtn extends Component {
    render() {
        return (
            <a target='_blank' rel='noreferrer' href={this.props.href}>
                <div className="social-btn">
                    <i className={this.props.className}></i>
                </div>
            </a>
        )
    }
}

export default SocialBtn