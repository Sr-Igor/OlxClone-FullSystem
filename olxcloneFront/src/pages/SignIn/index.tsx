// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useState } from 'react'

// Api Requests
import { Api } from '../../helpers/api'

//Helpers (login verify)
import { doLogin } from '../../helpers/AuthHandler'

// Components folders
import { PageContainer, PageTitle, ErrorMessage } from '../../components/TemplateComponents'
import { Link } from 'react-router-dom'

export const SignIn = () => {
    
    // SignIn Fields 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberPassword, setRememberPassword] = useState(false)

    // Request Controllers
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState("")

    //Visibility Password 
    const [visiblePassword, setVisiblePassword] = useState(false)

    const handleSubmit = async (e: any) => {
        console.log("entrou")
        e.preventDefault()
        setDisabled(true)
        setError("")
        if(email && password) {
            const json = await Api.login(email, password)
            if(json.error){
                console.log(json.error)
                // setError(json.error)
            }else{
                doLogin(json.token, rememberPassword, email)
                window.location.href = '/'
            }
        }
        setDisabled(false)
    }

    return(
        <PageContainer>
            <C.PageArea>
                <div className='signin--area'>
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
                                {!visiblePassword && 
                                    <div className='vs-password'>
                                        <input 
                                            type="password" 
                                            disabled={disabled}
                                            value={password}
                                            onChange={e=>setPassword(e.target.value)}
                                            required
                                        />
                                        <img src="/public/icons/show.png" alt="show" onClick={()=> setVisiblePassword(true)}/>
                                    </div>
                                }
                                {visiblePassword && 
                                    <div className='vs-password'>
                                        <input 
                                            type="text" 
                                            disabled={disabled}
                                            value={password}
                                            onChange={e=>setPassword(e.target.value)}
                                            required
                                        />
                                        <img src="/public/icons/hide.png" alt="hide" onClick={()=> setVisiblePassword(false)}/>
                                    </div>
                                }
                            </div>
                        </label>

                        <label htmlFor="" className='area area--checkbox'>
                            <div className='area--title'>Manter Conectado</div>
                            <div className='area--input'>
                                <input 
                                type="checkbox" 
                                className='check-input' 
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={e=>setRememberPassword(!rememberPassword)}
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
                        <span>Não tem uma conta? <Link to="/signup">Cadaste-se</Link></span>
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