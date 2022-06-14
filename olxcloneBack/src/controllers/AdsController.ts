import {Request, Response} from 'express'
import dotenv from 'dotenv'
import fs from "fs"
import * as AdsServices from "../services/AdsServices"
import * as MainServices from "../services/MainServices"


dotenv.config()

type Data = {
    title: string
    category: string
    price: any
    state: string
    priceNegotiable: string
    description: string
    delImages?: string
    status?: string
}


export const getCategories = async (req: Request, res: Response) => {
    const cats = await AdsServices.getAllCategories()

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

    let result = await AdsServices.AddAds(
       { title,
        price,
        priceNegotiable,
        description,
        category,
        state},
        req
    )

    if(result instanceof Error){
        res.status(400)
        res.json({error: result.message})
        return
    }
   
    res.json({id: result})
}

export const getList = async (req: Request, res: Response) => {
    let {sort = "asc", offset= 0, limit = 8, q, cat, state } = req.query

    let result = await AdsServices.findCustomAds(
        sort as string,
        offset as number,
        limit as number,
        q as string,
        cat as string, 
        state as string
    )
    res.json({ads: (await result).ads, total: (await result).total})
}

export const getItem = async (req: Request, res: Response) => {
    let {id, other = null} = req.query
    let result = await  AdsServices.findAd(id as string, other as string|null)
    res.json({productInfo: result})   
}

export const editAction = async (req: Request, res: Response) => {
    let { id } = req.params
    let {title, status, price, priceNegotiable, description, category, delImages, state} = req.body
   
    let result = await AdsServices.updateAds(
        id,
        {
          title,
          status,
          price,
          category,
          priceNegotiable,
          description,
          delImages,
          state  
        },
        req
    )

    if (result instanceof Error){
        res.status(400)
        res.json({error: result.message})
        return
    }

    res.status(201)
    res.json({error: ""})
}

export const adsUser = async (req: Request, res: Response) => {
    let token = req.headers.authorization?.slice(7)
    let {sort = "asc", offset= 0, limit = 8, status } = req.query
    let statusBoo = status == "true"?true:false

    const user = await MainServices.findUser(token)
    const adsTotalOn = await AdsServices.findAllAdsUser(user._id, true)
    const adsTotalOff = await AdsServices.findAllAdsUser(user._id, false)
    const totalOn = adsTotalOn.length
    const totalOff = adsTotalOff.length
   
    const adsData =  await AdsServices.findCustomAdsUser(
        user._id, 
        statusBoo,
        sort as string, 
        offset as number, 
        limit as number
    )

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
    AdsServices.deleteAds(id)
    res.json({error: ""})
}
