import { Component } from 'react'
import { Image } from 'react-bootstrap'

import glowline1 from '../../../assets/decorations/glow-line-1.svg'
import glowline2 from '../../../assets/decorations/glow-line-2.svg'
import glowline3 from '../../../assets/decorations/glow-line-3.svg'
import glowline4 from '../../../assets/decorations/glow-line-4.svg'
import glowline5 from '../../../assets/decorations/glow-line-5.svg'
import glowline6 from '../../../assets/decorations/glow-line-6.svg'
import glowline7 from '../../../assets/decorations/glow-line-7.svg'
import glowline8 from '../../../assets/decorations/glow-line-8.svg'

class Lines extends Component {
    render() {
        return (
            <div>
                <Image className="glow-line-1" src={glowline1} />
                <Image className="glow-line-2" src={glowline2} />
                <Image className="glow-line-3" src={glowline3} />
                <Image className="glow-line-4" src={glowline4} />
                <Image className="glow-line-5" src={glowline5} />
                <Image className="glow-line-6" src={glowline6} />
                <Image className="glow-line-7" src={glowline7} />
                <Image className="glow-line-8" src={glowline8} />
            </div>
        )
    }
}

export default Lines