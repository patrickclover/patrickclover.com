import React, { Component }                           from 'react'
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react'

class MenuItem extends Component {
    render () {
        const item = this.props.item
        return (

            <li>
                <a title={item.title} href={item.link} target="_blank" data-content={item.content}>
                    {item.title}
                </a>
            </li>

        )
    }
}

export default MenuItem