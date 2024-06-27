import React from 'react'
import image1 from '../styling/signUpImage.svg'
import imageBG from '../styling/signUpBG.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'


export default function SignUp() {
    const [studentNumber, setStudentNumber] = useState('')
    const [uwEmail, setUWEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [studentNumberError, setStudentNumberError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleInputChange = (e) => {
        const value = e.target.value
        if (value.length <= 6) {
            setStudentNumberError(false)
            setStudentNumber(value)
        }
        if (value.length < 6) {
            setStudentNumberError(true)
        }
    }

    const handleEmail = (e) => {
        const value = e.target.value
        if (value.includes('@uw.edu')) {
            setUWEmail(value)
            setEmailError(false)
        } else {
            setEmailError(true)
            setUWEmail(value)
        }
    }

    const handlePassword = (e) => {
        const value = e.target.value
        const passwordCriteria = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!?])[A-Za-z\d@#$!?]{8,}$/
        if (passwordCriteria.test(value)) {
            setPasswordError(false)
            setPassword(value)
        } else {
            setPasswordError(true)
            setPassword(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (studentNumberError || emailError || passwordError) {
            alert("Please ensure all fields are correctly filled out.");
            return;
        }

        const payload = {
            studentNumber,
            email: uwEmail,
            password,
            firstName,
            lastName,
        };

        console.log('Payload:', payload);  // Log payload to inspect

        try {
            const response = await axios.post('http://localhost:3002/signup', payload);
            console.log('User signed up:', response.data)
            // Handle successful sign-up (e.g., redirect or display message)
        } catch (error) {
            console.error('Sign up error:', error.response?.data?.error || 'An error occurred');
        }
    }


    return (
        <div className="min h-screen flex text-secondary">
            {/* Sign In Illustration Left Side */}
            <div className="w-1/2 flex items-center justify-center flex-col text-white relative overflow-hidden">
                <div className="mx-12 z-30 ">
                    <h1 className="font-light text-xl p-4">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</h1>
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
            {/* Sign Up Right Side*/}
            <div className="w-1/2 flex flex-col justify-center px-32  bg-white ">
                <h1 className="text-6xl mb-10 ">
                    Create An Account
                </h1>
                <form className="w-full max-w-sm"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <h1 className="text-secondary font-light mb-1">Student Number</h1>
                        <input
                            className={`shadow appearance-none border rounded-lg w-full py-3 px-2 leading-tight focus:outline-primary focus:shadow-outline ${studentNumberError ? 'border-red-500' : ''}`}
                            id="studentNumber"
                            type="number"
                            placeholder="Enter 6-Digit Student Number"
                            value={studentNumber}
                            onChange={handleInputChange}
                        />
                        {studentNumberError && <p className="text-red-500 text-xs italic">Please enter a valid 6 digit student number.</p>}
                    </div>
                    <div className="mb-4">
                        <h1 className="text-secondary font-light mb-1">UW Email</h1>
                        <input
                            className={`shadow appearance-none border rounded-lg w-full py-3 px-2 leading-tight focus:outline-primary focus:shadow-outline ${emailError ? 'border-red-500' : ''}`}
                            id="uwEmail"
                            type="email"
                            placeholder="Enter UW Email"
                            value={uwEmail}
                            onChange={handleEmail}
                        />
                        {emailError && <p className="text-red-500 text-xs italic">Please enter a valid UW email address.</p>}
                    </div>
                    <div className="mb-4 flex flex-row space-x-3">
                        <div>
                            <h1 className="text-secondary font-light mb-1">First Name</h1>
                            <input
                                className="shadow appearance-none border rounded-lg w-full py-3 px-2 leading-tight focus:outline-primary focus:shadow-outline"
                                id="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <h1 className="text-secondary font-light mb-1">Last Name</h1>
                            <input
                                className="shadow appearance-none border rounded-lg w-full py-3 px-2 leading-tight focus:outline-primary focus:shadow-outline"
                                id="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-secondary font-light mb-1">Password</h1>
                        <input
                            className={`shadow appearance-none border rounded-lg w-full py-3 px-2 leading-tight focus:outline-primary focus:shadow-outline ${passwordError ? 'border-red-500' : ''}`}
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handlePassword}
                            autoComplete="new-password"
                        />
                        {passwordError && <p className="text-red-500 text-xs italic">Password must be at least 8 characters long and include at least one special character and one number.</p>}
                    </div>
                    <button
                        className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        type="submit"> Sign Up
                    </button>
                </form>
                <p className="pt-20 text-xl font-light">Already have an account? <NavLink
                    to="/signin"
                    className="text-primary font-bold hover:underline">
                    Sign In
                </NavLink></p>
            </div>



        </div>
    )
}
