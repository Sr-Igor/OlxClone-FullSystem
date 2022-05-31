// Created Styled-Components
import * as C from './styled'

// Hooks React
import { Link } from 'react-router-dom'

// Helpers 
import { isLogged, doLogout } from '../../../helpers/AuthHandler'

export const Header = () => {

  const logged = isLogged()

  // Logout
  const handleLogout = () => {
    doLogout()
    window.location.href = '/'
  }

  return(
    <C.HeaderArea>
        <div className='container'>
          <div className='logo'>
            <Link to="/">
              <span className='logo-1'>O</span>
              <span className='logo-2'>L</span>
              <span className='logo-3'>X</span>
            </Link>
          </div>
          <nav>
            <ul>
              {logged && 
                <>
                <li><Link to="/myaccount">Minha Conta</Link></li>
                <li><button onClick={handleLogout}>Sair</button></li>
                <li><Link to="post-on-ad" className='button'>Anunciar</Link></li>
                </>
              }
              {!logged && 
                <>
                <li><Link to="/signin">Login</Link></li>
                <li><Link to="/signup">Cadastrar</Link></li>
                <li><Link to="/signin" className='button'>Anunciar</Link></li>
                </>
              }
            </ul>
          </nav>
        </div>
    </C.HeaderArea>
  )
}