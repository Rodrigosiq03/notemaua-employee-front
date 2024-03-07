import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import EsqueciSenha from './pages/ForgotPassword'
import Retirada from './pages/Withdraw'
import RedefinirSenha from './pages/ChangePassword'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/ForgotPassword' element={<EsqueciSenha/>}/>
        <Route path='/Withdraw' element={<Retirada/>}/>
        <Route path='/ChangePassword' element={<RedefinirSenha/>}/> 
      </Routes>
    </Router>
  )
}

export default App
