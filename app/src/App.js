import { Routes, Route, useNavigate } from 'react-router-dom';
import * as authService from '../src/services/auth.service'

import React,{useEffect} from 'react';

import Login from './pages/auth/PageLogin'
import Register from './pages/auth/PageRegister'
import RouteDashboard from '../src/components/routes/RouteDashboard'



function App() {

  let navigate = useNavigate()
  const user = authService.getUser()

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])


    function onLogin(data, token) {
      console.log(data,token)
      authService.setUser(data)
      authService.setToken(token)

      if(data.rol === 1) {
        navigate('/dashboard/admin')
      } else if(data.rol === 2) {
        navigate('/dashboard')
      }
    }


  return (
    <>
    <Routes>
      <Route path='/login' element={<Login onLogin={onLogin}/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/dashboard/*' element={<RouteDashboard/>} />
    </Routes>
    </>
  );
}

export default App;
