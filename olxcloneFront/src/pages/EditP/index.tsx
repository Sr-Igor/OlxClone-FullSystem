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
import { CategoryList, ItemsList, StateList } from "../../types/MainTypes"

//Mask price field (libs)
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

// Controller Delete Images (created out component)
let delImages: any = []

export const EditP = () => {

    // Url Param
    let params = useParams()
    let {id} = params

    // Navigate instance
    const navigate = useNavigate()
    
    // Request states (webService)
    const [stateList, setStateList] = useState([])
    const [catList, setCatList] = useState([])
    const [pdInfo, setPdInfo] = useState<any>([])

    // Form fields
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [priceNeg, setPriceNeg] = useState(false)
    const [cat, setCat] = useState("")
    const [state, setState] = useState("")
    const [status, setStatus] = useState(true)
    const [currentImages, setCurrentImages] = useState<any>([])

    // Loading states controller
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState("")
    const [warning, setWarning] = useState(true)
    const [displayModal, setDisplayModal] = useState("none")
    const [loading, setLoading] = useState(true)
    const [recharge, setRecharge] = useState(false)

    // Controler files fields (FormData)
    const fileField: any = useRef()

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
        const getItem = async (id: any) => {
            const json = await Api.getItem(id, false)
            setPdInfo(json.productInfo)
            setLoading(false)
            return
        }
        getItem(id)
    }, [id, recharge])

    // Set fields w/ current infos
    useEffect(()=> {
        setTitle(pdInfo.title)
        setDescription(pdInfo.description)
        setPrice(pdInfo.price)
        setPriceNeg((pdInfo.priceNegotiable == "true") ? true : false)
        setCat(pdInfo.category)
        setState(pdInfo.state)
        setStatus(pdInfo.status)
    }, [pdInfo])
    
    // Format images 
    useEffect(()=> {
        setRecharge(false)
        let arrayInfoImages: any = []
        if(pdInfo.images){
            for (let i=0; i<5; i++){
                if(pdInfo.images[i] && !(pdInfo.images[i].includes("default-img"))){
                    arrayInfoImages.push(
                        {url: pdInfo.images[i], empty: false}
                    )
                }else{
                    arrayInfoImages.push(
                        {url: "/public/images/no-pictures.png", empty: true}
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
    const sendEdits = async (e: any) => {
        e.preventDefault()
        setDisabled(true) // Disable buttons
        setError("") // Clean error

        let errors = []

        if(!title.trim()){  // Verify empty title
            errors.push("Sem Titúlo")
        }

        if(!cat){ // Verify empty category
            errors.push("Sem Categoria")
        }
        
        if(!price && !priceNeg){
            errors.push("Sem preço ou negocição")
        }

        if(errors.length === 0){
            const formData = new FormData() // Create FormData
            formData.append("state", state)
            formData.append("cat", cat)
            formData.append("title", title)
            formData.append("priceNegotiable", priceNeg.toString())
            formData.append("description", description)
            formData.append("price", price)
            
            // Send Request
            const json = await Api.editAds(formData, id)

            if(json.error == ""){
                navigate(`/ad/${id}`)
            }else {
                setError(json.error)
                }
        }else{
            setError(errors.join("\n"))
        }
        setDisabled(false) 
    }

    // Request Edit Images (ADD)
    const addImage = async ()=> {
        setError("") // Clean error
        // Request
        const formData = new FormData() // Create FormData

        if(fileField.current.files.length > 0){
            for(let i in fileField.current.files){
                formData.append("images", fileField.current.files[i])
            }
        }
        
        //  Send Request
        const json = await Api.editAds(formData, id)

         if(json.error == ""){
            setRecharge(true)
         }else {
             setError(json.error)
        }
    }
    
    //  Request Edit Images (DELETE)
    const delImage = async (index: number) => {
        setError("") // Clean error
        // Visual config 
        delImages.push(currentImages[index].url)
        let updateImages = [...currentImages]
        updateImages[index].url = "/public/images/no-pictures.png"
        updateImages[index].empty = true
        setCurrentImages(updateImages)

        // Request
        const formData = new FormData() // Create FormData
        formData.append("delImages", delImages)

        // Send Request
        const json = await Api.editAds(formData, id)

        if(json.error == ""){
            // navigate(`/ad/${id}`)
        }else {
            setError(json.error)
        }

        delImages = []
     }

    // Set available or unavailable
    const setCondition = async (order: boolean) => {
        setError("") // Clean error
        setStatus(order)
        const formData = new FormData() 
        formData.append("status", order.toString())

        // Send Request
        const json = await Api.editAds(formData, id)

        if(json.error == ""){
            // navigate(`/ad/${id}`)
        }else {
            setError(json.error)
        }
    }

    // Delete Ads
    const deleteAds = async () => {
        setError("") // Clean error
        await Api.deleteAds(id)
        navigate("/")
    }

    return(
        <PageContainer>
            {/* {warning &&  */}
              <C.Warning display={displayModal}>
              <div className="box--warn">
                  <div className='warning'>
                      <img src="/public/icons/alert.png" alt="" />
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
            {/* } */}
            <C.PageArea>
                <h2>Editar Anúncio</h2>
                <hr />
                {error &&
                    <div className="errorMessage">{error}</div>
                }
                <div className="ads--area">
                    <form action="">
                            <C.InputFile>
                                <label className='add'>
                                        <input 
                                            type="file"
                                            ref={fileField}
                                            disabled={disabled}
                                            multiple
                                            onChange={()=>addImage()}
                                        />
                                        <img src="/public/icons/plus.png" alt="add" />
                                        Adiconar Imagens
                                </label>
                                <div>Max: 5</div>
                            </C.InputFile>
                        <div className="images--area">
                            {currentImages.map((i: any, k: number)=> 
                                <C.ImgArea key={k}>
                                    <C.Item>
                                        <img src={i.url} alt="" />
                                    </C.Item>
                                    {!i.empty &&
                                        <div className='del' onClick={()=>delImage(k)}>
                                            <img src="/public/icons/trash.png" alt="del" />
                                        </div>
                                    }
                                </C.ImgArea>
                            )}  
                        </div>
                        <hr />
                        <div className="row-1">
                            <div className="input--area">
                                {status &&
                                    <div className="unavailable" onClick={()=> setCondition(false)}>
                                        <img src="/public/icons/error.png" alt="inds" />
                                        Marcar como Indisponível
                                    </div>
                                }
                                {!status &&
                                    <div className="available" onClick={()=> setCondition(true)}>
                                        <img src="/public/icons/check.png" alt="dis" />
                                        Marcar como Disponível
                                    </div>
                                }
                            </div>

                            <div className="input--area">
                                <div className="del" onClick={()=>setDisplayModal("flex")}>
                                    <img src="/public/icons/trash.png" alt="trash" />
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

                                <div className="input--area">
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
                                    <select value={state} onChange={e=>setState(e.target.value)} disabled={disabled}>
                                        {stateList && stateList.map((i: StateList, key)=>
                                            <option key={key} value={i._id}>{i.name}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                       </div>

                       <div className="row-3">
                           <button className="saveEdit" onClick={sendEdits} disabled={disabled}>Salvar Alterações</button>
                           <Link to="/" className="cancelEdit">Cancelar</Link>
                       </div>
                    </form>
                </div>
            </C.PageArea>
        </PageContainer>
    )
}