import classNames from 'classnames'
import PropType from 'prop-types'
import { AnchorHTMLAttributes, FunctionComponent, PropsWithChildren, useMemo } from 'react'
import useHamburger from '../hamburger/useHamburger'
import style from './item.module.css'

interface PassedProps {
	index: number
}

type MenuItemType = FunctionComponent<PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & PassedProps>>

const MenuItem: MenuItemType = props => {
	const { index, ...rest } = props
	const animationDelay = useMemo(() => `${index / 20 + 0.35}s`, [index])
	const { isOpen } = useHamburger()
	return (
		<li
			className={classNames(style.item, { [style.open]: isOpen })}
			style={{ animationDelay }}
		>
			{/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
			<a target='_blank' rel='noreferrer' {...rest} />
		</li>
	)
}

MenuItem.propTypes = {
	index: PropType.number.isRequired,
}

export default MenuItem
