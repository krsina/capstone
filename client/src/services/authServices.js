import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

export const signUp = async (studentNumber, email, password, firstName, lastName) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            studentNumber,
            email,
            password,
            firstName,
            lastName
        })
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Signup failed' }
    }
}

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, { email, password });
        if (response.data.session) {
            localStorage.setItem('authToken', response.data.session.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Signin failed' };
    }
};

export const getAuthToken = () => { return localStorage.getItem('authToken') };



