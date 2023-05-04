import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth.service';

const allowedRoutes = ['/register', '/recuperation-password', '/verification'];

function AuthWrapper({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = authService.getUser();

    useEffect(() => {
        if (!user && !allowedRoutes.includes(location.pathname)) {
            navigate('/login');
        }
    }, [user, location.pathname, navigate]);

    return <>{children}</>;
}

export default AuthWrapper;