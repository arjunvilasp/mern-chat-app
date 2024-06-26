import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import { useAuthContext } from './context/authContext.jsx'


function App() {
  
  const { authUser } = useAuthContext();
  
  return (
    <>
    <Routes>
      <Route exact path='/' element={authUser ? <Home/> : <Navigate to={'/login'}/>}/>
      <Route path='/register' element={authUser ?  <Navigate to={'/'}/> : <Register/>}/>
      <Route path='/login' element={authUser ?  <Navigate to={'/'}/> : <Login/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  )
}

export default App