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
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Signin failed' };
    }
};

// Returns the users info from users table

export const fetchUserDetails = async () => {
    try {
        const storedUser = sessionStorage.getItem('user');
        if (!storedUser) {
            throw new Error('User not found in local storage');
        }

        const user = JSON.parse(storedUser);
        const userId = user.id;

        const response = await axios.get(`${API_URL}/user`, {
            params: { userId }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to fetch user details:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};

export const getAuthToken = () => { return localStorage.getItem('authToken') };




