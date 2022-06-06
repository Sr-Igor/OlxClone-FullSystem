// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Api Requests
import { Api } from '../../helpers/api'

//Components folders
import { PageContainer, PageTitle, ErrorMessage } from '../../components/TemplateComponents'

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

        let errors = []

        if(!title.trim()){  // Verify empty title
            errors.push("Sem Titúlo")
        }

        if(!category){ // Verify empty category
            errors.push("Sem Categoria")
        }
        console.log(price)
        if(!price && !priceNegotiable){
            errors.push("Sem preço ou negociação")
        }

        // If not found errors
        if(errors.length === 0){
            const formData = new FormData() // Create FormData
            formData.append("state", statePd)
            formData.append("category", category)
            formData.append("title", title)
            formData.append("priceNegotiable", priceNegotiable.toString())
            formData.append("description", desc)
            formData.append("price", price)
            
            // Verify Images, format and append in formData
            if(fileField.current.files.length > 0){
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
        }else{
            setError(errors.join("\n"))
        }

        setDisabled(false) 
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
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form action="" onSubmit={handleSubmit}>

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
                        <div className='area--title'>Imagens(max: 5)</div>
                        <div className='area--input'>
                            <input 
                            type="file"
                            disabled={disabled}
                            ref={fileField}
                            multiple
                            />
                        </div>
                    </label>

                    <label htmlFor="" className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>
                    
                </form>
            </C.PageArea>
        </PageContainer>
    )
}