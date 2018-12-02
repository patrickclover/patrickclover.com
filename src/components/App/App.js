import React, { Component } from 'react'
import './App.scss'
import Menu                 from '../Menu/Menu'
import Hamburger            from '../Hamburger/Hamburger'
import Title                from '../Title/Title'
import Galaxy               from '../Galaxy/Galaxy'

class App extends Component {

    constructor () {
        super()
        this.state = {
            active: false,
        }
    }

    onClick () {
        this.setState({active: !this.state.active})
    }

    render () {
        return (
            <div className="App">
                <Menu open={this.state.active}/>
                <section className="home">
                    <Galaxy/>
                    <Title heading="Patrick Clover"/>
                    <Hamburger active={this.state.active} click={this.onClick.bind(this)}/>
                </section>
            </div>
        )
    }
}

export default App