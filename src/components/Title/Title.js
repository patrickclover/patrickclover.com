import React, { Component } from 'react'

class Title extends Component {

    formatHeading (heading) {
        const split             = heading.split(' ')
        split[split.length - 1] = '<strong>' + split[split.length - 1] + '</strong>'
        return split.join(' ')
    }

    render () {
        return (
            <div className="home-text">
                <h1>
                    <a href="#" title="patrick clover" dangerouslySetInnerHTML={{__html: this.formatHeading(this.props.heading)}}/>
                </h1>
                {this.props.desc}
            </div>

        )
    }
}

export default Title