import { ReactNode } from "react"
import { SignIn } from "../pages/SignIn"
import { isLogged } from "./AuthHandler"

type Props = {
    children: JSX.Element
}

export const PrivateRoute = ({children}: Props) => {
    const logged = isLogged()
    if(logged){return children}
    return <SignIn />
}