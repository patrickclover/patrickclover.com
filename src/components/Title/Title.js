import React, { Component } from 'react'
import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { VelocityTransitionGroup } from 'velocity-react'

class Title extends Component {
  enterAnimation = {
    animation: 'transition.slideUpIn',
    stagger: 0,
    delay: 4000,
    backwards: false,
    opacity: 1,
    display: 'block',
    style: {
      // Since we're staggering, we want to keep the display at "none" until Velocity runs
      // the display attribute at the start of the animation.
      display: 'none',
      opacity: 0
    }
  }

  formatHeading = (heading) => {
    const split = heading.split(' ')
    split[split.length - 1] = '<strong>' + split[split.length - 1] + '</strong>'
    return split.join(' ')
  }

  render() {
    return (
      <div className="home-text">
        <VelocityTransitionGroup
          component="div"
          runOnMount={true}
          style={{ minHeight: this.props.delay ? 49 : 0 }}
          enter={{ ...this.enterAnimation, delay: this.props.delay || 4000 }}
        >
          <h1>
            <a
              href="#"
              title="patrick clover"
              dangerouslySetInnerHTML={{
                __html: this.formatHeading(this.props.heading)
              }}
            />
          </h1>
        </VelocityTransitionGroup>
        {this.props.desc}
      </div>
    )
  }
}

export default Title
