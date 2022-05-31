import {Request, Response} from 'express'
import { validationResult, matchedData } from 'express-validator'
import sharp from 'sharp'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { unlink } from 'fs/promises'
const Category = require('../models/category')
const State = require("../models/state")
const Ads = require("../models/ads")
const User = require("../models/user")

dotenv.config()

export const getCategories = async (req: Request, res: Response) => {
    const cats = await Category.find()

    let categories = []

    for(let i in cats){
        categories.push({
            ...cats[i]._doc,
            img: `${process.env.BASE}/assets/images/${cats[i].slug}.png` 
        })
    }

    return res.json({categories})
}

export const addAction = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
    };
    const data = matchedData(req)

    // Verify available State
    if(data.state){
        if(mongoose.Types.ObjectId.isValid(data.state)){
            const stateItem = await State.findById(data.state)
            if(!stateItem){
                res.json({
                    error: {state:{msg: "State Invalid"}}
                })
                return
            }
        } else {
            res.json({error: {state:{msg: "State Code Invalid"}}})
            return
        }
    }
 
    //Verify available Category 
    if(data.category){
        if(mongoose.Types.ObjectId.isValid(data.category) && data.category){
            const categoryItem = await Category.findById(data.category)
            if(!categoryItem){
                res.json({
                    error: {state:{msg: "Category Invalid"}}
                })
                return
            }
        } else {
            res.json({ error: { state:{msg: "Category Code Invalid" } } })
            return
        }
    }
   
    // Images 
    let images: any = []
    if(req.files){
        let files: any = req.files
        files.forEach( async (item: any) => {
            images.push(item.filename)
            await sharp(item.path)
            .resize(500, 500)
            .toFormat("jpeg")
            .toFile(`./public/media/${item.filename}.jpg`)
            await unlink (item.path)
        })
    }else {
        res.status(400)
        res.json({error: "Arquivo Inválido"})
        return
    }

    //Price
    let price = parseFloat(data.price)
    if(!price){
        price = 0
    }

    // PriceNegociable 
    let priceNegociable: boolean = false
    switch(data.priceNegociable.toLowerCase()){
        case "true":
        case "1":
            priceNegociable = true
            break;
        case "false":
        case "0":
            priceNegociable = false
            break;
    }

    let token = req.headers.authorization?.slice(7)
    let user = await User.findOne({token})

    if(user){
        const newAds = new Ads({
            idUser: user._id,
            state: data.state,
            category: data.category,
            images,
            dateCreated: new Date(),
            title: data.title,
            price,
            priceNegociable,
            description: data.description ? data.description : "",
            views: 0,
            status: "Available"
        })
    
        newAds.save()
        res.json({id: newAds._id})
    }else {
        res.json({error: "User not found"})
    }
  

}

export const getList = async (req: Request, res: Response) => {
    // Array Response 
    let descryptItens : any = []

    // Options to find in DB
    let optionsFind: any = {}

    // Querys params
    let {sort, limit, state, category} = req.query

    // Get ID State 
    if(state){
        let stateId = await State.findOne({name: state})
        if(stateId._id){optionsFind.state = stateId._id}
    }

    // Get ID Category
    if(category){
        let categoryId = await Category.findOne({slug: category})
        if(categoryId._id){optionsFind.category = categoryId._id}
    }

    // Config order queryParams
    let order = 1
    if(sort == "desc"){order = -1}
    if(sort == "asc"){order = 1}

    //Request Items
    let listItems  = await Ads.find(optionsFind).sort({title: order}).limit(limit)
    
    // Get all Categories 
    let categories = await Category.find()
    // Get all States
    let states = await State.find()

    // Transform Categories/States/Images
    for (let i in listItems){
        for (let j in categories){
            if(listItems[i].category == categories[j]._id){
                listItems[i].category = categories[j].slug
            }
        }
        for (let j in states){
            if(listItems[i].state == states[j]._id){
                listItems[i].state= states[j].name
            }
        }

        let images: any = []
        listItems[i].images.map((item: string)=> {
            images.push(`${process.env.BASE}/media/${item}.jpg`) 
        })
        listItems[i].images = images
        descryptItens.push(listItems[i])
    }

    res.json({descryptItens})
}

export const getItem = async (req: Request, res: Response) => {
    let {id, other} = req.query
    let item = await Ads.findById(id)
    let images: any = []
    if(item){
        let user = await User.findById(item.idUser)
        let stateUser = await State.findById(user.state)
        let stateProduct = await State.findById(item.state)
        let category = await Category.findById(item.category)
        let userInfo ={
            name: user.name,
            email: user.email,
            stateUser: stateUser.name 
        }
        item.images.map((item: string)=> {
            images.push(`${process.env.BASE}/media/${item}.jpg`) 
        })
        item.images = images
        
        let others = []
        if(other){

            // Get all Categories 
            let categories = await Category.find()
            // Get all States
            let states = await State.find()

            let otherProducts: any = {}
            otherProducts = await Ads.find({idUser: user._id}).limit(4)
            // Transform Categories/States/Images
            for (let i in otherProducts){
                for (let j in categories){
                    if(otherProducts[i].category == categories[j]._id){
                        otherProducts[i].category = categories[j].slug
                    }
                }
                for (let j in states){
                    if(otherProducts[i].state == states[j]._id){
                        otherProducts[i].state= states[j].name
                    }
                }

                let images: any = []
                otherProducts[i].images.map((item: string)=> {
                    images.push(`${process.env.BASE}/media/${item}.jpg`) 
                })
                otherProducts[i].images = images
                others.push(otherProducts[i])
            }
        }

        let productInfo = {
            id: item._id,
            stateProduct: stateProduct.name,
            category: category.slug,
            images: item.images,
            dateCreated: item.dateCreated,
            title: item.title,
            price: item.price,
            priceNegociable: item.priceNegociable,
            description: item.description,
            views: item.views,
            status: item.status,
            userInfo,
            others
        }
        res.json({productInfo})
    }else{
        res.status(400)
        res.json({error: "Item Not Found"})
    }

}

export const editAction = async (req: Request, res: Response) => {
    //Verify Errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
    };
    const data = matchedData(req)

    let id = req.params.id
    let token = req.headers.authorization?.slice(7)
    let item = await Ads.findById(id)
    let user = await User.findOne({token})

    if(item.idUser == user._id){
        let updates: any  = {}

        //Verify Available State
        if(data.state){
            if(mongoose.Types.ObjectId.isValid(data.state)){
                const existentState = await State.findById(data.state)
                if(!existentState){
                    res.json({error: "Invalid State"})
                    return
                }
                updates.state = data.state
            } 
            else {
               res.json({error: {state:{msg: "State Code Invalid"}}})
               return
            }
        }

        //Verify Available Category 
        if(data.category){
            if(mongoose.Types.ObjectId.isValid(data.category) && data.category){
                const categoryItem = await Category.findById(data.category)
                if(!categoryItem){
                    res.status(400)
                    res.json({
                        error: {state:{msg: "Category Invalid"}}
                    })
                    return
                }else{
                    updates.category = data.category
                }
            } else {
                res.status(400)
                res.json({ error: { state:{msg: "Category Code Invalid" } } })
                return
            }
        }

        // Images
        let newImages: any = []
        if(req.files){
            console.log("reqFiles", req.files)
            let files: any = req.files
            files.forEach( async (item: any) => {
                newImages.push(`${process.env.BASE}/media/${item.filename}.jpg`)
                await sharp(item.path)
                .resize(500)
                .toFormat("jpeg")
                .toFile(`./public/media/${item.filename}.jpg`)
                await unlink (item.path)
            })
        }else {
            res.status(400)
            res.json({error: "Arquivo Inválido"})
            return
        }

        // let totalImages: any = []
        // if(data.delImages){
        //     totalImages = [...newImages]
        //     let delImages = data.delImages
        //     let currentImages = item.images
        //     for (let i in currentImages){
        //         if (!delImages.includes(currentImages[i])){
        //             totalImages.push(currentImages[i])
        //         }
        //         updates.images = totalImages
        //     }
        // }else{
        //     let currentImages = item.images
        //     totalImages = [...currentImages, ...newImages]
        //     updates.images = totalImages
        // }

        //Title
        if(data.title){
            updates.title = data.title
        }

        //Price
        if(data.price){
            let price = parseInt(data.price)
            if(!price){
                res.status(400)
                res.json({error: "Invalid Price"})
                return
            }else{
                updates.price = price
            }
        }

        //PriceNegociable
        if(data.priceNegociable){
            switch(data.priceNegociable.toLowerCase()){
                case "true":
                case "1":
                    data.priceNegociable = true
                    break;
                case "false":
                case "0":
                    data.priceNegociable = false
                    break;
            }
        }

        // Description
        if(data.description){
            updates.description = data.description
        }

        await Ads.findOneAndUpdate({token}, {$set: updates})
        res.status(201)
        res.json({})
    }
}

export const adsUser = async (req: Request, res: Response) => {
    let token = req.headers.authorization?.slice(7)
    let user = await User.findOne({token})
    let adsUser = await Ads.find({idUser: user._id})
    res.status(200)
    res.json({adsUser})
}