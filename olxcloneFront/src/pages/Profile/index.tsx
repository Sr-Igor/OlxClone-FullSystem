import { useEffect, useState } from 'react'
import { PageContainer } from '../../components/TemplateComponents'
import { Api } from '../../helpers/api'
import { StateList } from '../../types/MainTypes'
import * as C from './styled'
import { doLogout } from "../../helpers/AuthHandler"
import { useRef } from 'react'
import { useInfoReducer } from '../../contexts/context'

export const Profile = () => {

    const fileField: any = useRef()

    const {state, dispatch} = useInfoReducer()

    const [userInfo, setUserInfo] = useState<any>([])
    const [states, setStates] = useState([])

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [stateUser, setStateUser] = useState("")
    const [image, setImage] = useState("")

    const [InitialEmail, setInitialEmail] = useState("")
    const [Initialname, setInitialName] = useState("")

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [visiblePassword, setVisiblePassword] = useState(false)
    const [disable, setDisable] = useState(false)
    const [message, setMessage] = useState("")
    const [messagePassword, setMessagePassword] = useState("")
    const [messageColor, setMessageColor] = useState("#000")
    const [displayModal, setDisplayModal] = useState(["none", "0"])

    const [currentSection, setCurrentSection] = useState(0)

    useEffect(()=> {
        const getUserInfo = async () => {
            const json = await Api.getUserInfo()  
            setUserInfo(json)
        }
        getUserInfo()
    }, [])

    useEffect(()=> {
        const getStates = async () => {
            const json = await Api.getStates()
            setStates(json)
        }
        getStates()
    }, [])

    useEffect(()=> {
        setEmail(userInfo.email)
        setName(userInfo.name)
        setInitialEmail(userInfo.email)
        setInitialName(userInfo.name)
        if(userInfo.image){
            dispatch({type: "SET_IMAGE", payload: userInfo.image})
        }
    }, [userInfo])

    const editUser = async (e: any) => {
        setDisplayModal(["none", "0"])
        e.preventDefault()
        setMessage("")

        if(name == ""){
            setMessage("Preencha o nome")
            setMessageColor("#c9242e") 
            return
        }
        if(email == ""){
            setMessage("Preencha o email")
            setMessageColor("#c9242e") 
            return
        }
        if(stateUser == ""){
            setMessage("Selecione um Estado")
            setMessageColor("#c9242e") 
            return
        }
        const formData = new FormData() // Create FormData
        formData.append("state", stateUser)
        
        if(name !== Initialname){
            formData.append("name", name)
        }
        if(email !== InitialEmail){
            formData.append("email", email)
        }
        
        // Send Request
        const json = await Api.editUser(formData)

        if(!json.error){
            setMessage("Alterações salvas com sucesso")
            setMessageColor("#408140")
            setTimeout(()=> {
                doLogout()
                window.location.href = '/'
            }, 2000)
        }else{
            setMessage(json.error)
            setMessageColor("#c9242e") 
        }
    }

    const editPassword = async (e: any) => {
        setDisplayModal(["none", "0"])
        e.preventDefault()
        setMessagePassword("")

        if(password == ""){
            setMessagePassword("Preencha a senha atual")
            setMessageColor("#c9242e")
            return
        }

        if(newPassword == ""){
            setMessagePassword("Preencha a nova senha")
            setMessageColor("#c9242e")
            return
        }

        const formData = new FormData() // Create FormData
        formData.append("password", password)
        formData.append("newPassword", newPassword)

        // Send Request
        const json = await Api.editUser(formData)

        if(!json.error){
            setMessagePassword("Senha alterada com sucesso")
            setMessageColor("#408140")
            setTimeout(()=> {
                doLogout()
                window.location.href = '/'
            }, 2000)
        }else{
            setMessagePassword(json.error)
            setMessageColor("#c9242e") 
        }
    }

    const prevImage = () => {
        const formData = new FormData()
        // Verify Images, format and append in formData
        if(fileField.current.files.length > 0){
                formData.append("images", fileField.current.files[0])
        }else {
            return
        }

        let imageUrl = URL.createObjectURL(fileField.current.files[0])
        setImage(imageUrl)
    }

    const addImage = async () => {
        setMessagePassword("")
        setMessageColor("")
        
        const formData = new FormData()
        // Verify Images, format and append in formData
        if(fileField.current.files.length > 0){
                formData.append("image", fileField.current.files[0])
        }else {
            return
        }

         // Send Request
         const json = await Api.editUser(formData)
        console.log(json)
         if(!json.error && json.image){
            dispatch({type: "SET_IMAGE", payload: json.image})
            setMessagePassword("Imagem atualizada")
            setMessageColor("#408140")
         }else{
            setMessagePassword(json.error)
            setMessageColor("#c9242e") 
         }
    }

    const deleteImage = async () => {
        dispatch({type: "SET_IMAGE", payload: "/public/images/default-profile.jpg"})
        setMessagePassword("")
        setMessageColor("")
        console.log(image)
        if(image || userInfo.image){
            const formData = new FormData()
            formData.append("image", "")
           
             // Send Request
             const json = await Api.editUser(formData)
    
             if(!json.error){
                 setMessagePassword("Imagem Removida")
                 setMessageColor("#faad14")
                 setImage("")
             }else{
                 setMessagePassword(json.error)
                 setMessageColor("#c9242e") 
             }
        }
      
    }

    return(
        <PageContainer>
    
                <C.Warning display={displayModal[0]}>
                    <div className="box--warn">
                        <div className='warning'>
                            <img src="/public/icons/alert.png" alt="" />
                            <div className='warn'>Aviso</div>
                        </div>
                        <div className='message-box'>
                            <span>Para sua segurança, você será desconectado após as alterações.</span>
                            <span>Certifique-se de possuir as informações de acesso.</span>
                            <span>Tem certeza que deseja salvar as alterações? </span>
                            </div>
                        <div className="box--buttons">
                            <button className="confirm" onClick={(e)=>((displayModal[1] == "1")? editUser(e): editPassword(e))}>Salvar alterações</button>
                            <button className="cancel" onClick={e => setDisplayModal(["none", '0'])}>Cancelar</button>
                        </div>
                    </div>
                </C.Warning>

            <C.PageArea color={messageColor}>
                <div className='title--area'>
                    <h2>Meu Cadastro</h2>
                    <div className='options'>
                        <div className={(currentSection == 0)?"active":"desactive"} onClick={()=> setCurrentSection(0)}>Informações de Cadastro</div>
                        <div className={(currentSection == 1)?"active":"desactive"} onClick={()=> setCurrentSection(1)}>Foto de perfil</div>
                        <div className={(currentSection == 2)?"active":"desactive"} onClick={()=> setCurrentSection(2)}>Alteraçao de senha</div>
                    </div>
                    
                </div>
                <hr />
                {currentSection === 0  && 
                    <div className='box--info'>
                    <span className='title-box'>Dados da conta</span>
                    {message && 
                        <div className='message'>{message}</div>
                    }
                    <form action="" method='PUT'>
                        <label>
                            <span>Nome Completo</span>
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} disabled={disable}/>
                        </label>
                        <label>
                            <span>Email</span>
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={disable}/>
                        </label>
                        <label>
                            <span>Estado</span>
                            <select onChange={(e)=>setStateUser(e.target.value)} disabled={disable}>
                                    <option value=""></option>
                                {states.map((i: StateList, k)=> 
                                    <option value={i._id} key={k}>{i.name}</option>
                                )}
                            </select>
                        </label>
                    </form>
                    <button className='send' disabled={disable} onClick={()=> setDisplayModal(["flex", "1"])}>Salvar Alterações</button>
                </div>
                }
            </C.PageArea>

            {currentSection === 1 && 
                <C.PageArea color={messageColor}>
                    <div className='box--info'>
                        <span className='title-box'>Alterar Foto de Perfil</span>
                        {messagePassword && 
                            <div className='message'>{messagePassword}</div>
                        }
                        <form action="" method='PUT'>
                          <div className='currentImage'>
                              <img src={(image)? image :state.userImage} alt="default-image" />
                          </div>
                        <div className='input--area'>
                            <label htmlFor="file">
                                <img src="/public/icons/plus.png" alt="adicionar" />
                                <input type="file" name='file' id='file' ref={fileField} onChange={prevImage}/>
                            </label>
                        </div>

                        <div className='input--area'>
                            <label  className='delete-label'>
                                <div className='del' onClick={deleteImage}>
                                    <img src="/public/icons/trash.png" alt="delete" />
                                    <span>Excluir Imagem</span>
                                </div>
                            </label>
                        </div>
                        </form>
                        <button className='send' disabled={disable} onClick={()=> addImage()}>Salvar Alterações</button>
                    </div>
                </C.PageArea>
            }

            {currentSection === 2 && 
                <C.PageArea color={messageColor}>
                    <div className='box--info'>
                        <span className='title-box'>Aterar Senha</span>
                        {messagePassword && 
                            <div className='message'>{messagePassword}</div>
                        }
                        <form action="" method='PUT'>
                            <label>
                                <span>Senha Atual</span>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={disable}/>
                            </label>
                            <label>
                                <span>Nova Senha</span>
                                <div className='vs-password'>
                                    {!visiblePassword && 
                                    <>
                                        <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} disabled={disable}/>
                                        <img src="/public/icons/show.png" alt="show"  onClick={()=> setVisiblePassword(true)}/>
                                    </>
                                    }
                                    {visiblePassword &&
                                    <>
                                        <input type="text" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} disabled={disable}/>
                                        <img src="/public/icons/hide.png" alt="hide" onClick={()=> setVisiblePassword(false)}/>
                                    </>
                                    }
                                </div>
                            </label>
                        </form>
                        <button className='send' disabled={disable} onClick={()=> setDisplayModal(["flex", "2"])}>Salvar Alterações</button>
                    </div>
                </C.PageArea>
            }
          
        </PageContainer>
    )
}