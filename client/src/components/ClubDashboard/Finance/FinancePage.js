import React from 'react'
import BackButton from '../../common/BackButton'
import { NavLink } from 'react-router-dom'

function FinancePage() {
    return (
        <div className="sm:ml-80 sm:px-0 px-4">
            <BackButton />
            <div className="flex flex-col items-center justify-center py-32 font-encode-sans text-secondary">
                <section className="space-y-4 flex flex-col justify-center items-center">
                    <h1 className="sm:text-6xl text-4xl text-center">Welcome to the
                        <span className="font-bold"> Finnace Forms </span>
                        Page!

                    </h1>
                    <p className="text-light text-xl font-open-sans sm:w-5/6 text-center">Below are the forms for Allocating your Club Budget. Once Approved,
                        fill out the Expenditure report to move forward with purchasing your requested items</p>
                </section>
                <section>
                    <div className="grid grid-cols-3 space-x-2 ">
                        <NavLink
                            to="/clubdashboard/finance/allocation"
                            className="bg-primary text-white font-bold py-2 px-4 rounded  h-24 text-center justify-center items-center">
                            Allocation Form
                        </NavLink>
                        <NavLink
                            to="/clubdashboard/finance/expenditure"
                            className="bg-primary text-white font-bold py-2 px-4 rounded  h-24 text-center justify-center items-center">
                            Expenditure Form
                        </NavLink>

                        <NavLink
                            className="bg-primary text-white font-bold py-2 px-4 rounded  h-24 text-center justify-center items-center">
                            Printing Request
                        </NavLink>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FinancePage
