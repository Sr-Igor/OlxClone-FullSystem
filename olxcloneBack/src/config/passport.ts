import passport from 'passport'
import dotenv from 'dotenv'
import { Strategy as JWTStrategy, ExtractJwt }  from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const User = require('../models/user')

dotenv.config;

const notAuthorized = {status: 401, message: "Not Authorized JWT"}

const options = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use(new JWTStrategy(options, async (payload, done) => {    
    const user = await User.findOne({email: payload.email})
    if(user){
        return done(null, user)
    }else {
        return done(notAuthorized, false)
    }
}))

export const generateToken = (data: Object) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY as string) 
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {    
    const authFunction = passport.authenticate("jwt", (err, user)=> {
        return user ? next() : next(notAuthorized)
    })(req, res, next)
}

export default passport 