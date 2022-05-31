import Cookie from 'js-cookie'

export const isLogged = () => {
    let token = Cookie.get("token")
    return (token) ? true : false
}

export const doLogin = (token: string, rememberPassword: boolean) => {
    if(rememberPassword) {
        Cookie.set("token", token, {expires: 999})
    }else {
        Cookie.set("token", token)
    }
}

export const doLogout = () => {
    Cookie.remove("token")
}