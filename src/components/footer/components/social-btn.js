import { Component } from 'react'

class SocialBtn extends Component {
    render() {
        return (
            <a href={this.props.hred}>
                <div className="social-btn">
                    <i className={this.props.className}></i>
                </div>
            </a>
        )
    }
}

export default SocialBtn