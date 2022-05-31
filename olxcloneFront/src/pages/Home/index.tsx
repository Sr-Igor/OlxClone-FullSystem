// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Api Requests
import { Api } from "../../helpers/api"

// Components folders 
import { PageContainer } from "../../components/TemplateComponents"
import { AdItem } from "../../components/partials/AdItem"

// Types
import { List, Category, Item } from "../../types/MainTypes"


export const Home = () => {

    // Request states (webService)
    const [stateList, setStateList] = useState([])
    const [categories, setCategories] = useState([])
    const [adList, setAdList] = useState([])

    // Request States webSite
    useEffect(()=> {
        const getStates = async () => {
            const sList = await Api.getStates()
            setStateList(sList)
        }
        getStates()
    }, [])

    // Request Categories webSite
    useEffect(()=> {
        const getCategories = async () => {
            const catList = await Api.getCategories()
            setCategories(catList)
        }
        getCategories()
    },[])

     // Ads List Request 
    useEffect(()=> {
        const getRecentAds = async () => {
            const json = await Api.getAds({
                sort: 'desc',
                limit: 8
            })
            setAdList(json.descryptItens)
        }
        getRecentAds()
    }, [])

    return(
        <>
            <C.SearchArea>
                <PageContainer>

                    <div className="searchBox">
                        <form action="/ads" method="GET">
                            <input type="text" name="q" placeholder="O que procura?"/>
                            <select name="state" id="state">
                                <option></option>
                                {stateList.map((item: List, index)=> 
                                    <option key={index} value={item.name}>{item.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>

                    <div className="categoryList">
                        {categories.map((item: Category, index) =>
                            <Link key={index} to={`/ads?cat=${item.slug}`} className="categoryItem">
                                <img src={item.img} alt="" />
                                <span>{item.name}</span>
                            </Link>
                        )}
                    </div>

                </PageContainer>
            </C.SearchArea>
            <PageContainer>
                <C.PageArea>

                <h2>Anuncios Recentes</h2>

                <div className="list">
                    {adList.map((item: Item, index)=> 
                        <AdItem key={index} data={item}/>
                    )}
                </div>

                <Link to='/ads' className="seeAllLink">Ver Todos</Link>

                <hr />

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id deserunt iusto nulla libero fugit obcaecati nobis facere, corporis neque error magnam cupiditate omnis quos assumenda temporibus ipsum repellat. Ut, sapiente?
               
                </C.PageArea>
            </PageContainer>
        </>
    )
}