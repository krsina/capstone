import React, { useState } from 'react';
import image1 from '../styling/signInImage.svg';
import imageBG from '../styling/signInBG.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authServices';
import { useAuth } from '../../services/authContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        setError('');

        // If email or password is empty, return don't submit
        if (!email || !password) {
            setError('Must include email and password');
            return;
        }

        // Call signIn service
        const data = await signIn(email, password);

        // If sign-in is successful, set user authentication state and navigate to /events
        if (data.session) {
            // Set user authentication state
            setIsAuthenticated(true);
            setUser(data.user);
            console.log("Uses logged in: ");
            // Successful sign-in, navigate to /events
            navigate('/events');
        } else {
            // Handle sign-in error (display error message, etc.)
            console.error('Sign-in failed:', data.error || 'Unknown error');
            setError(data.error || 'Invalid login credentials');
        }
    };

    return (
        <div className="min h-screen flex">
            {/* Sign In Form Left Side */}
            <div className="w-1/2 flex flex-col justify-center px-28 bg-white">
                <h1 className="text-7xl mb-4 flex flex-col">
                    <span className="text-primary">Welcome</span>
                    <span className="text-secondary">to Club Hub</span>
                </h1>
                <p className="mb-8 font-open-sans text-2xl font-light">Sign in below!</p>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className={`shadow appearance-none leading-tight border rounded w-full p-3  focus:outline-primary ${error ? 'border-red-500' : ''}`}
                            id="email"
                            type="email"
                            placeholder="UW Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                    <div className="mb-6">
                        <input
                            className={`shadow appearance-none leading-tight border rounded w-full p-3  focus:outline-primary  ${error ? 'border-red-500' : ''}`}
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                    <div className="flex items-center">
                        <button
                            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="pt-20 text-xl font-light">
                    Don't have an Account?{' '}
                    <NavLink className="text-primary hover:underline font-bold" to="/signup">
                        Sign up
                    </NavLink>
                </p>
            </div>

            {/* Sign In Illustration Right Side */}
            <div className="w-1/2 flex items-center justify-center flex-col text-white relative overflow-hidden">
                <div className="z-30 w-3/5">
                    <h1 className="font-light text-3xl ml-6 mr-32 my-4">
                        Welcome to the UWB Connect App! Sign in now to start connecting
                    </h1>
                </div>
                <img
                    src={imageBG}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    z-index="0"
                />
                <img
                    src={image1}
                    alt="Sign In Illustration"
                    className="w-3/5 h-3/5 relative"
                />
            </div>
        </div>
    );
}
