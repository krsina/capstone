import React, { useState } from 'react';
import image1 from '../styling/signInImage.svg';
import imageBG from '../styling/signInBG.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authServices';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await signIn(email, password);
        if (data.session) {
            // Successful sign-in, navigate to /events
            navigate('/events');
        } else {
            // Handle sign-in error (display error message, etc.)
            console.error('Sign-in failed:', data.error || 'Unknown error');
        }
    };

    return (
        <div className="min h-screen flex">
            {/* Sign In Form Left Side */}
            <div className="w-1/2 flex flex-col justify-center px-28 bg-white">
                <h1 className="text-6xl mb-4">
                    <span className="text-primary">Welcome</span> to UWB Student Connect
                </h1>
                <p className="mb-8">Lorem Ipsum Lorem Ipsum</p>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="UW Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
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
                {/* Testing purpose button to get into application */}
                <NavLink to="/events">
                    <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5">
                        Go to Application
                    </button>
                </NavLink>
            </div>

            {/* Sign In Illustration Right Side */}
            <div className="w-1/2 flex items-center justify-center flex-col text-white relative overflow-hidden">
                <div className="mx-12 z-30">
                    <h1 className="font-light text-xl p-4">
                        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
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
