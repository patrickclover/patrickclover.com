import classnames from 'classnames'
import PropType from 'prop-types'
import { CSSProperties, FunctionComponent, HTMLAttributes } from 'react'
import style from './text.module.css'

const Heading: FunctionComponent<
	CSSProperties & HTMLAttributes<HTMLParagraphElement>
> = props => {
	const { className, children, ...rest } = props
	return (
		<h1 className={classnames(style.heading, className)} style={rest}>
			{children}
		</h1>
	)
}

Heading.propTypes = {
	className: PropType.string,
	children: PropType.oneOfType([PropType.arrayOf(PropType.node), PropType.node])
		.isRequired,
}

Heading.defaultProps = {
	className: '',
}
export default Heading
