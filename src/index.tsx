import { createRoot } from 'react-dom/client'
import App from 'components/app'
import schema from 'util/schema.json'
import './index.css'

if (window.location.hostname.startsWith('www.')) {
	window.location.replace(
		window.location.href.replace(/^https?:\/\/www\./, match =>
			match.replace('www.', ''),
		),
	)
}

const schemaScript = document.createElement('script')
schemaScript.setAttribute('type', 'application/ld+json')
schemaScript.textContent = JSON.stringify(schema)
document.head.appendChild(schemaScript)

const container = document.getElementById('root')
if (container) {
	const root = createRoot(container)
	root.render(<App />)
}

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js', { scope: '/' })
			.catch(() => {
				/* SW registration is best-effort */
			})
	})
}
