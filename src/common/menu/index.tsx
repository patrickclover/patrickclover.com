import classNames from 'classnames'
import MenuItem from 'common/menu/item'
import { useEffect } from 'react'
import items from 'store/menu/items.json'
import Hamburger from './hamburger'
import useHamburger from './hamburger/useHamburger'
import style from './menu.module.css'

const Menu = () => {
	const { isOpen, onClose } = useHamburger()

	useEffect(() => {
		if (!isOpen) return undefined

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', onKey)

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', onKey)
			document.body.style.overflow = previousOverflow
		}
	}, [isOpen, onClose])

	return (
		<>
			<Hamburger />
			<div
				id='primary-menu'
				className={classNames(style.overlay, { [style.open]: isOpen })}
				aria-hidden={!isOpen}
			>
				<nav aria-label='Primary'>
					<ul>
						{items.map((item, index) => (
							<MenuItem
								key={item.link}
								href={item.link}
								index={index}
								title={item.title}
								type={item.type}
								tabIndex={isOpen ? 0 : -1}
							/>
						))}
					</ul>
				</nav>
			</div>
		</>
	)
}

export default Menu
