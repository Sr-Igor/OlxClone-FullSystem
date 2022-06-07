import { useContext, ReactNode, createContext, useReducer } from "react";

// Types 
type State = {
    userImage: string
}

type Action = {
    type: string,
    payload: string,
}

type ContextType = {
    state: State;
    dispatch: (action: Action) => void
}

type PropsChildren = {
    children: ReactNode
}

const initialData: State = {
    userImage: "/public/images/default-profile.jpg"
}

// Context 
const StateContext = createContext<ContextType | undefined>(undefined)

// Reducer
const userInfoReducer = (state: State, action: Action) => {
    switch(action.type){
        case "SET_IMAGE": 
            return {...state, userImage: action.payload}
        default:
            return state
    }
}

// Provider 
export const StateProvider = ({children}: PropsChildren) => {
    const [state, dispatch] = useReducer(userInfoReducer, initialData)
    const value = {state, dispatch}

    return(
        <StateContext.Provider value={value}>
            {children}
        </StateContext.Provider>
    )
}

// Hook 
export const useInfoReducer = () => {
    const context = useContext(StateContext)
    if(context == undefined){
        throw new Error("Instance Reducer not allowed")
    }
    return context
}
