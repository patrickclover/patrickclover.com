import Menu from 'common/menu'
import { useEffect, useState } from 'react'
import TextTransition, { presets } from 'react-text-transition'

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
		<>
			<Menu />
			<h1 className='text' aria-label='Thank you. Have a nice day!'>
				<span className='heading' aria-hidden='true'>
					<span>Nice to meet you,</span>
					<span className='filled'>
						<TextTransition
							inline
							text={texts[index % texts.length]}
							springConfig={presets.wobbly}
						/>
					</span>
					<span>Thank you.</span>
				</span>
				<span className='subheading' aria-hidden='true'>
					Tomorrows hospitality tech today
				</span>
			</h1>
		</>
	)
}

export default App
