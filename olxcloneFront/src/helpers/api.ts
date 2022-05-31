import Cookie from 'js-cookie'
import qs from 'qs'

const BASEAPI = 'http://localhost:3001'

const apiFetchPost = async (endpoint: string, body: any) => {

    if(!body.token) {
        let token = Cookie.get("token")
        if(token) {
            body.token = token
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const json = await res.json()

    if(json.notallowed){
        window.location.href = '/signin'
        return
    }

    return json
}

const apiFetchGet = async (endpoint: string, body: any ) => {

    if(!body.token) {
        let token = Cookie.get("token")
        if(token) {
            body.token = token
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`)
    const json = await res.json()

    if(json.notallowed){
        window.location.href = '/signin'
        return
    }

    return json
}

const apiFecthFile = async (endpoint: string, body: any) => {
    let token = Cookie.get("token")
    const res = await fetch(BASEAPI+endpoint, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body
    })
    const json = await res.json()

    if(json.notallowed){
        window.location.href = '/signin'
        return
    }

    return json
}

export const Api = {
    login: async (email: string, password: string) => {
        const json = await apiFetchPost(
            "/user/signin",
            {email, password}
        )
        return json 
    },
    register: async (name: string, email: string, password: string, state: string) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state}
        )
        return json
    },
    getStates: async () => {
        const json = await apiFetchGet(
            '/states',
            {}
        )
        return json.states
    },
    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories',
            {}
        )
        return json.categories
    },
    getAds: async (options: any) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        )
        return json
    },
    getItem: async (id: string, other = false) => {
        const json  = await apiFetchGet(
            '/ad/item',
            {id, other}
        )
        return(json)
    },
    addAd: async (formData: FormData) => {
        const json = await apiFecthFile(
            "/ad/add",
            formData
        )
        return json
    },
}