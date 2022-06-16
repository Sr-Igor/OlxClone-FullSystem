const User = require("../models/user")
const State = require("../models/state")
import bcrypt from 'bcrypt'
import { generateToken } from '../config/passport'
import mongoose from 'mongoose'
import { Request } from "express"
import sharp from 'sharp'
import { unlink } from 'fs'


export const findUserEmail = async (email: string) => {
    return await User.findOne({email})
}

export const updateUser = async (token: string|undefined, data:Record<string, any>, req: Request|{file: ""}) => {
    let updates: any = {}

    if(data.name){
        updates.name = data.name
    }

    if(data.email){
        
        const existentEmail = await User.findOne({email: data.email})
        if(existentEmail){
            return new Error("E-mail já registrado")
        }else {
            updates.email = data.email
        }
    }

    if(data.state){
        if(mongoose.Types.ObjectId.isValid(data.state)){
            const existentState = await State.findById(data.state)
            if(!existentState){
                return new Error("Estado inválido")
            }
            updates.state = data.state
        } 
        else {
            return new Error("Código de estado inválido")
        }
    }

    if(data.newPassword && data.password){
        const userToken = await User.findOne({token})
        const match = await bcrypt.compare(data.password, userToken.passwordHash)
        if(match){
            let passwordHash = await bcrypt.hash(data.newPassword, 10)
            updates.passwordHash = passwordHash
        }else{
            return new Error("Senha atual incorreta")
        }
    }
    
    let image;
    if(req.file){
        let file = req.file as Express.Multer.File
            image = file.filename
            updates.image = image
            await sharp(file.path)
            .resize(500, 500)
            .toFormat("jpeg")
            .toFile(`./public/media/${file.filename}.jpg`)
            unlink(file.path, (err) => {
                if (err) throw err;
            })
    }

    if(data.delProfileImage){
        let user = await User.findOne({token})
        unlink(`./public/media/${user.image}.jpg`, (err) => {
            if (err) throw err;
        })
        updates.image = ""
    }
    
    let userImageProfile = (image) ? `${process.env.BASE}/media/${image}.jpg`: null
    await User.findOneAndUpdate({token}, {$set: updates})
    return userImageProfile
}

export const createUser = async (data:Record<string, any>) => {
    console.log("email em serivces", data.email)
  // Verify existent user
  const user = await User.findOne({email: data.email})
  if(user){
      return new Error("E-mail já registrado")
  }

  // Verify available State
  const stateItem = await State.findById(data.state)
  if(mongoose.Types.ObjectId.isValid(data.state) && data.state){
      if(!stateItem){
        return new Error("Estado inválido")
      }
  } else {
    return new Error("Código de estado inválido")
  }

  // Crypt password
  const passwordHash = await bcrypt.hash(data.password, 10)

  // Generate Token
  const token = generateToken(data)

  // Create User
  const newUser = await new User({
      name: data.name,
      email: data.email,
      passwordHash,
      token,
      state: data.state
  })
  await newUser.save()
  return token
}

export const singInUser = async (data:Record<string, any>) => {
     // Verify User for Email
     const user = await User.findOne({email: data.email})
     if(!user) { 
         return new Error("E-mail e/ou senha incorreto(s)")
     }
     
     // Verify User for password
     const match = await bcrypt.compare(data.password, user.passwordHash)
     if(!match) {
        return new Error("E-mail e/ou senha incorreto(s)")
     }
 
     //Generate Token 
     const token = generateToken(data)
 
     // Save new Token
     user.token = token 
     await user.save()

     return token
}

export const findStateId = async (state: string|undefined) => {
    const completState = await State.findById(state)
    return (completState)?completState.name:""
}

export const findAllStates = async () => {
    return await State.find()
}