import React from 'react'
import image1 from '../styling/signUpImage.svg'
import imageBG from '../styling/signUpBG.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { signUp } from '../../services/authServices'


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
        const { id, value } = e.target;

        if (id === 'studentNumber') {
            if (value.length <= 6) setStudentNumber(value);

            setStudentNumberError(value.length > 6);

        } else if (id === 'uwEmail') {
            setUWEmail(value);
            setEmailError(!value.includes('@uw.edu'));
        } else if (id === 'password') {
            setPassword(value);
            const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!?])[A-Za-z\d@#$!?]{8,}$/;
            setPasswordError(!passwordCriteria.test(value));
        } else if (id === 'firstName') {
            setFirstName(value);
        } else if (id === 'lastName') {
            setLastName(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // checking if form is valid
        if (validateForm()) {
            try {
                const data = await signUp(studentNumber, uwEmail, password, firstName, lastName);
                console.log('Signup successful:', data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    // Checking for valid form input
    const validateForm = () => {
        return (
            !studentNumberError &&
            !emailError &&
            !passwordError &&
            studentNumber.length <= 6 &&
            uwEmail.includes('@uw.edu') &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!?])[A-Za-z\d@#$!?]{8,}$/.test(password) &&
            firstName.trim() !== '' &&
            lastName.trim() !== ''
        );
    };

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
                            onChange={handleInputChange}
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
                                autoComplete='username'
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
                            onChange={handleInputChange}
                            autoComplete="new-password"
                        />
                        {passwordError && <p className="text-red-500 text-xs italic">Password must be at least 8 characters long and includes 1 capital letter, number, and special character.</p>}
                    </div>
                    <button
                        className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={!validateForm()}
                    > Sign Up

                    </button>
                </form>
                <p className="pt-20 text-xl font-light">Already have an account? <NavLink
                    to="/"
                    className="text-primary font-bold hover:underline">
                    Sign In
                </NavLink></p>
            </div>



        </div>
    )
}
