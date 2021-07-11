import classNames from 'classnames'
import MenuItem from 'common/menu/item'
import items from 'store/menu/items.json'
import Hamburger from './hamburger'
import useHamburger from './hamburger/useHamburger'
import style from './menu.module.css'

const Menu = () => {
	const { isOpen } = useHamburger()

	return (
		<>
			<Hamburger />
			<div className={classNames(style.overlay, { [style.open]: isOpen })}>
				<nav>
					<ul>
						{items.map((item, index) => (
							<MenuItem key={item.link} href={item.link} index={index}>
								<span>{item.title}</span>
								<span className={style.subitem}>{item.type}</span>
							</MenuItem>
						))}
					</ul>
				</nav>
			</div>
		</>
	)
}

export default Menu
