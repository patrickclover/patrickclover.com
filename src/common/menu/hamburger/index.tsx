import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import style from './hamburger.module.css'
import useHamburger from './useHamburger'

const Hamburger = () => {
	const { isOpen, onToggle } = useHamburger()
	const ref = useRef<HTMLButtonElement>(null)
	const isOpenRef = useRef(isOpen)
	isOpenRef.current = isOpen

	useEffect(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
		if (!fine.matches || reduce.matches) return undefined
		const el = ref.current
		if (!el) return undefined

		let frame = 0
		let lastX = 0
		let lastY = 0
		let lastTime = 0

		const reset = () => {
			cancelAnimationFrame(frame)
			el.style.setProperty('--mag-x', '0px')
			el.style.setProperty('--mag-y', '0px')
			el.style.setProperty('--proximity', '0')
			el.style.setProperty('--velocity', '0')
		}

		const onMove = (event: PointerEvent) => {
			if (isOpenRef.current) {
				reset()
				return
			}
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(() => {
				const now = performance.now()
				const dt = Math.max(now - lastTime, 1)
				const speed = Math.min(
					Math.hypot(event.clientX - lastX, event.clientY - lastY) / dt,
					3,
				)
				lastX = event.clientX
				lastY = event.clientY
				lastTime = now

				const rect = el.getBoundingClientRect()
				const cx = rect.left + rect.width / 2
				const cy = rect.top + rect.height / 2
				const dx = event.clientX - cx
				const dy = event.clientY - cy
				const distance = Math.hypot(dx, dy)
				const halo = Math.max(0, 1 - distance / 220)
				const pull = Math.max(0, 1 - distance / 110)
				/* Speed amplifies the magnet — fast approach = snappier pull. */
				const speedBoost = 1 + speed * 0.18
				const tx = dx * 0.18 * pull * speedBoost
				const ty = dy * 0.18 * pull * speedBoost
				el.style.setProperty('--mag-x', `${tx.toFixed(2)}px`)
				el.style.setProperty('--mag-y', `${ty.toFixed(2)}px`)
				el.style.setProperty('--proximity', halo.toFixed(3))
				el.style.setProperty('--velocity', speed.toFixed(3))
			})
		}

		document.addEventListener('pointermove', onMove)
		document.addEventListener('pointerleave', reset)
		return () => {
			document.removeEventListener('pointermove', onMove)
			document.removeEventListener('pointerleave', reset)
			cancelAnimationFrame(frame)
		}
	}, [])

	const handleClick = () => {
		const el = ref.current
		if (el) {
			/* Snap the magnetic offset to origin BEFORE the view-transition
			 * snapshot fires, so the button doesn't visibly drop after the menu
			 * opens. The CSS transition smooths the retreat in the same frame as
			 * the menu reveal. */
			el.style.setProperty('--mag-x', '0px')
			el.style.setProperty('--mag-y', '0px')
			el.style.setProperty('--proximity', '0')
			el.style.setProperty('--velocity', '0')
		}
		onToggle()
	}

	return (
		<button
			ref={ref}
			type='button'
			onClick={handleClick}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isOpen}
			aria-controls='primary-menu'
			className={classNames(style.hamburger, {
				[style.active]: isOpen,
			})}
		>
			<span className={style.halo} aria-hidden='true' />
			<span className={style.bars} aria-hidden='true'>
				<span className={style.top} />
				<span className={style.middle} />
				<span className={style.bottom} />
			</span>
		</button>
	)
}

export default Hamburger
