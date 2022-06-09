import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect =  async () => {
    try{
        console.log("Try connection with MongoDB")
            await connect(process.env.MONGO_URL as string, {})
        console.log("Available connection with MongoDB")
    } catch(error) {
        console.log("Failure connection with MongoDB", error)
    }
}