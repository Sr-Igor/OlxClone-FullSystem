export type StateList = {
    _id: string,
    name: string
}

export type CategoryList = {
    _id: string
    img: string,
    name: string,
    slug: string
}

export type SingleItem = {
    id: string
    title: string,
    category: string,
    price: number,
    dateCreated: Date,
    priceNegotiable: boolean,
    description: string,
    state: string,
    others: ItemsList[] | [],
    images: string[],
    views: number,
    status: boolean,
    userInfo: UserInfo
}

export type ItemsList = {
    id: string
    title: string
    price: number
    priceNegotiable: boolean
    image: string
}

export type UserInfo = {
    name: string,
    email: string,
    state: string,
    image: string
}
