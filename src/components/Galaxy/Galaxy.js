import React, { Component } from 'react'
import './Galaxy.scss'

class Galaxy extends Component {
  render() {
    return (
      <div className="galaxy">
        <ul className="orbit">
          <li className="sun">
            <span></span>
          </li>
          <li className="mercury">
            <span></span>
          </li>
          <li className="venus">
            <span></span>
          </li>
          <li className="earth">
            <span>
              <span className="moon"></span>
            </span>
          </li>
          <li className="mars">
            <span></span>
          </li>
          <li className="asteroids_meteoroids">
            <span></span>
          </li>
          <li className="jupiter">
            <span></span>
          </li>
          <li className="saturn">
            <span>
              <span className="ring"></span>
            </span>
          </li>
          <li className="uranus">
            <span></span>
          </li>
          <li className="neptune">
            <span></span>
          </li>
          <li className="pluto">
            <span></span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Galaxy
