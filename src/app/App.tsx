import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import Login from './pages/Login'
import Retirada from './pages/Withdraw'
import MicrosoftLogin from './pages/MicrosoftLogin'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Login/>}/> */}
        <Route path='/' element={<MicrosoftLogin/>}/>
        <Route path='/Withdraw' element={<Retirada/>}/>
      </Routes>
    </Router>
  )
}

export default App
