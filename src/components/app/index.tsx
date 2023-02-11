import Menu from 'common/menu'
import { HamburgerProvider } from 'common/menu/context'
import { useEffect, useState } from 'react'
import TextTransition, { presets } from 'react-text-transition'
import styles from './app.module.css'

const texts = [
	'Same again?',
	'Happy birthday!',
	'Welcome back',
	'how was it?',
	'want another?',
]

const App = () => {
	const [index, setIndex] = useState(0)
	useEffect(() => {
		const intervalId = setInterval(() => setIndex(id => id + 1), 3000)
		return () => clearTimeout(intervalId)
	}, [])
	return (
		<HamburgerProvider>
			<Menu />
			<div className={styles.app}>
				<h1 className='text' aria-label='Thank you. Have a nice day!'>
					<span className='heading' aria-hidden='true'>
						<span>Nice to meet you,</span>
						<span className='filled'>
							<TextTransition
								direction='down'
								inline

								springConfig={presets.default}
							>
								{texts[index % texts.length]}
							</TextTransition>
						</span>
						<span>Thank you.</span>
					</span>
					<span className='subheading' aria-hidden='true'>
						Tomorrows hospitality tech today
					</span>
				</h1>
			</div>
		</HamburgerProvider>
	)
}

export default App

/*
PUBLIC_URL = /proxy/3000 \
WDS_SOCKET_PATH = $PUBLIC_URL / sockjs - node \
BROWSER = none yarn start
*/