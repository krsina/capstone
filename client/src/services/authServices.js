import axios from 'axios';

const API_URL = 'http://localhost:3001';

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
        const response = await axios.post(`${API_URL}/`, { email, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Signin failed' };
    }
};




