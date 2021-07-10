import App from 'components/app'
import onScroll from 'helpers/scroll'
import ReactDOM from 'react-dom'
import schema from 'util/schema.json'
import './index.css'
import reportWebVitals from './reportWebVitals'

if (window.location.hostname.indexOf('www') === 0) {
	window.location.href = window.location.href.replace('www.', '')
}

window.addEventListener('scroll', onScroll)
onScroll()
const schemaScript = document.createElement('script')
schemaScript.setAttribute('type', 'application/ld+json')
schemaScript.innerText = JSON.stringify(schema)
document.body.appendChild(schemaScript)

ReactDOM.render(<App />, document.body)
reportWebVitals()
