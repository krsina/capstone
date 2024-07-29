import React from 'react';
import BackButton from '../../common/BackButton';
import { NavLink } from 'react-router-dom';

function FinancePage() {
    return (
        <div className="sm:ml-80 sm:px-0 px-4 font-inter">
            <BackButton />
            <div className="flex flex-col items-center justify-center pt-32 font-encode-sans text-secondary">
                <section className="space-y-4 flex flex-col justify-center items-center w-full">
                    <h1 className="sm:text-6xl text-4xl text-center">
                        Welcome to the
                        <span className="font-bold"> Finance Forms </span>
                        Page!
                    </h1>
                    <p className="text-light text-xl font-open-sans sm:w-5/6 text-center">
                        Below are the forms for Allocating your Club Budget. Once Approved,
                        fill out the Expenditure report to move forward with purchasing your requested items
                    </p>
                </section>
                <section className="mt-12 sm:w-5/6 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-12 gap-6 items-center">
                        <NavLink
                            to="/clubdashboard/finance/allocation"
                            className="bg-primary text-white font-bold rounded-2xl py-5 px-8 hover:bg-secondary transition duration-300 ease-in-out shadow-lg flex items-center justify-center">
                            Allocation Form
                        </NavLink>
                        <NavLink
                            to="/clubdashboard/finance/expenditure"
                            className="bg-primary text-white font-bold rounded-2xl py-5 px-8 hover:bg-secondary transition duration-300 ease-in-out shadow-lg flex items-center justify-center">
                            Expenditure Form
                        </NavLink>
                        <NavLink
                            to="/clubdashboard/finance/printing"
                            className="bg-primary text-white font-bold rounded-2xl py-5 px-8 hover:bg-secondary transition duration-300 ease-in-out shadow-lg flex items-center justify-center">
                            Printing Request
                        </NavLink>
                    </div>
                </section>
                <section className="sm:w-5/6 w-full mt-12 space-y-8">
                    <div className="text-2xl font-bold mb-4">Request Tracking</div>
                    <div className="bg-primary text-white p-8 rounded-lg shadow-lg space-y-6">
                        <div>
                            <div className="text-2xl font-bold mb-2">Approved</div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b w-1/3">Name</th>
                                        <th className="py-2 px-4 border-b">Amount</th>
                                        <th className="py-2 px-4 border-b">Date Approved</th>
                                        <th className="py-2 px-4 border-b">Form Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 ">Event #1 Band</td>
                                        <td className="py-2 px-4 ">$2,453.23</td>
                                        <td className="py-2 px-4 ">08/23/24</td>
                                        <td className="py-2 px-4 ">Allocation</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="text-2xl font-bold mb-2">Pending</div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b w-1/3">Name</th>
                                        <th className="py-2 px-4 border-b">Amount</th>
                                        <th className="py-2 px-4 border-b">Date Created</th>
                                        <th className="py-2 px-4 border-b">Form Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td className="py-2 px-4 ">Food - Event #1</td>
                                        <td className="py-2 px-4 ">$1,243.23</td>
                                        <td className="py-2 px-4 ">08/25/24</td>
                                        <td className="py-2 px-4 ">Expenditure</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 ">Decoration - Event #1</td>
                                        <td className="py-2 px-4 ">$534.23</td>
                                        <td className="py-2 px-4 ">08/25/24</td>
                                        <td className="py-2 px-4 ">Expenditure</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    );
}

export default FinancePage;
