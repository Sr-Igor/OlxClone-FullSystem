import { StateProvider } from './contexts/context'
import { MainRoutes } from './routes/mainRoutes'
import { Template } from './components/TemplateComponents'
import { Header } from './components/partials/Header'
import { Footer } from './components/partials/Footer'
import './App.css'

function App() {

  return (
    <StateProvider>
      <Template>
        <Header />
        <MainRoutes />
        <Footer />
      </Template>
    </StateProvider>
  )
}

export default App
