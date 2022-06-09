import {Request, Response} from 'express'
import sharp from 'sharp'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { unlink } from 'fs/promises'
import fs from "fs"
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

export const addAction = async (req: Request, res: Response, ) => {
    let {title, price, priceNegotiable, description, category, state} = req.body
    let token = req.headers.authorization?.slice(7)
    let user = await User.findOne({token}).exec()

    if(!title || !category){
        res.json({error: "Titulo e/ou categoria inválido(s)"})
        return
    }

    if(price){
        price = parseFloat(price.replace(".", "").replace(",", ".").replace("R$",""))
    }else {
        price = 0
    }

    // Verify available State
    if(state){
        if(mongoose.Types.ObjectId.isValid(state)){
            const stateItem = await State.findById(state)
            if(!stateItem){
                res.json({
                    error: {state:{msg: "Estado inválido"}}
                })
                return
            }
        } else {
            res.json({error: {state:{msg: "Código de estado inválido"}}})
            return
        }
    }
 
    //Verify available Category 
    if(category){
        if(mongoose.Types.ObjectId.isValid(category)){
            const categoryItem = await Category.findById(category)
            if(!categoryItem){
                res.json({
                    error: {state:{msg: "Categoria inválida"}}
                })
                return
            }
        } else {
            res.json({ error: { state:{msg: "Código de categoria inválido" } } })
            return
        }
    }

    // Images 
    let images: string[]= []
    if(req.files){
        let files = req.files as Express.Multer.File[]
        files.forEach( async (item) => {
            images.push(item.filename)
            await sharp(item.path)
            // .resize()
            .toFormat("jpeg")
            .toFile(`./public/media/${item.filename}.jpg`)
            await unlink (item.path)
        })
    }else {
        res.status(400)
        res.json({error: "Arquivo inválido"})
        return
    }

    const newAds = new Ads({
        status: true,
        idUser: user._id,
        state,
        dateCreated: new Date(),
        title,
        category,
        price,
        priceNegotiable: (priceNegotiable == "true") ? true : false,
        description,
        views: 0,
        images
    })
    newAds.save()
    res.json({id: newAds._id})
}

export const getList = async (req: Request, res: Response) => {
    let {sort = "asc", offset= 0, limit = 8, q, cat, state } = req.query
    let options: any = {status: true}
    let total = 0

    if(q) {options.title = {'$regex': q, '$options': 'i'}}

    if(cat){
        const c = await Category.findOne({slug: cat})
        if(c){options.category = c._id}
    }

    if(state){
        const s = await State.findOne({name: state})
        if(s){options.state = s._id}
    }

    const adsTotal = await Ads.find(options)
    total = adsTotal.length

    const adsData = await Ads.find(options)
    .sort({dateCreated: (sort == "desc"? -1: 1)})
    .skip(Number(offset))
    .limit(Number(limit))
    let ads = []
    for (let i in adsData){
        let image = ""
        if(adsData[i].images[0]){
            image = `${process.env.BASE}/media/${adsData[i].images[0]}.jpg`
        }else {
            image = `${process.env.BASE}/media/default-img.jpg`
        }

        ads.push({
            id: adsData[i]._id,
            title: adsData[i].title,
            price: adsData[i].price,
            priceNegotiable: adsData[i].priceNegotiable,
            image
        })
    }

    res.json({ads, total})
}

export const getItem = async (req: Request, res: Response) => {
    let {id, other = null} = req.query
    if(!id){
        res.status(400)
        res.json({error: "Item não encontrado"})
        return
    }

    let item = await Ads.findById(id)
    if(!item){
        res.status(400)
        res.json({error: "Item não encontrado"})
        return 
    }

    let images: string[] = []
    for (let i in item.images){
        images.push(`${process.env.BASE}/media/${item.images[i]}.jpg`) 
    }
    if(images.length == 0){
        images.push(`${process.env.BASE}/media/default-img.jpg`)
    }

    let category = await Category.findById(item.category)
    let userInfo = await User.findById(item.idUser)
    let stateUser = await State.findById(userInfo.state)
    let stateProduct = await State.findById(item.state)

    let imageUser
    if(userInfo.image !== ""){
        imageUser = `${process.env.BASE}/media/${userInfo.image}.jpg`
    }else{
        imageUser = ""
    }

    let others: object[] = []
    if(other === "true") {
        const otherProducts = await Ads.find({status: true, idUser: item.idUser}).limit(4)
        for(let i in otherProducts){
            if(otherProducts[i]._id.toString() !== item._id.toString()){
                let image = ""
                if(otherProducts[i].images[0]){
                    image = `${process.env.BASE}/media/${otherProducts[i].images[0]}.jpg`
                }else {
                    image = `${process.env.BASE}/media/default-img.jpg`
                }

                others.push({
                    id: otherProducts[i]._id,
                    title: otherProducts[i].title,
                    price: otherProducts[i].price,
                    priceNegotiable: otherProducts[i].priceNegotiable,
                    image
                })
            }
        }
    }

    let productInfo = {
        id: item._id,
        title: item.title,
        price: item.price,
        priceNegotiable: item.priceNegotiable,
        description: item.description,
        dateCreated: item.dateCreated,
        views: item.views,
        images,
        category: category.slug,
        state: stateProduct.name,
        status: item.status,
        userInfo: {
            name: userInfo.name,
            email: userInfo.email,
            state: stateUser.name,
            image: imageUser
        },
        others
    }

    item.views++
    await item.save()
    res.json({productInfo})   
}

export const editAction = async (req: Request, res: Response) => {
    let { id } = req.params
    let {title, status, price, priceNegotiable, description, cat, delImages, state} = req.body
    let token = req.headers.authorization?.slice(7)
    if(id.length < 12){
        res.status(400)
        res.json({error: "Id inválido"})
        return
    }

    let item = await Ads.findById(id)
    if(!item){
        res.status(400)
        res.json({error: "Item inválido"})
        return
    }

    let user = await User.findOne({token})
    if(user._id.toString() !== item.idUser){
        res.status(400)
        res.json({error: "Anúncio não pertence ao usuário logado"})
        return
    }

    let updates: any = {}

    if(title){
        updates.title = title
    }
    if(price){
        price = parseFloat(price.replace(".", "").replace(",", ".").replace("R$",""))
        updates.price = price
    }
    if(priceNegotiable){
        updates.priceNegotiable = (priceNegotiable  == "true") ? true : false
    }
    if(status){
        updates.status = (status == "true") ? true : false
    }

    if(cat){
        const category = await Category.findOne({slug: cat})
        if(!category){
            res.status(400)
            res.json({error: "Categoria inválida"})
            return
        }
        updates.category = category._id
    }

    if(state){
        const stateLoc = await State.findOne({name: state})
        if(!stateLoc){
            res.status(400)
            res.json({error: "Estado inválido"})
            return
        }
        updates.state = stateLoc._id
    }

    if(description){
        updates.description = description
    }

     //Images 
     //(new Images)
     let Newimages: string[] = []
     if(req.files){
        let files = req.files as Express.Multer.File[]
        let adsItem = await Ads.findById(id)
        let itemImages = adsItem.images
        let currentImages = (5 - itemImages.length)
        if(files.length > currentImages) {
            res.status(400)
            res.json({error: "Limite de imagens exedido"})
            return
        }
        files.forEach( async (item) => {
            Newimages.push(item.filename)
            updates.images = [...adsItem.images, ...Newimages]
            await sharp(item.path)
            .resize(500)
            .toFormat("jpeg")
            .toFile(`./public/media/${item.filename}.jpg`)
            await unlink (item.path) 
        })
    }
     
    //(delete Images)
    let editImages: string[] = []
    if(delImages){
        delImages = delImages.split(",")
        let adsItem = await Ads.findById(id)
        let itemImages = adsItem.images

        let formatLink: string[] = []
        for (let i in delImages){
            formatLink.push(
                delImages[i].replace(`${process.env.BASE}/media/`, "").replace(".jpg", "")
            )
        }

        for (let i in itemImages) {
            if(!formatLink.includes(itemImages[i])){
                editImages.push(itemImages[i])
            }else{
                fs.unlink(`./public/media/${itemImages[i]}.jpg`, (err) => {
                    if (err) throw err;
                });
            }
        } 

        updates.images = [...editImages, ...Newimages]
    }

    await Ads.findByIdAndUpdate(id, {$set: updates})
    res.status(201)
    res.json({error: ""})
}

export const adsUser = async (req: Request, res: Response) => {
    let token = req.headers.authorization?.slice(7)
    let {sort = "asc", offset= 0, limit = 8, status } = req.query
    let statusBoo = status == "true"?true:false

    const user = await User.findOne({token})
    const adsTotalOn = await Ads.find({idUser: user._id, status: true})
    const adsTotalOff = await Ads.find({idUser: user._id, status: false})
    const totalOn = adsTotalOn.length
    const totalOff = adsTotalOff.length

    const adsData = await Ads.find({idUser: user._id, status: statusBoo})
    .sort({dateCreated: (sort == "desc"? -1: 1)})
    .skip(Number(offset))
    .limit(Number(limit))

    let ads = []
    for (let i in adsData){
        let image = ""
        if(adsData[i].images[0]){
            image = `${process.env.BASE}/media/${adsData[i].images[0]}.jpg`
        }else {
            image = `${process.env.BASE}/media/default-img.jpg`
        }

        ads.push({
            id: adsData[i]._id,
            title: adsData[i].title,
            price: adsData[i].price,
            priceNegotiable: adsData[i].priceNegotiable,
            status: adsData[i].status,
            image
        })
    }
    res.status(200)

    res.json({
        ads, 
        total: (statusBoo)?totalOn:totalOff, 
        totalOn, totalOff
    })
}

export const deleteAds = async (req: Request, res: Response) => {
    let {id} = req.params
    let ads = await Ads.findById(id)

    if(ads.images){
        for(let i in ads.images){
            fs.unlink(`./public/media/${ads.images[i]}.jpg`, (err) => {
                if (err) throw err;
            });
        }
    }
    await Ads.findByIdAndDelete(id)
    res.json({error: ""})
}
