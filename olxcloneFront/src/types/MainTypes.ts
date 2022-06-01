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
    priceNegociable: boolean,
    description: string,
    state: string,
    images: string[],
    views: number
}

export type ItemsList = {
    id: string
    title: string
    price: number
    priceNegotiable: boolean
    image: string
}