import { useCallback, useContext } from 'react'
import { flushSync } from 'react-dom'
import { DispatchTypes, HamburgerContext, MenuActions } from '../context'

const useHamburger = () => {
	const { state, dispatch } = useContext(HamburgerContext)

	const fire = useCallback(
		(action: MenuActions) => {
			const doc = document as Document & {
				startViewTransition?: (cb: () => void) => unknown
			}
			if (typeof doc.startViewTransition === 'function') {
				doc.startViewTransition(() => {
					flushSync(() => dispatch(action))
				})
			} else {
				dispatch(action)
			}
		},
		[dispatch],
	)

	const onToggle = useCallback(() => {
		fire({ type: DispatchTypes.Toggle })
	}, [fire])

	const onOpen = useCallback(() => {
		fire({ type: DispatchTypes.Open })
	}, [fire])

	const onClose = useCallback(() => {
		fire({ type: DispatchTypes.Close })
	}, [fire])

	return { isOpen: state.isOpen, onToggle, onOpen, onClose }
}

export default useHamburger
