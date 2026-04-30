import Menu from 'common/menu'
import { HamburgerProvider } from 'common/menu/context'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './app.module.css'

const texts = [
	'Same again?',
	'Happy birthday!',
	'Welcome back',
	'how was it?',
	'want another?',
]

const heroEase = [0.16, 1, 0.3, 1] as const

const heroLine = (delay: number, duration = 0.75, z = 0) => ({
	hidden: { opacity: 0, y: 18, z },
	visible: {
		opacity: 1,
		y: 0,
		z,
		transition: { duration, delay, ease: heroEase },
	},
})

/* The hero lines sit on different Z planes so the 3D card tilt produces real
 * parallax: rotator floats forward, stroked lines recede, subhead drifts mid. */
const heroLines = {
	greeting: heroLine(0.2, 0.75, -16),
	rotator: heroLine(0.34, 0.75, 36),
	closer: heroLine(0.46, 0.75, -16),
	subhead: heroLine(0.7, 0.85, 12),
}

const App = () => {
	const [index, setIndex] = useState(0)
	const reduceMotion = useReducedMotion()
	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (reduceMotion) return undefined
		const id = window.setInterval(
			() => setIndex(i => (i + 1) % texts.length),
			3000,
		)
		return () => window.clearInterval(id)
	}, [reduceMotion])

	useEffect(() => {
		if (reduceMotion) return undefined
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
		if (!fine.matches) return undefined
		const el = cardRef.current
		if (!el) return undefined

		let frame = 0
		const onMove = (event: PointerEvent) => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(() => {
				const rect = el.getBoundingClientRect()
				const px = (event.clientX - rect.left) / rect.width - 0.5
				const py = (event.clientY - rect.top) / rect.height - 0.5
				el.style.setProperty('--tilt-y', `${px * 4}deg`)
				el.style.setProperty('--tilt-x', `${py * -4}deg`)
				el.style.setProperty('--parallax-x', `${px * -16}px`)
				el.style.setProperty('--parallax-y', `${py * -16}px`)
				el.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
				el.style.setProperty('--my', `${(py + 0.5) * 100}%`)
			})
		}
		const reset = () => {
			cancelAnimationFrame(frame)
			el.style.setProperty('--tilt-x', '0deg')
			el.style.setProperty('--tilt-y', '0deg')
			el.style.setProperty('--parallax-x', '0px')
			el.style.setProperty('--parallax-y', '0px')
			el.style.setProperty('--mx', '50%')
			el.style.setProperty('--my', '50%')
		}

		el.addEventListener('pointermove', onMove)
		el.addEventListener('pointerleave', reset)
		return () => {
			el.removeEventListener('pointermove', onMove)
			el.removeEventListener('pointerleave', reset)
			cancelAnimationFrame(frame)
		}
	}, [reduceMotion])

	const longest = useMemo(
		() => texts.reduce((a, b) => (a.length >= b.length ? a : b)),
		[],
	)

	return (
		<HamburgerProvider>
			<Menu />
			<div ref={cardRef} className={styles.app}>
				<motion.h1
					className='text'
					aria-label='Nice to meet you. Thank you.'
					initial='hidden'
					animate='visible'
				>
					<motion.span
						className='heading-line stroked'
						variants={heroLines.greeting}
						aria-hidden='true'
					>
						Nice to meet you,
					</motion.span>
					<motion.span
						className='heading-line filled'
						variants={heroLines.rotator}
						aria-hidden='true'
					>
						<span className='rotator'>
							<span className='rotator__ghost'>{longest}</span>
							<AnimatePresence mode='popLayout' initial={false}>
								<motion.span
									key={index}
									className='rotator__current'
									initial={{ y: '60%', opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: '-60%', opacity: 0 }}
									transition={{
										duration: 0.4,
										ease: [0.22, 1, 0.36, 1],
									}}
								>
									{texts[index]}
								</motion.span>
							</AnimatePresence>
						</span>
					</motion.span>
					<motion.span
						className='heading-line stroked'
						variants={heroLines.closer}
						aria-hidden='true'
					>
						Thank you.
					</motion.span>
					<motion.span
						className='subheading'
						variants={heroLines.subhead}
						aria-hidden='true'
					>
						Tomorrows hospitality tech today
					</motion.span>
				</motion.h1>
			</div>
		</HamburgerProvider>
	)
}

export default App
