import React, { Component }                                            from 'react'
import MenuItem                                                        from '../MenuItem/MenuItem'
import 'velocity-animate/velocity.ui'
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react'

const items = [{
    title: 'Company',
    content: 'BLACKBX',
    link: 'https://blackbx.io',
}, {
    title: 'Facebook',
    content: 'My personal self',
    link: 'https://www.facebook.com/patrickclover',
}, {
    title: 'Twitter',
    content: 'I\'m not a news source, what is this?',
    link: 'https://twitter.com/patrickclover',
}, {
    title: 'LinkedIn',
    content: 'Who I know + Who you know',
    link: 'https://www.linkedin.com/in/patrickclover/',
}, {
    title: 'Contact',
    content: 'Mail me',
    link: 'mailto:im@patrickclover.com',
}]

class Menu extends Component {

    enterAnimation = {
        animation: 'transition.perspectiveLeftIn',
        stagger: 150,
        delay: 0,
        backwards: false,
        opacity: 1,
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
        stagger: this.enterAnimation.stagger,
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
        const open      = this.props.open ? 'overlay-active overlay-slide-down' : 'overlay-slide-up'
        return (

            <VelocityComponent
                duration={this.enterAnimation.stagger * items.length}
                delay={300}
                animation={this.props.open ? 'transition.slideLeftIn' : 'transition.slideRightOut'}>
                <nav role="navigation" className="overlay-navigation">
                    <VelocityTransitionGroup
                        component="ul"
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