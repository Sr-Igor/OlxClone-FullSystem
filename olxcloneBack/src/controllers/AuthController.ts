import {Request, Response} from 'express'
import { validationResult, matchedData } from 'express-validator'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { generateToken } from '../config/passport'
const User = require("../models/user")
const State = require("../models/state")

export const singIn = async (req: Request, res: Response) => {
    // Verify Errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
    };
    const data = matchedData(req)

    // Verify User for Email
    const user = await User.findOne({email: data.email})
    if(!user) { 
        res.status(400)
        res.json({error: "E-mail and/or Password Incorrect"})
        return 
    }

    // Verify User for password
    const match = await bcrypt.compare(data.password, user.passwordHash)
    if(!match) {
        res.status(400)
        res.json({error: "E-mail and/or Password Incorrect"})
        return
    }

    //Generate Token 
    const token = generateToken(data)

    // Save new Token
    user.token = token 
    await user.save()
    res.json({token, email: data.email})
}

export const singUp = async (req: Request, res: Response) => {
    // Verify Errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
    };
    const data = matchedData(req)

    // Verify existent user
    const user = await User.findOne({
        email: data.email
    })
    if(user){
        res.status(400)
        res.json({
            error: {email:{msg: "Email has already been registered"}}
        })
        return
    }

    // Verify available State
    const stateItem = await State.findById(data.state)
    if(mongoose.Types.ObjectId.isValid(data.state) && data.state){
        if(!stateItem){
            res.status(400)
            res.json({
                error: {state:{msg: "State Invalid"}}
            })
            return
        }
    } else {
        res.status(400)
        res.json({
            error: {state:{msg: "State Code Invalid"}}
        })
    }

    // Crypt password
    const passwordHash = await bcrypt.hash(data.password, 10)

    // Generate Token
    const token = generateToken(data)

    // Create User
    const newUser = new User({
        name: data.name,
        email: data.email,
        passwordHash,
        token,
        state: data.state
    })
    await newUser.save()
    res.status(201)
    res.json({status: true, token})
}
