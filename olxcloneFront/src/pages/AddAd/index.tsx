// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Api Requests
import { Api } from '../../helpers/api'

//Components folders
import { PageContainer, PageTitle } from '../../components/TemplateComponents'

//Mask price field (libs)
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

//Types
import { CategoryList, StateList } from '../../types/MainTypes'

export const AddAd = () => {

    // Controler send field (FormData)
    const fileField: any = useRef()

    // Navigate instance
    const navigate = useNavigate()

    // Request states (webService)
    const [categories, setCategories] = useState([])
    const [statesLoc, setStatesLoc] = useState([])

    // Form items
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [statePd, setStatePd] = useState("")
    const [price, setPrice] = useState("")
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [desc, setDesc] = useState("")

    // Request Controllers
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState("")

    //Prev Images 
    const [pImages, setPImages] = useState([])

    const formData = new FormData() // Create FormData

    // Request Categories webSite
    useEffect(()=> {
        const getCategories = async () => {
            const cats = await Api.getCategories()
            setCategories(cats)
        }
        getCategories()
    }, [])

    // Request States webSite
    useEffect(()=> {
        const getStates = async () => {
            const states = await Api.getStates()
            setStatesLoc(states)
        }
        getStates()
    }, [])

    // Summit Action
    const handleSubmit = async (e: any) => {
        e.preventDefault() // Disable send
        setDisabled(true) // Disable buttons
        setError("") // Clean error

        
        if(!title.trim()){  // Verify empty title
           setError("Preencha um titúlo para o anúncio")
           setDisabled(false)
           return
        }

        if(!category){ // Verify empty category
            setError("Selecione uma Categoria")
            setDisabled(false)
            return
        }

        if(!statePd){ // Verify empty state
            setError("Selecione um Estado")
            setDisabled(false)
            return
        }
        
        if(!price && !priceNegotiable){
            setError("Preencha o preço ou aceite negociações")
            setDisabled(false)
            return
        }

        // If not found errors
        formData.append("state", statePd)
        formData.append("category", category)
        formData.append("title", title)
        formData.append("priceNegotiable", priceNegotiable.toString())
        formData.append("description", desc)
        formData.append("price", price)
        
        // Verify Images, format and append in formData
        if(fileField.current.files.length > 0 && pImages.length !== 0){
            for(let i in fileField.current.files){
                formData.append("images", fileField.current.files[i])
            }
        }

        // Send Request
        const json = await Api.addAd(formData)

        // Verify errors 
        if(!json.error) {
            navigate(`/ad/${json.id}`) // Redirect to product page
            return
        }else {
            setError(json.error)
        }
      
        setDisabled(false) 
    }

    const prevImages = () => {
        
         // Verify Images, format and append in formData
         console.log(fileField.current.value)
         if(fileField.current.files.length > 0){
            let blobImages: any = []
            for(let i in fileField.current.files){
                if(typeof(fileField.current.files[i]) == "object"){
                    let imageUrl = URL.createObjectURL(fileField.current.files[i])
                    blobImages.push(imageUrl)
                }
            }
            setPImages(blobImages)
        }
    }

    const cleanInputFile = () => {
        formData.delete("images")
        fileField.current.value = ""
        setPImages([])
    }

    // Mask config in price field
    const priceMask = createNumberMask({
        prefix: "R$",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ",",
    })

    return(
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <C.PageArea>

                {error && 
                    <div className='box-error'>{error}</div>
                }

                <form action="" onSubmit={handleSubmit}>
                    <div className='col-1'>
                        <label htmlFor="" className='area'>
                            <div className='area--title'>Titulo</div>
                            <div className='area--input'>
                                <input 
                                type="text" 
                                disabled={disabled}
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                />
                            </div>
                        </label>

                        <label htmlFor="" className='area'>
                            <div className='area--title'>Categoria</div>
                            <div className='area--input'>
                            <select 
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                >
                                <option value=""></option>
                                {categories && categories.map((i: CategoryList, key)=>
                                    <option key={key} value={i._id}>{i.name}</option>
                                )}
                            </select>
                            </div>
                        </label>

                        <label htmlFor="" className='area'>
                            <div className='area--title'>Estado</div>
                            <div className='area--input'>
                            <select 
                                disabled={disabled}
                                onChange={e=>setStatePd(e.target.value)}
                                >
                                <option value=""></option>
                                {statesLoc && statesLoc.map((i: StateList, key)=>
                                    <option key={key} value={i._id}>{i.name}</option>
                                )}
                            </select>
                            </div>
                        </label>

                        <label htmlFor="" className='area'>
                            <div className='area--title'>Preço</div>
                            <div className='area--input'>
                                <MaskedInput 
                                    mask={priceMask}
                                    placeholder="R$ "
                                    disabled={disabled || priceNegotiable}
                                    value={price}
                                    onChange={e=>setPrice(e.target.value)}
                                />
                            </div>
                        </label>

                        <label htmlFor="" className='area'>
                            <div className='area--title'>Preço Negociável</div>
                            <div className='area--input'>
                                <input 
                                className='check-input'
                                type="checkbox" 
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e=>setPriceNegotiable(!priceNegotiable)}
                                />
                            </div>
                        </label>

                        <label htmlFor="" className='area'>
                            <div className='area--title'>Descrição</div>
                            <div className='area--input'>
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                            ></textarea>
                            </div>
                        </label>

                        <label htmlFor="" className='area'>
                            <div className='area--title'></div>
                            <div className='area--input'>
                                <button disabled={disabled}>Adicionar Anúncio</button>
                            </div>
                        </label>
                    </div>
                    
                    <div className='col-2'>
                        <label htmlFor="file" className='area'>
                            <div className='area--title'>Adicionar Imagens</div>
                            <div className='area--input'>
                                <input 
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                id="file"
                                multiple
                                onChange={prevImages}
                                />
                            </div>
                        </label>

                        <div className='box-images'>
                            {pImages.length > 0 &&
                            <>
                             <div className='images'>
                                {pImages.map((i,k)=>
                                    <div className='image' key={k}>
                                        <img src={i} alt="" />
                                    </div>     
                                )}
                            </div>
                            <div className='button'>
                                <button onClick={cleanInputFile}>Limpar Seleção</button>
                            </div>
                            </>   
                            }
                            {pImages.length <= 0 &&
                            <>
                                <img src="/images/no-pictures.png" alt="" />
                                <img src="/images/no-pictures.png" alt="" />
                                <img src="/images/no-pictures.png" alt="" />
                                <img src="/images/no-pictures.png" alt="" />
                                <img src="/images/no-pictures.png" alt="" />
                            </>
                            }
                           
                        </div>
                    </div>                    
                </form>
            </C.PageArea>
        </PageContainer>
    )
}