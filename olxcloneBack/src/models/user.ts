import { Schema, model, connection } from 'mongoose';

type UserType = {
    name: string,
    email: string,
    image: string
    state: string,
    passwordHash: string,
    token: string
}

const modelSchema = new Schema<UserType>({
    name: String,
    email: String,
    state: String,
    image: String,
    passwordHash: String,
    token: String
})

const modelName = "User"

if(connection && connection.models[modelName]){
    module.exports = connection.models[modelName]
}else{
    module.exports = model(modelName, modelSchema)
}