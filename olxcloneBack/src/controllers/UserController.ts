import {Request, Response} from 'express'
import { validationResult, matchedData } from 'express-validator'
import * as MainServices from "../services/MainServices"
import * as UserServices from "../services/UserServices"


export const getStates = async (req: Request, res: Response) => {
    let states = await UserServices.findAllStates()
    res.json({states})
}

export const info = async (req: Request, res: Response) => {
    let token = req.headers.authorization?.slice(7)
    const user = await MainServices.findUser(token)
    const stateName = await UserServices.findStateId(user.state)

    let image
    if(user.image && user.image !== ""){
        image = `${process.env.BASE}/media/${user.image}.jpg`
    }else{
        image = ""
    }
    res.json({
        name: user.name,
        email: user.email,
        state: stateName,
        image,
    })
}

export const editActions = async (req: Request, res: Response) => {
    // Verify Errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
    };
    const data = matchedData(req)
    let token = req.headers.authorization?.slice(7)

    const result = await UserServices.updateUser(token, data, req)

    if(result instanceof Error){
        res.status(400)
        res.json({error: result})
        return
    }
    
    res.status(201)
    res.json({error: "", image: result})
}
