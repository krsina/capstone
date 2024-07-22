import React from 'react'
import { NavLink } from 'react-router-dom'

function Resources() {
    return (
        <div className="sm:ml-80 py-20 md:px-28  flex flex-col">
            <div className="flex flex-col gap-2 text-secondary">
                <h1 className="text-4xl font-encode-sans  font-bold">Resources</h1>
                <p className="font-open-sans text-xl">Below are Resources that will help you get engaged in campus. These include reserving spaces for your club, creating a club, and a few other organization pages to help you get more engaged within campus.</p>
            </div>

            {/* Import Resources will be put here*/}
            <div className="flex flex-col gap-8 mt-8 text-secondary">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-encode-sans font-bold text-primary">Forms</h1>
                    <p className="font-open-sans text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere.
                        Ut porttitor pharetra ipsum, imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, </p>
                    <NavLink
                        className="text-2xl font-encode-sans font-bold text-tertiary"
                        to="/resources/clubregistration"
                    >Club Registration</NavLink>
                    <p className="font-open-sans text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere.
                        Ut porttitor pharetra ipsum, imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, </p>
                    <NavLink className="text-2xl font-encode-sans font-bold text-tertiary"
                        to="/resources/clubrenewal"
                    >Club Renewal</NavLink>
                    <p className="font-open-sans text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere.
                        Ut porttitor pharetra ipsum, imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-encode-sans font-bold text-primary">Room Reservation</h1>
                    <p className="font-open-sans text-lg">Reserve a space for your club to host an event or meeting.</p>
                    <h1 className="text-2xl font-encode-sans font-bold text-tertiary">Room Reservation</h1>
                    <p className="font-open-sans text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere.
                        Ut porttitor pharetra ipsum, imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, </p>
                    <h1 className="text-2xl font-encode-sans font-bold text-tertiary">Arc Reservation</h1>
                    <p className="font-open-sans text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere.
                        Ut porttitor pharetra ipsum, imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, </p>
                    <h1 className="text-2xl font-encode-sans font-bold text-tertiary">Out of Campus Reservation</h1>
                    <p className="font-open-sans text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere.
                        Ut porttitor pharetra ipsum, imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-encode-sans font-bold text-primary">Lorem Ipsum</h1>
                    <p className="font-open-sans text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere.
                        Ut porttitor pharetra ipsum, imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, </p>
                    <h1 className="text-2xl font-encode-sans font-bold text-tertiary">Lorem Ipsum</h1>
                    <p className="font-open-sans text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere.
                        Ut porttitor pharetra ipsum, imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, </p>
                </div>

            </div>

        </div>
    )
}

export default Resources