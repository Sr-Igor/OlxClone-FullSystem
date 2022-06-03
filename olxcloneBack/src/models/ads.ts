import { Schema, model, connection } from 'mongoose';

type AdsType = {
    idUser: string,
    state: string,
    category: string,
    images: [object],
    dateCreated: Date,
    title: string,
    price: number,
    priceNegotiable: boolean,
    description: String,
    views: number,
    status: boolean
}

const modelSchema = new Schema<AdsType>({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: Boolean
})

const modelName = "Ads"

if(connection && connection.models[modelName]){
    module.exports = connection.models[modelName]
}else{
    module.exports = model(modelName, modelSchema)
}