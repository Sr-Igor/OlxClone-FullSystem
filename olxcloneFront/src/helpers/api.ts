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

const apiFetchGet = async (endpoint: string, body?: any ) => {
    let token = Cookie.get("token")
    
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${(token ? token : '')}`
        },
    })
    const json = await res.json()
   
    if(json.notallowed){
        window.location.href = '/signin'
        return
    }
    return json
}

const apiFecthFile = async (endpoint: string, body: any) => {
    let token = Cookie.get("token")
    console.log(body)
    const res = await fetch(BASEAPI+endpoint, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${(token ? token : '')}`
        },
        body
    })
    const json = await res.json()
    console.log(json)
    if(json.notallowed){
        window.location.href = '/signin'
        return
    }

    return json
}

const apiFecthAdsUser = async (endpoint: string) => {
    let token = Cookie.get("token")
    const res = await fetch(BASEAPI+endpoint, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const json = await res.json()
    console.log(json)
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
    getUserAds: async () => {
        const json = await apiFecthAdsUser("/user/ads")
        return json
    },
    editAds: async (formData: FormData, id: any) => {
        const json = await apiFecthFile(`/ad/${id}`, formData)
        return json
    },
    deleteAds: async (id: any) => {
        const json = await apiFecthFile(
            `/del/${id}`,
            {}
        )
        return json
    },
    getUserInfo: async () => {
        const json = await apiFetchGet("/user/me")
        return json
    },
    editUser: async (formData: any) => {
        const json = await apiFecthFile('/user/edit', formData)
        return json
    },
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imlnb3JkaXNvdXNhc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE2NTQzMDAwMjh9.vxDEHPnbfOefg2SjZTBA8asZBWgTHx_0L0S5E63ONFA