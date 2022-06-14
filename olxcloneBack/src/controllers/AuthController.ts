import {Request, Response} from 'express'
import { validationResult, matchedData } from 'express-validator'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { generateToken } from '../config/passport'
// const User = require("../models/user")
// const State = require("../models/state")
import * as MainServices from "../services/MainServices"
import * as UserServices from "../services/UserServices"

export const singIn = async (req: Request, res: Response) => {
    // Verify Errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
    };
    const data = matchedData(req)

    const result = await UserServices.singInUser(data)

    if(result instanceof Error){
        res.status(400)
        res.json({error: result.message})
        return
    }
   
    res.json({token: result, email: data.email})
}

export const singUp = async (req: Request, res: Response) => {
    // Verify Errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
    };
    const data = matchedData(req)
    const result = await UserServices.createUser(data)

    if(result instanceof Error){
        res.status(400)
        res.json({error: result.message})
        return
    }
  
    res.status(201)
    res.json({status: true, token: result})
}
