export type List = {
    _id: string,
    name: string
}

export type Category = {
    _id: string
    img: string,
    name: string,
    slug: string
}

export type Item = {
    _id: string
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