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
                    <a href="#" dangerouslySetInnerHTML={{__html: this.formatHeading(this.props.heading)}} />
                </h1>
                <p>Running a <strong>tech</strong> start up in Scotland's capital. Getting people connected to
                    Public
                    <strong>Wi-Fi</strong> with user experience dictating our product.</p>
            </div>

        )
    }
}

export default Title