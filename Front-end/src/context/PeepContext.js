import { createContext, useReducer } from 'react'

const PeepsContext = createContext()

const peepsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PEEPS':
            return {
                peeps: action.payload
            }
        case 'CREATE_PEEP':
            return {
                peeps: [action.payload, ...state.peeps]
            }
        case 'DELETE_PEEP':
            return {
                peeps: state.peeps.filter(peep => peep._id !== action.payload._id)
            }
        default:
            return state
    }
}

const PeepsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(peepsReducer, {
        peeps: null
    })

    return (
        <PeepsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PeepsContext.Provider>
    )
}

export {
    PeepsContext,
    peepsReducer,
    PeepsContextProvider
}