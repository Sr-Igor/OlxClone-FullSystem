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
    const [onAds, setOnAds] = useState([])
    const [offAds, setOffAds] = useState([])

    // Verify empty option (Ads-On/Ads-Off)
    const [exiOn, setExiOn] = useState(false)
    const [exiOff, setExiOff] = useState(false)

    // Get Ads w/ idUser
    useEffect(()=> {
        const getUserAds = async () => {
            const json = await Api.getUserAds()
            let ads = json.ads

            // Separete Ads for status
            const adsOn: any = []
            const adsOff: any = []
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
        getUserAds()
    }, [])

    return (
        <PageContainer>
            <C.PageArea>
                <h2>Meus Anúncios</h2>
                <div className="box-filter">
                    <span onClick={()=>setHandleAds(true)} className={handleAds == true ? "active":""}>Ativos ( {onAds.length} )</span>
                    <span onClick={()=>setHandleAds(false)} className={handleAds == false ? "active":""}>Inativos ( {offAds.length} )</span>
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
                                <img src="../public/images/empty-folder.png" alt="" />
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
                                <img src="../public/images/empty-folder.png" alt="" />
                                <div>Você não possui anúncios inativos publicados no momento</div>
                            </div>
                        }
                    </> 
                    }
                </div>
            </C.PageArea>
        </PageContainer>
    )
}