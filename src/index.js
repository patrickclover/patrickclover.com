import './index.scss'
import React    from 'react'
import ReactDOM from 'react-dom'
import App      from './components/App/App'
import 'velocity-animate'
import 'velocity-animate/velocity.ui'

if (window.location.hostname.indexOf('www') === 0) {
    window.location = window.location.href.replace('www.', '')
}

ReactDOM.render(<App/>, document.getElementById('root'))