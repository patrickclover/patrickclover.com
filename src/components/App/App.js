import React, { Component } from "react"
import "./App.scss"
import Menu from "../Menu/Menu"
import Hamburger from "../Hamburger/Hamburger"
import Galaxy from "../Galaxy/Galaxy"

class App extends Component {
  state = {
    active: false
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    let scrollTop = document.body.scrollTop
      ? document.body.scrollTop
      : document.documentElement.scrollTop
    let newPos = scrollTop + "px"
    document.documentElement.style.setProperty("--scrollPos", newPos)
  }

  onClick = () => this.setState({ active: !this.state.active })

  description() {
    return (
      <div>
        <p>
          Running a <strong>tech</strong> start up in Scotland's capital
        </p>
        <p>
          Connecting consumors to businesses with a focus on human centered
          design
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Menu open={this.state.active} />
        <Hamburger active={this.state.active} click={this.onClick.bind(this)} />

        <section className="home flex-grid">
          <div className="white">
            <p>
              Patrick <strong>Clover</strong>
            </p>
            <h1 aria-label="Rainbows are cool at any time.">
              <span>Rainbows are cool</span>
              <br />
              <span> at any time.</span>
            </h1>
            <p>
              Founder of{" "}
              <strong>
                <a target="_blank" href="https://stampede.ai">
                  Stampede
                </a>
              </strong>
              .
              <br />
              Building tools to help businesses engage with customers.
              <br />
              <strong>Human</strong> centered design it's core.
            </p>
          </div>
          <div className="dark">
            <Galaxy />
            <p>
              No one makes it this far
              <br /> <a onClick={this.onClick.bind(this)}>want more?</a>
            </p>
          </div>
        </section>
      </div>
    )
  }
}

export default App
