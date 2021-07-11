import classNames from 'classnames'
import style from './hamburger.module.css'
import useHamburger from './useHamburger'

const Hamburger = () => {
	const { isOpen, onToggle } = useHamburger()
	return (
		<button
			type='button'
			onClick={onToggle}
			className={classNames(style.hamburger, {
				[style.active]: isOpen,
			})}
		>
			<span className={style.top} />
			<span className={style.middle} />
			<span className={style.bottom} />
		</button>
	)
}

export default Hamburger
