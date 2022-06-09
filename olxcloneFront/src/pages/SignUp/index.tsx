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
import { PageContainer, PageTitle } from '../../components/TemplateComponents'

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
    const [opacity, setOpacity] = useState(1)
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
    const handleSubmit = async () => {
        setDisabled(true)
        setOpacity(0.5)
        setError("")

        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
        let match = regex.test(email)
        
        //Front verify erros // Before Request
        if(!name){
            setError("Preencha seu nome completo")
            setDisabled(false)
            setOpacity(1)
            return 
        }

        if(!match){
            setError("E-mail inválido")
            setDisabled(false)
            setOpacity(1)
            return 
        }

        if(!stateLoc){
            setError("Selecione um estado")
            setDisabled(false)
            setOpacity(1)
            return 
        }

        if(!password || password.length < 8){
            setError("Senha deve conter pelo menos 8 caracteres")
            setDisabled(false)
            setOpacity(1)
            return
        }

        if(password !== confirmPassword) {
           setError("Senhas não correspondentes")
           setDisabled(false)
           setOpacity(1)
           return
        }

        //Request
        const json = await Api.register(name, email, password, stateLoc)

        // Before Request
        if(json.error){
            // Api Verify Erros
            if(json.error.name){
                setError(json.error.name.msg)
                setOpacity(1)
                setDisabled(false)
                return
            }
            if(json.error.email){
                setError(json.error.email.msg)
                setOpacity(1)
                setDisabled(false)
                return
            }
            if(json.error.password){
                setError(json.error.password.msg)
                setOpacity(1)
                setDisabled(false)
                return
            }
            if(json.error.state){
                setError(json.error.state.msg)
                setOpacity(1)
                setDisabled(false)
                return
            }

            setError(json.error)
            setDisabled(false)
            setOpacity(1)

        }else{
            doLogin(json.token, false, email)
            window.location.href = '/'
        }

        setDisabled(false)
        setOpacity(1)
    }

    return(
        <PageContainer>
        <C.PageArea opacity={opacity}>
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
                    <img src="/icons/facebook.png" alt="facebook-icon" />
                    Entrar com o Facebook
                </div>
                <div className='OAuth google-login'>
                    <img src="/icons/google.png" alt="google-icon" />
                    Entrar com o Google
                </div>
                <span className='or'>ou</span>
                {error &&
                    <div className='box-error'>
                        <img src="/icons/alert.png" alt="" />
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
                            />
                        </div>
                    </label>

                    <label htmlFor="" className='area'>
                        <div className='area--title'>Estado</div>
                        <div className='area--input'>
                           <select disabled={disabled} value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
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
                            />
                        </div>
                    </label>
                </form>
                <div className='button-area'>
                    <button disabled={disabled} onClick={handleSubmit}>
                        Entrar
                    </button>
                </div>
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