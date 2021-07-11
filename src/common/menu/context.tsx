import PropType from 'prop-types'
import { createContext, Dispatch, FunctionComponent, useReducer } from 'react'

// eslint-disable-next-line no-shadow
export enum DispatchTypes {
	// eslint-disable-next-line no-unused-vars
	Open = 'OPEN_MENU',
	// eslint-disable-next-line no-unused-vars
	Close = 'CLOSE_MENU',
	// eslint-disable-next-line no-unused-vars
	Toggle = 'TOGGLE_MENU',
}

interface ToggleProps {
	isOpen: boolean
}

const initialState: ToggleProps = {
	isOpen: true,
}

type Action =
	| { type: DispatchTypes.Open }
	| { type: DispatchTypes.Close }
	| { type: DispatchTypes.Toggle }

export type MenuActions = Action

function hamburgerReducer(state: ToggleProps, action: MenuActions) {
	switch (action.type) {
		case DispatchTypes.Open: {
			return { isOpen: true }
		}
		case DispatchTypes.Close: {
			return { isOpen: false }
		}
		case DispatchTypes.Toggle: {
			return { isOpen: !state.isOpen }
		}
		default: {
			throw new Error(`Unhandled action type: ${action}`)
		}
	}
}

const HamburgerContext = createContext<{
	state: ToggleProps
	dispatch: Dispatch<MenuActions>
}>({ state: initialState, dispatch: () => null })

const HamburgerProvider: FunctionComponent = ({ children }) => {
	const [state, dispatch] = useReducer(hamburgerReducer, initialState)

	const value = { state, dispatch }
	return (
		<HamburgerContext.Provider value={value}>
			{children}
		</HamburgerContext.Provider>
	)
}

HamburgerProvider.propTypes = {
	children: PropType.oneOfType([PropType.arrayOf(PropType.node), PropType.node])
		.isRequired,
}

export { HamburgerProvider, HamburgerContext }
