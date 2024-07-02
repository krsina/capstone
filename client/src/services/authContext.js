import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3001/protected', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/', { email, password }, { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            setUser(null);
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};