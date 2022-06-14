// Created Styled-Components
import * as C from "./style"

// Hooks React
import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"

// Api Requests
import { Api } from "../../helpers/api"

// Components folders 
import {PageContainer} from "../../components/TemplateComponents"

// Types
import { CategoryList, ItemsList, StateList, SingleItem } from "../../types/MainTypes"

//Mask price field (libs)
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

const initialItem = {
    id: "",
    title: "",
    category: "",
    price: 0,
    dateCreated: new Date(),
    priceNegotiable: false,
    description: "",
    state: "",
    others: [],
    images: [],
    views: 0,
    status: false,
    userInfo: {
        name: "",
        email: "",
        state: "",
        image: ""
    }
}

type ImagesInfo = {
    url: string,
    empty: boolean
}

export const EditP = () => {

    // Url Param
    let params = useParams()
    let id = params.id

    // Controler files fields (FormData)
    const fileField = useRef<HTMLInputElement>(null)

    // Navigate instance
    const navigate = useNavigate()
    
    // Request states (webService)
    const [stateList, setStateList] = useState([])
    const [catList, setCatList] = useState([])
    const [pdInfo, setPdInfo] = useState<SingleItem>(initialItem)

    // Form fields
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("0")
    const [priceNeg, setPriceNeg] = useState(false)
    const [cat, setCat] = useState("")
    const [statePd, setStatePd] = useState("")
    const [status, setStatus] = useState(true)
    const [currentImages, setCurrentImages] = useState<ImagesInfo[]>([])

    // Loading states controller
    const [disabled, setDisabled] = useState(false)
    const [message, setMessage] = useState("")
    const [colorMessage, setColorMessage] = useState("")
    const [displayModal, setDisplayModal] = useState("none")
    const [recharge, setRecharge] = useState(false)

    // Request States webSite
    useEffect(()=> {
        const  getStates = async () => {
             const json = await Api.getStates()
             setStateList(json)
         }
         getStates()
     }, [])
 
     // Request Categories webSite
     useEffect(()=> {
         const getCategories = async () => {
             const json = await Api.getCategories()
             setCatList(json)
         }
         getCategories()
     }, [])

    // Request Item (Ads)
    useEffect(()=> {
        const getItem = async (id: string) => {
            const json = await Api.getItem(id, false)
            setPdInfo(json.productInfo)
            return
        }
        getItem(id as string)
    }, [id, recharge])

    // Set fields w/ current infos
    useEffect(()=> {
        setTitle(pdInfo.title)
        setDescription(pdInfo.description)
        setPrice(pdInfo.price.toString())
        setPriceNeg(pdInfo.priceNegotiable)
        setCat(pdInfo.category)
        setStatePd(pdInfo.state)
        setStatus(pdInfo.status)
    }, [pdInfo])
    
    // Format images 
    useEffect(()=> {
        setRecharge(false)
        let arrayInfoImages:ImagesInfo[] = []
        if(pdInfo.images){
            for (let i=0; i<5; i++){
                if(pdInfo.images[i] && !(pdInfo.images[i].includes("default-img"))){
                    arrayInfoImages.push(
                        {url: pdInfo.images[i], empty: false}
                    )
                }else{
                    arrayInfoImages.push(
                        {url: "/images/no-pictures.png", empty: true}
                    )
                }
            }
            setCurrentImages(arrayInfoImages)
        }
    },[pdInfo])
    
    // Mask config in price field
    const priceMask = createNumberMask({
        prefix: "R$",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ",",
    })

    // Edit fields
    const sendEdits = async () => {
        setDisabled(true) // Disable buttons
        setMessage("") // Clean error
        setColorMessage("#c9242e") // Error color

        if(!title.trim()){  // Verify empty title
            setMessage("Preencha um titúlo para o anúncio")
            setDisabled(false)
            return
        }

        if(!cat){ // Verify empty category
            setMessage("Selecione uma categoria")
            setDisabled(false)
            return
        }
        
        if(!price && !priceNeg){
            setMessage("Informe o preço ou aceite negociações")
            setDisabled(false)
            return
        }

        const formData = new FormData() // Create FormData
        formData.append("state", statePd)
        formData.append("category", cat)
        formData.append("title", title)
        formData.append("priceNegotiable", priceNeg.toString())
        formData.append("description", description)
        formData.append("price", price.toString())
        
        // Send Request
        const json = await Api.editAds(formData, id as string)

        if(json.error == ""){
            navigate(`/ad/${id}`)
        }else {
            setMessage(json.error)
            }

        setDisabled(false) 
    }

    // Request Edit Images (ADD)
    const addImage = async ()=> {
        setMessage("") // Clean error
        setColorMessage("#c9242e") // Error color

        // Request
        const formData = new FormData() // Create FormData
        let fields = fileField.current as HTMLInputElement
        let files = fields.files as FileList
        if(files.length > 0){
            for(let i in files){
                formData.append("images", files[i])
            }
        }
        
        //  Send Request
        const json = await Api.editAds(formData, id as string)

         if(json.error == ""){
            setRecharge(true)
            setColorMessage("#369F64")
            setMessage("Imagens atualizadas com sucesso")
            return
         }

         if(json.error == 'Unexpected field'){
             setMessage("Limite de imagens exedido")
         }else{
             setMessage(json.error)
         }
    }
    
    //  Request Edit Images (DELETE)
    const delImage = async (index: number) => {
        setMessage("") // Clean error
        setColorMessage("#c9242e")

        // Visual config 
        
        let delImages = currentImages[index].url
        let updateImages = [...currentImages]
        updateImages[index].url = "/images/no-pictures.png"
        updateImages[index].empty = true
        setCurrentImages(updateImages)

        // Request
        const formData = new FormData() // Create FormData
        formData.append("delImages", delImages)

        // Send Request
        const json = await Api.editAds(formData, id as string)

        if(json.error == ""){
            setColorMessage("#faad14")
            setMessage("Imagem Excluida")
        }else {
            setMessage(json.error)
        }
    }

    // Set available or unavailable
    const setCondition = async (order: boolean) => {
        setMessage("") // Clean error
        setColorMessage("#c9242e") // Color error
        setStatus(order) // Status Ads

        const formData = new FormData() 
        formData.append("status", order.toString())

        // Send Request
        const json = await Api.editAds(formData, id as string)

        if(json.error == ""){
            // navigate(`/ad/${id}`)
        }else {
            setMessage(json.error)
        }
    }

    // Delete Ads
    const deleteAds = async () => {
        setMessage("") // Clean error
        await Api.deleteAds(id as string)
        navigate("/")
    }

    return(
        <PageContainer>
        
            <C.Warning display={displayModal}>
              <div className="box--warn">
                  <div className='warning'>
                      <img src="/icons/alert.png" alt="" />
                      <div className='warn'>Aviso</div>
                  </div>
                  <div className='message-box'>
                      <span>Ao excluir esse anúncio ele será apagado permanentemente</span>
                      <span>Tem certeza que deseja excluir? </span>
                      </div>
                  <div className="box--buttons">
                      <button className="confirm" onClick={()=>deleteAds()}>Excluir</button>
                      <button className="cancel" onClick={e => setDisplayModal("none")}>Cancelar</button>
                  </div>
              </div>
            </C.Warning>
           
            <C.PageArea color={colorMessage}>
                <h2>Editar Anúncio</h2>
                <hr />
                {message &&
                <>
                    <div className="message">{message}</div>
                    <div className="message-mobile">
                        <div className="box-message">
                            <div className="title-message">Aviso</div>
                            <div className="body-message">{message}</div>
                            <div className="ok-button" onClick={()=>setMessage("")}>OK</div>
                        </div>
                    </div>
                </>
                }
                <div className="ads--area">
                    <form action="">
                        <div className="images--area">
                            {currentImages.map((i: ImagesInfo , k: number)=> 
                                <C.ImgArea key={k}>
                                    <C.Item>
                                        <img src={i.url} alt="" />
                                    </C.Item>
                                    {!i.empty &&
                                        <div className='del' onClick={()=>delImage(k)}>
                                            <img src="/icons/trash.png" alt="del" />
                                        </div>
                                    }
                                </C.ImgArea>
                            )}  
                        </div>
                        <C.InputFile>
                            <label className='add'>
                                    <input 
                                        type="file"
                                        ref={fileField}
                                        disabled={disabled}
                                        multiple
                                        onChange={()=>addImage()}
                                    />
                                    <img src="/icons/plus.png" alt="add" />
                                    Adiconar Imagens
                            </label>
                            <div>Max: 5</div>
                        </C.InputFile>
                        <hr />
                        <div className="row-1">
                            <div className="input--area">
                                {status &&
                                    <div className="unavailable" onClick={()=> setCondition(false)}>
                                        <img src="/icons/error.png" alt="inds" />
                                        Marcar como Indisponível
                                    </div>
                                }
                                {!status &&
                                    <div className="available" onClick={()=> setCondition(true)}>
                                        <img src="/icons/check.png" alt="dis" />
                                        Marcar como Disponível
                                    </div>
                                }
                            </div>

                            <div className="input--area">
                                <div className="del" onClick={()=>setDisplayModal("flex")}>
                                    <img src="/icons/trash.png" alt="trash" />
                                    Excluir Anúncio
                                </div>
                            </div>
                        </div>
                       
                       <div className="row-2">
                            <div className="col">
                                <div className="input--area">
                                    <label>Titulo:</label>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={e=>setTitle(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>

                                <div className="input--area">
                                    <label htmlFor="">Descrição:</label>
                                    <textarea 
                                        value={description} 
                                        onChange={e=>setDescription(e.target.value)}
                                        disabled={disabled}>
                                    </textarea>
                                </div>
                            </div>

                            <div className="col">
                                <div className="input--area">
                                    <label htmlFor="">Preço:</label>
                                    <MaskedInput 
                                        mask={priceMask}
                                        placeholder="R$ "
                                        disabled={disabled || priceNeg}
                                        value={price}
                                        onChange={e=>setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="input--area input--checkbox--mobile">
                                    <label htmlFor="">Preço Negociável:</label>
                                    <input type="checkbox" 
                                        checked={priceNeg} 
                                        onChange={e=>setPriceNeg(!priceNeg)}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="input--area">
                                    <label htmlFor="">Categoria:</label>
                                    <select value={cat} onChange={e=>setCat(e.target.value)} disabled={disabled}>
                                        {catList.map((i: CategoryList,k)=> 
                                            <option value={i.slug} key={k}>{i.name}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="input--area">
                                    <label htmlFor="">Stado</label>
                                    <select onChange={e=>setStatePd(e.target.value)} disabled={disabled} value={statePd}>
                                        {stateList.map((i: StateList, key)=>
                                            <option key={key} value={i.name}>{i.name}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                       </div>
                    </form>
                    <hr />
                    <div className="row-3">
                           <button className="saveEdit" onClick={sendEdits} disabled={disabled}>Salvar Alterações</button>
                           <Link to="/" className="cancelEdit">Cancelar</Link>
                    </div>
                </div>
            </C.PageArea>
        </PageContainer>
    )
}