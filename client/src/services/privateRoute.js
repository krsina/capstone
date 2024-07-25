import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (isAuthenticated === undefined) {
        return <div> Loading...</div>
    }
    
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" state={{ from: location }} />
}

export default PrivateRoute
