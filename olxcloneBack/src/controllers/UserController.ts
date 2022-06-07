import {Request, Response} from 'express'
import { validationResult, matchedData } from 'express-validator'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import sharp from 'sharp'
import { unlink } from 'fs'
const State = require('../models/state')
const User = require("../models/user")
const Category = require("../models/category")
const Ads = require('../models/ads')

type AdsTypeForUser = {
    id: string,
    // state: string,
    category: string,
    images: [object],
    dateCreated: Date,
    title: string,
    price: number,
    priceNegociable: boolean,
    description: String,
    views: number,
    status: string
}


export const getStates = async (req: Request, res: Response) => {
    let states = await State.find()
    res.json({states})
}

export const info = async (req: Request, res: Response) => {
    let token = req.headers.authorization?.slice(7)
    const user = await User.findOne({token})
    const state = await State.findById(user.state)
    const ads = await Ads.find({idUser: user._id.toString()})

    let adList: AdsTypeForUser[] = []
    for (let i in ads) {
        const category = await Category.findById(ads[i].category)
        adList.push({ ...ads[i], category: category.slug })
    }

    let image
    if(user.image || user.image !== ""){
        image = `${process.env.BASE}/media/${user.image}.jpg`
    }else{
        image = ""
    }

    res.json({
        name: user.name,
        email: user.email,
        state: state.name,
        image,
        ads: adList
    })
}

export const editActions = async (req: Request, res: Response) => {
    console.log(req.body)

    // Verify Errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
    };
    const data = matchedData(req)

    let token = req.headers.authorization?.slice(7)
    let updates: any = {}

    if(data.name){
        updates.name = data.name
    }

    if(data.email){
        
        const existentEmail = await User.findOne({email: data.email})
        if(existentEmail){
            res.status(400)
            res.json({error: "E-mail already registered"})
            return
        }else {
            updates.email = data.email
        }
    }

    if(data.state){
        if(mongoose.Types.ObjectId.isValid(data.state)){
            const existentState = await State.findById(data.state)
            if(!existentState){
                res.status(400)
                res.json({error: "Invalid State"})
                return
            }
            updates.state = data.state
        } 
        else {
            res.status(400)
            res.json({error: {state:{msg: "State Code Invalid"}}})
            return
        }
    }

    if(data.newPassword && data.password){
        const userToken = await User.findOne({token})
        const match = await bcrypt.compare(data.password, userToken.passwordHash)
        if(match){
            let passwordHash = await bcrypt.hash(data.newPassword, 10)
            updates.passwordHash = passwordHash
        }else{
            res.status(400)
            res.json({error: "Invalid Current Password"})
            return
        }
    }
    let image;
    console.log(req.file)
    if(req.file){
        let file: any = req.file
            image = file.filename
            updates.image = image
            await sharp(file.path)
            .resize(500, 500)
            .toFormat("jpeg")
            .toFile(`./public/media/${file.filename}.jpg`)
            await unlink(file.path, (err) => {
                if (err) throw err;
                console.log('path/file.txt was deleted');
              })
    }else {
        image = ""
        updates.image = image
    }
    
    let userImageProfile = (image) ? `${process.env.BASE}/media/${image}.jpg`: null
    await User.findOneAndUpdate({token}, {$set: updates})
    res.status(201)
    res.json({error: "", image: userImageProfile})
}

// export const findUser = async (req: Request, res: Response) => {
//     let token = req.headers.authorization?.slice(7)
//     let user = await User.findOne({token})
//     if(!user){
//         res.status(400)
//         res.json({error: "Invalid Token"})
//     }
//     res.status(200)
//     res.json({email: user.email})
// }