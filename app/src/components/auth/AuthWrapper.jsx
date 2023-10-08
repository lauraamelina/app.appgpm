import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth.service';

function AuthWrapper({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = authService.getUser();

    useEffect(() => {
        const allowedRoutesWithoutAuth = ['/register', '/recuperation-password', '/verification', '/share/', '/share/product/'];

        if (!allowedRoutesWithoutAuth.some(route => location.pathname.startsWith(route)) && !user) {
            navigate('/login');
        }
    }, [user, location.pathname, navigate]);

    return <>{children}</>;
}

export default AuthWrapper;