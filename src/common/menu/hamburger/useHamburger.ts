import { useCallback, useContext } from "react"
import { DispatchTypes, HamburgerContext } from "../context"


const useHamburger = () => { 
	const { state, dispatch } = useContext(HamburgerContext)

	const onToggle = useCallback(() => {
		dispatch({ type: DispatchTypes.Toggle })
	}, [dispatch])

	const onOpen = useCallback(() => {
		dispatch({ type: DispatchTypes.Open })
	}, [dispatch])

	const onClose = useCallback(() => {
		dispatch({ type: DispatchTypes.Close })
	}, [dispatch])

	return { isOpen: state.isOpen, onToggle, onOpen, onClose }
}

export default useHamburger