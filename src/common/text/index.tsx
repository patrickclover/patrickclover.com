import classnames from 'classnames'
import PropType from 'prop-types'
import { CSSProperties, FunctionComponent, HTMLAttributes } from 'react'
import style from './text.module.css'

const Text: FunctionComponent<
	CSSProperties & HTMLAttributes<HTMLParagraphElement>
> = props => {
	const { className, children, ...rest } = props
	return (
		<p className={classnames(style.item, className)} style={rest}>
			{children}
		</p>
	)
}

Text.propTypes = {
	className: PropType.string,
	children: PropType.oneOfType([PropType.arrayOf(PropType.node), PropType.node])
		.isRequired,
}

Text.defaultProps = {
	className: '',
}
export default Text
