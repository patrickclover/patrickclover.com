import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import schema from './components/Utils/schema'

if (window.location.hostname.indexOf('www') === 0) {
    window.location = window.location.href.replace('www.', '')
}

const schema_script = document.createElement('script')
schema_script.setAttribute('type', 'application/ld+json')
schema_script.innerText = JSON.stringify(schema)
document.body.appendChild(schema_script)


ReactDOM.render(<App/>, document.getElementById('root'))