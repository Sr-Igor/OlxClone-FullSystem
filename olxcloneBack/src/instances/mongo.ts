import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let db_url = process.env.MONGO_URL as string

if(process.env.NODE_ENV === "test"){
    db_url = process.env.MONGO_TEST_URL as string
}

export const mongoConnect =  async () => {
    try{
        console.log("Try connection with MongoDB")
            await connect(db_url as string, {})
        console.log("Available connection with MongoDB")
    } catch(error) {
        console.log("Failure connection with MongoDB", error)
    }
}