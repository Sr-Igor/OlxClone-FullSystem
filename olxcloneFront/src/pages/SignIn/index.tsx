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

export const SignIn = () => {
    
    // SignIn Fields 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberPassword, setRememberPassword] = useState(false)

    // Request Controllers
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setDisabled(true)
        setError("")
        if(email && password) {
            const json = await Api.login(email, password)
            if(json.error){
                setError(json.error)
            }else{
                doLogin(json.token, rememberPassword, email)
                window.location.href = '/'
            }
        }
        setDisabled(false)
    }

    return(
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <C.PageArea>
                {error && 
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form action="" onSubmit={handleSubmit}>

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
                        <div className='area--title'>Lembrar senha</div>
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
                            <button disabled={disabled}>Login</button>
                        </div>
                    </label>
                </form>
            </C.PageArea>
        </PageContainer>
    )
}