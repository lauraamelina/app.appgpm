import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/PageLogin';
import Register from './pages/auth/PageRegister';
import RecuperationPassword from './pages/auth/PageRecuperationPassword';
import RouteDashboard from '../src/components/routes/RouteDashboard';
import PageVerification from './pages/auth/PageVerification';
import AuthWrapper from './components/auth/AuthWrapper';
import RouteShare from './components/routes/RouteShare';

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    console.log('usuario actualizado')
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <AuthWrapper>
      <Routes>
        <Route path='/login' element={<Login updateUser={updateUser} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/recuperation-password' element={<RecuperationPassword />} />
        <Route path='/verification' element={<PageVerification />} />
        {user && <Route path='/dashboard/*' element={<RouteDashboard />} />}
        {user && <Route path='/' element={<Navigate to='/dashboard' />} />}
        {!user && <Route path='/dashboard/*' element={<Navigate to='/login' />} />}
        <Route path='/share/*' element={<RouteShare />} />
      </Routes>
    </AuthWrapper>
  );
}

export default App;
