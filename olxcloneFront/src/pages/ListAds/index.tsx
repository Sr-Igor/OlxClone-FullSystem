// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// Api Requests
import { Api } from "../../helpers/api"

// Components folders 
import { PageContainer } from "../../components/TemplateComponents"
import { AdItem } from "../../components/partials/AdItem"

// Types
import { List, Category, Item } from "../../types/MainTypes"

// Timer for search Request (created out component for disable loop )
let timer: any

export const ListAds = () => {

    // Navigate instance
    const navigate = useNavigate()

    // QueryString Controller
        const useQueryString = () => {
            return new URLSearchParams( useLocation().search )
        }

        //Hook queryString
        const query = useQueryString()
        
        // Separate queryStrings
        const [q, setQ] = useState(query.get("q") != null ? query.get("q"): "" as any)
        const [cat, setCat] = useState(query.get("cat") != null ? query.get("cat"): "" as any)
        const [state, setState] = useState(query.get("state") != null ? query.get("state"): "" as any)

    // Pagination states     
    const [adsTotal, setAdsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    // Request states (webService)
    const [stateList, setStateList] = useState([])
    const [categories, setCategories] = useState([])
    const [adList, setAdList] = useState([])

    // Loading state controller
    const [loading, setLoading] = useState(true)

    // Ads List Request 
    const getAdsList = async () => {
        setLoading(true)
        let offset = (currentPage -1) * 9 // Calc current page 
        const json = await Api.getAds({
            sort: 'desc',
            limit: 9,
            q,
            cat,
            state,
            offset
        })
        setAdList(json.descryptItens) // Get items
        setAdsTotal(json.total) // Get total pages 
        setLoading(false)
    }

    // Monitoring total pages, variable with search
    useEffect(()=> {
        if(adList.length > 0){
            setPageCount( Math.ceil(adsTotal/ adList.length) )
        }else{
            setPageCount(0)
        }
    },[adsTotal])

    // Monitoring current page 
    useEffect(()=> {
        getAdsList() 
    }, [currentPage])

    // Monitoring search items 
    useEffect(()=> {
        let queryString = []
        if(q){
            queryString.push(`q=${q}`)
        }
        if(cat){
            queryString.push(`cat=${cat}`)
        }
        if(state){
            queryString.push(`state=${state}`)
        }
        navigate(`?${queryString.join("&")}`)

        // Verify typing stop to make the request
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(getAdsList, 2000)

        // Reset current Page
        setCurrentPage(1)
    }, [q, cat, state])

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

    // Calc total pages 
    let pagination = []
    for(let i=1; i <=pageCount; i++){
        pagination.push(i)
    }

    return(
    <PageContainer>
        <C.PageArea>
            <div className="leftSide">
                <form method="GET">

                    <input 
                    type="text" 
                    name="q" 
                    placeholder="O que você procura ?"
                    value={q}
                    onChange={e=>setQ(e.target.value)}
                    />

                    <div className="filterName">Estado:</div>
                    <select name="state" id="" value={state} onChange={e=>setState(e.target.value)}>
                        <option value=""></option>
                        {stateList.map((i: List, k)=> 
                            <option key={k} value={i.name}>{i.name}</option>
                        )}
                    </select>

                    <div className="filterName">Categoria:</div>
                    <ul>
                        {categories.map((i: Category, k)=> 
                            <li 
                            key={k} 
                            className={cat == i.slug?"categoryItem active": "categoryItem"}
                            onClick={()=> setCat(i.slug)}
                            >
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </li>
                        )}
                    </ul>

                </form>
            </div>
            <div className="rightSide">

                <h2>Resultados</h2>

                {loading && adList.length === 0 && 
                <div className="listWarning">Carregando...</div>
                }

                {!loading && adList.length ===0 &&
                <div className="listWarning">Nenhum resultado correspondente</div>
                }

                <div className="list">
                    {adList.map((i, k)=> 
                        <AdItem key={k} data={i} />
                    )}
                </div>

                <div className="pagination">
                    {pagination.map((i,k)=> 
                        <div 
                        key={k} 
                        onClick={()=>setCurrentPage(i)}
                        className={i === currentPage ? "pageItem active": "pageItem"}>{i}</div>
                    )}
                </div>

            </div>
        </C.PageArea>
    </PageContainer>
    )
}