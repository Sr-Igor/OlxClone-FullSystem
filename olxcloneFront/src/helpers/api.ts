// Cookies
import Cookie from 'js-cookie'

// QueryString transform
import qs from 'qs'

type Options =  {
    sort: string
    limit: number
    q?: string
    cat?: string
    state?: string
    offset?: number
}

type FetchPost = {
    email?: string,
    password?: string,
    name?: string, 
    state?: string,

}

type FetchGet = {
    id?: string
    other?: boolean
    sort?: string
    limit?: number
    q?: string
    cat?: string
    state?: string
    offset?: number
}

const BASEAPI = import.meta.env.VITE_BASE

const apiFetchPost = async (endpoint: string, body: FetchPost) => {
    const res = await fetch(BASEAPI+endpoint, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const json = await res.json()

    if(json.error == "Not Authorized JWT"){
        window.location.href = '/signin'
        return
    }

    return json
}

const apiFetchGet = async (endpoint: string, query?: FetchGet ) => {
    let token = Cookie.get("token")
    
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(query)}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const json = await res.json()
   
    if(json.error == "Not Authorized JWT"){
        window.location.href = '/signin'
        return
    }
    return json
}

const apiFecthFile = async (endpoint: string, body?: FormData) => {
    let token = Cookie.get("token")
    const res = await fetch(BASEAPI+endpoint, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body
    })
    const json = await res.json()
    if(json.error == "Not Authorized JWT"){
        window.location.href = '/signin'
        return
    }

    return json
}

export const Api = {
    //Login Register
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

    //States and Category
    getStates: async () => {
        const json = await apiFetchGet('/states')
        return json.states
    },
    getCategories: async () => {
        const json = await apiFetchGet('/categories',)
        return json.categories
    },

    // Ads Info and Actions
    getAds: async (options: Options) => {
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
    getUserAds: async (options: Options) => {
        const json = await apiFetchGet("/user/anun", options)
        return json
    },
    editAds: async (formData: FormData, id: string) => {
        const json = await apiFecthFile(`/ad/${id}`, formData)
        return json
    },
    deleteAds: async (id: string) => {
        const json = await apiFecthFile(`/del/${id}`)
        return json
    },

    // User Info and Actions
    getUserInfo: async () => {
        const json = await apiFetchGet("/user/me")
        return json
    },
    editUser: async (formData: FormData) => {
        const json = await apiFecthFile('/user/edit', formData)
        return json
    },
}