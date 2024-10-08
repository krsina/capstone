import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is already logged in
        const token = localStorage.getItem('authToken');
        const storedUser = sessionStorage.getItem('user');

        // Checks if the token and user are stored in the local storage
        if (token && storedUser) {
            // If the token and user are stored, set the user and isAuthenticated to true
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
            console.log('User is logged in');
        } else {
            console.log('No user is logged in');
            setIsAuthenticated(false);
        }

    }, []);

    const logout = () => {
        localStorage.removeItem('authToken'); // delete the token
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userDetails')
        sessionStorage.removeItem('userClubs')
        setUser(null); // Set the user to null
        setIsAuthenticated(false);
        console.log('User logged out');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);