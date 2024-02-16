import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import EsqueciSenha from './pages/EsqueciSenha'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/EsqueciSenha' element={<EsqueciSenha/>}/>
      </Routes>
    </Router>
  )
}

export default App
