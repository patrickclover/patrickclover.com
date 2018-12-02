import React, { Component }                                            from 'react'
import MenuItem                                                        from '../MenuItem/MenuItem'
import items                                                           from './Items'
import './Menu.scss'
import 'velocity-animate/velocity.ui'
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react'

class Menu extends Component {

    enterAnimation = {
        animation: 'transition.perspectiveLeftIn',
        stagger: 50,
        delay: 0,
        backwards: false,
        opacity: 1,
        display: 'block',
        style: {
            // Since we're staggering, we want to keep the display at "none" until Velocity runs
            // the display attribute at the start of the animation.
            display: 'none',
            opacity: 0,
        },
    }

    leaveAnimation = {
        animation: 'transition.perspectiveRightOut',
        delay: 0,
        stagger: this.enterAnimation.stagger * 3,
        backwards: true,
    }

    constructor () {
        super()
        this.state = {
            items: [],
        }
    }

    componentWillUpdate (nextProps, nextState) {
        if (nextProps.open !== this.props.open && this.state.items === nextState.items) {
            if (nextProps.open) {
                return this.setState({items: items})
            }
            return this.setState({items: []})
        }
    }


    render () {
        const animation = 'transition.' + (this.props.open ? 'perspectiveLeftIn' : 'fadeOut')

        return (
            <VelocityComponent
                duration={this.leaveAnimation.stagger * items.length}
                delay={200}
                animation={this.props.open ? 'transition.slideLeftIn' : 'transition.slideRightOut'}>
                <nav role="navigation" className="overlay-navigation">
                    <VelocityTransitionGroup
                        component="ul"
                        runOnMount={true}
                        enter={this.enterAnimation}
                        leave={this.leaveAnimation}>
                        {
                            this.state.items.map((item, k) =>
                                <MenuItem animation={animation} key={k} item={item}/>,
                            )
                        }
                    </VelocityTransitionGroup>
                </nav>
            </VelocityComponent>

        )
    }
}

export default Menu