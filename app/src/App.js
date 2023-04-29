import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/PageLogin'
import Register from './pages/auth/PageRegister'
import RecuperationPassword from './pages/auth/PageRecuperationPassword';
import RouteDashboard from '../src/components/routes/RouteDashboard'
import PageVerification from './pages/auth/PageVerification';
import * as AuthService from '../src/services/auth.service'
import AuthWrapper from './components/auth/AuthWrapper';

function App() {
  const user = AuthService.getUser()



  return (
    <AuthWrapper>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/recuperation-password' element={<RecuperationPassword />} />
        <Route path='/verification' element={<PageVerification />} />
        {user && <Route path='/dashboard/*' element={<RouteDashboard />} />}
        {!user && <Route path='/dashboard/*' element={<Navigate to='/login' />} />}
      </Routes>
    </AuthWrapper>
  );
}

export default App;