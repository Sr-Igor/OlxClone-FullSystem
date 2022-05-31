import { Schema, model, connection } from 'mongoose';

type StateType = {
    name: string
}

const modelSchema = new Schema<StateType>({
   name: String
})

const modelName = "State"

if(connection && connection.models[modelName]){
    module.exports = connection.models[modelName]
}else{
    module.exports = model(modelName, modelSchema)
}
