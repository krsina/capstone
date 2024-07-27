import React from 'react';
import BackButton from '../../common/BackButton';
import { NavLink } from 'react-router-dom';

function FinancePage() {
    return (
        <div className="sm:ml-80 sm:px-0 px-4">
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
                <section className="mt-12 w-5/6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-40 items-center">
                        <NavLink
                            to="/clubdashboard/finance/allocation"
                            className="bg-primary text-white font-bold rounded-lg h-24 flex items-center justify-center text-center hover:bg-secondary transition duration-300 ease-in-out">
                            Allocation Form
                        </NavLink>
                        <NavLink
                            to="/clubdashboard/finance/expenditure"
                            className="bg-primary text-white font-bold  rounded-lg h-24 flex items-center justify-center text-center hover:bg-secondary transition duration-300 ease-in-out">
                            Expenditure Form
                        </NavLink>
                        <NavLink
                            className="bg-primary text-white font-bold rounded-lg h-24 flex items-center justify-center text-center hover:bg-secondary transition duration-300 ease-in-out">
                            Printing Request
                        </NavLink>
                    </div>
                </section>
                <section className="w-5/6 mt-12">
                    <div className="text-2xl font-bold mb-4">Request Tracking</div>
                    <div className="bg-primary text-white p-4 rounded-lg">
                        <div className="mb-4">
                            <div className="text-xl font-bold mb-2">Approved</div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="py-2">Name</th>
                                        <th className="py-2">Amount</th>
                                        <th className="py-2">Date Approved</th>
                                        <th className="py-2">Form Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2">Event #1</td>
                                        <td className="py-2">$2,453.23</td>
                                        <td className="py-2">08/23/24</td>
                                        <td className="py-2">Allocation</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="text-xl font-bold mb-2">Pending</div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="py-2">Name</th>
                                        <th className="py-2">Amount</th>
                                        <th className="py-2">Date Created</th>
                                        <th className="py-2">Form Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2">Food - Event #1</td>
                                        <td className="py-2">$1,243.23</td>
                                        <td className="py-2">08/25/24</td>
                                        <td className="py-2">Expenditure</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Decoration - Event #1</td>
                                        <td className="py-2">$534.23</td>
                                        <td className="py-2">08/25/24</td>
                                        <td className="py-2">Expenditure</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default FinancePage;
