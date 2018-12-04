import React, { Component } from 'react'
import './App.scss'
import Menu                 from '../Menu/Menu'
import Hamburger            from '../Hamburger/Hamburger'
import Title                from '../Title/Title'
import Galaxy               from '../Galaxy/Galaxy'
import Blog                 from '../Blog/Blog'

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

    description () {
        return (
            <div>
                <p>Running a <strong>tech</strong> start up in Scotland's capital. </p>
                <p>Getting people connected to Public <strong>Wi-Fi</strong> with user experience dictating our product.
                </p>
            </div>)
    }

    render () {
        return (
            <div className="App">
                <Menu open={this.state.active}/>
                <Hamburger active={this.state.active} click={this.onClick.bind(this)}/>

                <Galaxy/>
                <section className="home flex-grid">
                    <Title heading="Patrick Clover" delay="1000" desc={this.description()}/>
                    <Blog/>
                </section>
            </div>
        )
    }
}

export default App