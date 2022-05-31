// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Link} from "react-router-dom"

// Api Requests
import { Api } from '../../helpers/api'

// Components folders 
import { PageContainer } from '../../components/TemplateComponents'
import { AdItem } from '../../components/partials/AdItem'

// Types
import { Item } from '../../types/MainTypes'


export const ProductPage = () => {

    // Url Params 
    const { id } = useParams()

    // Loading Controller
    const [loading, setLoading] = useState(true)

    //Product Content
    const [pdInfo, setPdInfo] = useState<any>({})

    // Slide Controllers
    const [slideWidth, setSlideWidth] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)

    // Request to get the product
    useEffect(()=> {
        const getItem = async (id: any) => {
            const json = await Api.getItem(id, true)
            setPdInfo(json.productInfo)
            setLoading(false)
        }
        getItem(id)
    }, [])

    // Width slide controller
    useEffect(()=> {
        if(pdInfo.images){
            let qtImages = pdInfo.images.length
            setSlideWidth(320 * qtImages)
        }
    }, [pdInfo])

    // Format Date 
    const formatDate = (date: Date) => {
        let cDate = new Date(date)
        let months  = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
        let day = cDate.getDate()
        let month = cDate.getMonth() 
        let year = cDate.getFullYear()
        return `${day} de ${months[month]} de ${year} `
    }

    // Left button controller
    const handleSlidePrev = () => {
        let maxMargin = slideWidth - 320
        let margin = currentImage -320
        if((-margin) > maxMargin) {
            margin = 0
            setCurrentImage(margin)
        }else{
            setCurrentImage(margin)
        }
    }
    // Right button controller
    const handleSlideNext = () => {
        let maxMargin = slideWidth - 320
        let margin = currentImage + 320
        if(margin > 0){
            margin = -640
            setCurrentImage(margin)
        }else{
            setCurrentImage(margin)
        }
    }


    return(
        <PageContainer>

            <C.BreadChumb>
                Você está aqui: 
                <Link to="/">Home</Link>/
                <Link to={`/ads?state=${pdInfo.stateProduct}`}>{pdInfo.stateProduct}</Link>/
                <Link to={`/ads?state=${pdInfo.stateProduct}&cat=${pdInfo.category}`}>{pdInfo.category}</Link>/
                <Link to="">{pdInfo.title}</Link>
            </C.BreadChumb>

            <C.PageArea width={slideWidth} currentImage={currentImage}>
                <div className='leftSide'>
                    <div className='box'>
                        <div className='productImage'>
                            <div className='arrow left' onClick={handleSlidePrev}>{"<"}</div>
                            {loading && <C.Fake height={300}/>}
                            {pdInfo.images && 
                                <div className='slide--Area'>
                                    {pdInfo.images.map((img: string, k: number)=>
                                        <div key={k} className='slide--Item'>
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </div>
                            } 
                            <div className='arrow right' onClick={handleSlideNext}>{">"}</div>
                        </div>

                        <div className='pdInfo'>
                            <div className='pdName'>
                                {loading && <C.Fake height={20}/>}
                                {pdInfo.title && 
                                <>
                                    <h2>{pdInfo.title}</h2>                              
                                    <small>Criado em {formatDate(pdInfo.dateCreated)}</small> 
                                </>
                                }
                            </div>
                            <div className='pdDescription'>
                                {loading && <C.Fake height={100}/>}
                                {pdInfo.description}
                                <hr />
                                {pdInfo.title && 
                                    <small>Visualizações: {pdInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='rightSide'>
                    <div className='box box--padding'>
                        {loading && <C.Fake height={20}/>}
                        {pdInfo.priceNegociable && 
                            "Preço Negociável"
                        }
                        {!pdInfo.priceNegociable && pdInfo.price && 
                            <div className='price'>Preço: <span>R$ {`${pdInfo.price}`}</span></div>
                        }
                    </div>
                    {loading && <C.Fake height={50}/>}
                    {pdInfo. userInfo && 
                      <>
                        <a href={`mailto:${pdInfo.userInfo.email}`} target='_blank' className='contactSelletLink'>Fale com o vendedor</a>
                        <div className='createdBy box box--padding'>
                            <strong>{pdInfo.userInfo.name}</strong>
                            <small> E-mail: {pdInfo.userInfo.email}</small>
                            <small>Estado: {pdInfo.userInfo.stateUser}</small>
                        </div>
                      </>
                    }
                </div>
            </C.PageArea>
            <C.OthersArea>
                {pdInfo.others && 
                    <>
                        <h2>Outros Produtos do Vendedor</h2>
                        <div className='list'>
                            {pdInfo. others.map((item: Item, k: number)=>
                                <AdItem key={k} data={item} />
                            )}
                        </div>
                    </>
                }
            </C.OthersArea>
        </PageContainer>
    )
}