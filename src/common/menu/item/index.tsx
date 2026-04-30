import classNames from 'classnames'
import { AnchorHTMLAttributes, FunctionComponent, useMemo } from 'react'
import useHamburger from '../hamburger/useHamburger'
import style from './item.module.css'

interface PassedProps {
	index: number
	title: string
	type: string
}

type MenuItemType = FunctionComponent<
	AnchorHTMLAttributes<HTMLAnchorElement> & PassedProps
>

const MenuItem: MenuItemType = props => {
	const { index, title, type, ...rest } = props
	const { isOpen } = useHamburger()
	const animationDelay = useMemo(() => `${index * 0.06 + 0.2}s`, [index])

	return (
		<li
			className={classNames(style.item, { [style.open]: isOpen })}
			style={{ animationDelay }}
		>
			<a target='_blank' rel='noreferrer' {...rest}>
				<span className={style.title}>{title}</span>
				<span className={style.type} aria-hidden='true'>
					<span className={style.typeMark}>{type}</span>
				</span>
			</a>
		</li>
	)
}

export default MenuItem
