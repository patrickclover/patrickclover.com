import React, { Component } from 'react'
import 'hamburgers'
import './Hamburger.scss'

class MenuItem extends Component {
    render () {
        const active = this.props.active ? 'is-active' : ''
        return (

            <div className={`hamburger hamburger--collapse ${active}`}
                 onClick={this.props.click}>
                <span>Menu</span>
                <div className="hamburger-box">
                    <div className="hamburger-inner"/>
                </div>
            </div>
        )
    }
}

export default MenuItem