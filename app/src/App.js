import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as authService from '../src/services/auth.service'
import Login from './pages/auth/PageLogin'
import Register from './pages/auth/PageRegister'
import RouteDashboard from '../src/components/routes/RouteDashboard'

function App() {
  let navigate = useNavigate()
  const user = authService.getUser();
  function onLogin(data, token) {
    authService.setUser(data)
    authService.setToken(token)

    if (data.rol === 1) {
      navigate('/dashboard/admin')
    } else if (data.rol === 2) {
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    if (user) {
      if (window.location.pathname === '/') {
        if (user.rol === 1) {
          navigate('/dashboard/admin')
        } else if (user.rol === 2) {
          navigate('/dashboard')
        }
      }
    } else {
      if (window.location.pathname === '/dashboard') {
        navigate('/login')
      }
    }
  }, [user, navigate])



  return (
    <>
      <Routes>
        <Route path='/login' element={<Login onLogin={onLogin} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard/*' element={<RouteDashboard />} />
      </Routes>
    </>
  );
}

export default App;
