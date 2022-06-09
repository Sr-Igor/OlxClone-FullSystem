// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// Hooks Custom 
import { useInfoReducer } from '../../contexts/context'

// Api Requests
import { Api } from "../../helpers/api"

// Components folders 
import { PageContainer } from "../../components/TemplateComponents"
import { AdItem } from "../../components/partials/AdItem"

// Types
import { StateList, CategoryList, ItemsList } from "../../types/MainTypes"

// Timer for search Request (created out component for disable loop )
let timer: number

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
    const [q, setQ] = useState(query.get("q")==null?"":query.get("q") as string)
    const [cat, setCat] = useState(query.get("cat") == null ?"":query.get("cat") as string)
    const [stateUser, setState] = useState(query.get("state") == null ?"":query.get("state") as string)
        
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
    const [opacity, setOpacity] = useState(1)

    // Ads List Request 
    const getAdsList = async () => {
        setLoading(true)
        let offset = (currentPage -1) * 9 // Calc current page 
        const json = await Api.getAds({
            sort: 'desc',
            limit: 9,
            q,
            cat,
            state: stateUser,
            offset
        })
        setAdList(json.ads) // Get items
        setAdsTotal(json.total) // Get total pages 
        setLoading(false)
        setOpacity(1)
    }

    // Monitoring total pages, variable with search
    useEffect(()=> {
        setPageCount((adList.length > 0)?Math.ceil(adsTotal/adList.length):0)
        setCurrentPage(1)
    },[adsTotal])

    // Monitoring current page 
    useEffect(()=> {
        getAdsList() 
    }, [currentPage])

    // Monitoring search items 
    useEffect(()=> {
        setOpacity(0.5)
        clearTimeout(timer)
        let queryString = []
            if(q){
                queryString.push(`q=${q}`)
            }
            if(cat){
                queryString.push(`cat=${cat}`)
            }
            if(stateUser){
                queryString.push(`state=${stateUser}`)
            }
            navigate(`?${queryString.join("&")}`, { replace: true })
        
       timer = setTimeout(()=> {
            getAdsList()
        },2000)
    }, [q, cat, stateUser, currentPage])

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
                    <select name="state" id="" value={stateUser} onChange={e=>setState(e.target.value)}>
                        <option value="">Selecione um Estado</option>
                        {stateList.map((i: StateList, k)=> 
                            <option key={k} value={i.name}>{i.name}</option>
                        )}
                    </select>

                    <div className="filterName">Categoria:</div>
                    <ul>
                    <li  className={"categoryItem"} onClick={()=> setCat("")}>
                        <img src="/icons/category.png" alt="" />
                        <span>Todas as Categorias</span>
                    </li>
                        {categories.map((i: CategoryList, k)=> 
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
                <div className="listWarning" style={{opacity}}>Nenhum resultado correspondente</div>
                }

                <div className="list" style={{opacity}}>
                    {adList.map((i, k)=> 
                        <AdItem key={k} data={i}/>
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