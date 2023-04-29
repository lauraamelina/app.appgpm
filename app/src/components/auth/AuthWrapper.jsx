import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth.service'

function AuthWrapper({ children }) {
    const navigate = useNavigate();
    const user = authService.getUser();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } 

    }, [user, navigate]);

    return <>{children}</>;
}

export default AuthWrapper;