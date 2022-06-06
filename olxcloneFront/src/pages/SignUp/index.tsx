// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
        <C.PageArea>
            <div className='signup--area'>
                <div className='logo'>
                    <span className='logo-1'>O</span>
                    <span className='logo-2'>L</span>
                    <span className='logo-3'>X</span>
                </div>
                <div className='title--page'>
                    Acesse a sua conta
                </div>
                <div className='OAuth facebook-login'>
                    <img src="/public/icons/facebook.png" alt="facebook-icon" />
                    Entrar com o Facebook
                </div>
                <div className='OAuth google-login'>
                    <img src="/public/icons/google.png" alt="google-icon" />
                    Entrar com o Google
                </div>
                <span className='or'>ou</span>
                {error &&
                    <div className='box-error'>
                        <img src="/public/icons/alert.png" alt="alert-icon" />
                        <span className='text-messge'>{error}</span>
                    </div>
                }
                <form action="">
                    <label htmlFor="" className='area'>
                            <div className='area--title'>Nome Completo <small>Exibido em seus anúncios</small></div>
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
                        <div className='area--title'>E-mail <small>Usado para efetuar login</small></div>
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
                        <div className='area--title'>Senha <small> Mínimo 8 caracteres</small></div>
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
                            <button disabled={disabled} onClick={handleSubmit}>
                                Entrar
                            </button>
                           
                        </div>
                    </label>
                </form>
                <div className='signup--box'>
                    <span>Já tem uma conta? <Link to="/signin">Entrar</Link></span>
                </div>
                <div className='help-box'>Precisa de ajuda?</div>
            </div>
            <span className='info--area'>
                Esse é um projeto somente para composição de <span className='pointer'>Portifólio</span> e 
                <span className='pointer'> Não possui fins lucrativos </span> não deve ser
                comercializado, nem repassado por nenhuma instituição.
            </span>
        </C.PageArea>
    </PageContainer>
    )
}