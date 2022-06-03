// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState } from 'react'

// Api Requests
import { Api } from '../../helpers/api'

//Helpers (login verify)
import { doLogin } from '../../helpers/AuthHandler'

// Components folders
import { PageContainer, PageTitle, ErrorMessage } from '../../components/TemplateComponents'

// Types
import { StateList } from '../../types/MainTypes'

export const SignUp = () => {
    
    // Form fields
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [stateLoc, setStateLoc] = useState("")

    // Request Controllers
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState("")

    // Request State
    const [stateList, setStateList] = useState([])

    // Request States webSite
    useEffect(()=> {
        const getStates = async () => {
            const list = await Api.getStates()
            setStateList(list)
        }
        getStates()
    }, [])

    // Send Action
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setDisabled(true)
        setError("")

        if(password !== confirmPassword) {
           setError("Senhas não correspondentes")
           setDisabled(false)
           return
        }
        const json = await Api.register(name, email, password, stateLoc)
        if(json.error){
            setError(json.error)
        }else{
            doLogin(json.token, false, email)
            window.location.href = '/'
        }

        setDisabled(false)
    }

    return(
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <C.PageArea>
                {error && 
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className='area'>
                        <div className='area--title'>Nome Completo</div>
                        <div className='area--input'>
                            <input 
                            type="text" 
                            disabled={disabled}
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label htmlFor="" className='area'>
                        <div className='area--title'>Estado</div>
                        <div className='area--input'>
                           <select required value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
                                <option value=""></option>
                                {stateList.map((item: StateList, index)=>
                                    <option value={item._id} key={index}>{item.name}</option>
                                )}
                           </select>
                        </div>
                    </label>
                    <label htmlFor="" className='area'>
                        <div className='area--title'>E-mail</div>
                        <div className='area--input'>
                            <input 
                            type="email" 
                            disabled={disabled}
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label htmlFor="" className='area'>
                        <div className='area--title'>Senha</div>
                        <div className='area--input'>
                            <input 
                            type="password" 
                            disabled={disabled}
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label htmlFor="" className='area'>
                        <div className='area--title'>Confirmar Senha</div>
                        <div className='area--input'>
                            <input 
                            type="password" 
                            disabled={disabled}
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label htmlFor="" className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disabled}>Cadastrar</button>
                        </div>
                    </label>
                </form>
            </C.PageArea>
        </PageContainer>
    )
}