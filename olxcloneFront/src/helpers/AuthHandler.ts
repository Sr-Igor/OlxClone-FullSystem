// Cookies
import Cookie from 'js-cookie'

export const isLogged = () => {
    let token = Cookie.get("token")
    
    if(token){
        let email = localStorage.getItem("email")
        return({logged: true, email})
    }else{
        return({logged: false, email: false})
    }
}

export const doLogin = (token: string, rememberPassword: boolean, email: string) => {
    if(rememberPassword) {
        Cookie.set("token", token, {expires: 999})
    }else {
        Cookie.set("token", token)
    }
    localStorage.setItem("email", email)
}

export const doLogout = () => {
    Cookie.remove("token")
    localStorage.removeItem("email")
}