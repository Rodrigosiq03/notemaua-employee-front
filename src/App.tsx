import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import EsqueciSenha from './pages/EsqueciSenha'
import Retirada from './pages/Retirada'
import RedefinirSenha from './pages/RedefinirSenha'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/EsqueciSenha' element={<EsqueciSenha/>}/>
        <Route path='/Retirada' element={<Retirada/>}/>
        <Route path='/RedefinirSenha' element={<RedefinirSenha/>}/>
      </Routes>
    </Router>
  )
}

export default App
