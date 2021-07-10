import PropType from 'prop-types'
import { useRef } from 'react'
import style from './text.module.css'

interface PassedProps {
	strings: string[]
}

const AnimatedText = ({ strings }: PassedProps) => {
	const text1 = useRef<HTMLSpanElement | null>(null)
	const text2 = useRef<HTMLSpanElement | null>(null)

	return (
		<>
			<span ref={text1} className={style.item}>
				{strings[0]}
			</span>
			<span ref={text2} className={style.item}>
				{strings[1]}
			</span>
		</>
	)
}

AnimatedText.propTypes = {
	strings: PropType.arrayOf(PropType.string).isRequired,
}

export default AnimatedText
