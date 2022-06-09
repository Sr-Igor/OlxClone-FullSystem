// Created Styled-Components
import * as C from "./styled"

// Hooks React
import { useEffect, useState } from "react"

// Api Requests
import { Api } from "../../helpers/api"

// Components folders 
import { AdItem } from "../../components/partials/AdItem"
import { PageContainer } from "../../components/TemplateComponents"

// Types
import { ItemsList, SingleItem } from "../../types/MainTypes"

export const SellerPage = () => {
    
    // Set current open section
    const [handleAds, setHandleAds] = useState(true)

    // Ads On and Off
    const [onAds, setOnAds] = useState<ItemsList[]>([])
    const [offAds, setOffAds] = useState<ItemsList[]>([])

    // Verify empty option (Ads-On/Ads-Off)
    const [exiOn, setExiOn] = useState(false)
    const [exiOff, setExiOff] = useState(false)

    // Verify Total on/off
    const [totalOn, setTotalOn] = useState(0)
    const [totalOff, setTotalOff] = useState(0)

    // Pagination states  
    const [adList ,setAdList] = useState([])   
    const [adsTotal, setAdsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState<number[]>([])

    const getUserAds = async (status : boolean) => {
        let offset = (currentPage -1) * 10 // Calc current page 
        let options = {
            sort: "desc",
            limit: 10,
            offset,
            status
        }
        const json = await Api.getUserAds(options)
        let ads = json.ads
        setAdsTotal(json.total)
        setTotalOn(json.totalOn)
        setTotalOff(json.totalOff)
        setAdList(json.ads)

        // Separete Ads for status
        const adsOn = []
        const adsOff = []
        for (let i in ads){
            if(ads[i].status === true){
                adsOn.push(ads[i])
                setOnAds(adsOn)
                setExiOn(true)
            }else {
                adsOff.push(ads[i])
                setOffAds(adsOff)
                setExiOff(true)
            }
        }
    }

    // Get Ads w/ idUser
    useEffect(()=> {
        getUserAds(true)
    }, [])

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
        getUserAds(handleAds) 
    }, [currentPage, handleAds])

    // Count total pages
    useEffect(()=> {
        let pags = []
        for(let i=1; i <=pageCount; i++){
            pags.push(i)
        }
        setPagination(pags)
    }, [pageCount])

    return (
        <PageContainer>
            <C.PageArea>
                <h2>Meus Anúncios</h2>
                <div className="box-filter">
                    <span onClick={()=>setHandleAds(true)} className={handleAds == true ? "active":""}>Ativos ( {totalOn} )</span>
                    <span onClick={()=>setHandleAds(false)} className={handleAds == false ? "active":""}>Inativos ( {totalOff} )</span>
                </div>
                <div className="container">
                    {handleAds && onAds &&
                    <>
                        <div className="list">
                            {onAds.map((i: ItemsList, k: number)=>
                                <AdItem key={k} data={i}/>    
                            )}
                        </div>
                        {!exiOn &&
                            <div className="emptyMessage">
                                <img src="/images/empty-folder.png" alt="" />
                                <div>Você não possui anúncios ativos publicados no momento</div>
                            </div>
                        }
                    </>
                    }
                    {!handleAds && offAds &&
                    <>
                        <div className="list">
                            {offAds.map((i: ItemsList, k: number)=>
                                <AdItem key={k} data={i}/>    
                            )}
                        </div>
                        {!exiOff &&
                            <div className="emptyMessage">
                                <img src="/images/empty-folder.png" alt="" />
                                <div>Você não possui anúncios inativos publicados no momento</div>
                            </div>
                        }
                    </> 
                    }
                </div>

                <div className="pagination">
                    {pagination.map((i,k)=> 
                        <div 
                            key={k} 
                            onClick={()=>setCurrentPage(i)}
                            className={i === currentPage ? "pageItem active": "pageItem"}>{i}
                        </div>
                    )}
                </div>
            </C.PageArea>
        </PageContainer>
    )
}