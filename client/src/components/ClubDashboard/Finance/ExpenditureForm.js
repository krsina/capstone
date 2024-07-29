import React, { useState, useEffect } from 'react';
import BackButton from '../../common/BackButton';

function ExpenditureForm() {
    const [expenses, setExpenses] = useState([{ typeOfExpense: '', purpose: '', quantity: '', dollarAmount: '', link: '' }]);
    const [totalAmount, setTotalAmount] = useState(0); // Used to track total amount of all expenses

    const handleAddExpense = () => {
        setExpenses([...expenses, { typeOfExpense: '', purpose: '', quantity: '', dollarAmount: '', link: '' }]);
    };

    const handleDeleteExpense = (index) => {
        if (expenses.length > 1) {
            const values = [...expenses];
            values.splice(index, 1);
            setExpenses(values);
        }
    };

    // Used to handle input changes for each expense
    const handleInputChange = (index, event) => {
        const values = [...expenses];
        values[index][event.target.name] = event.target.value;

        // Calculate total for the expense
        if (values[index].quantity && values[index].dollarAmount) {
            const quantity = parseFloat(values[index].quantity) || 0;
            const dollarAmount = parseFloat(values[index].dollarAmount) || 0;
            // Tax rate for Washington State
            const taxRate = 0.1025;
            const total = (quantity * dollarAmount) * (1 + taxRate);
            values[index].total = total.toFixed(2);
        } else {
            values[index].total = '';
        }

        setExpenses(values);
    };

    // Used to calculate the total amount of all expenses
    useEffect(() => {
        const total = expenses.reduce((acc, expense) => acc + (parseFloat(expense.total) || 0), 0);
        setTotalAmount(total);
    }, [expenses]);

    return (
        <div className="bg-gray-100 py-20 flex flex-col items-center sm:ml-80">
            <BackButton />
            {/* General Information */}
            <div className="sm:w-4/5 bg-white py-10 sm:px-12 px-4 rounded-lg shadow-lg">
                <div className="flex sm:flex-row flex-col mb-8">
                    <div className="sm:w-1/2 bg-primary p-12 rounded-lg flex flex-col items-center justify-center text-white space-y-8">
                        <h1 className="text-5xl text-center">Welcome to the <span className="font-bold">Expenditure Form!</span></h1>
                        <p className="text-3xl text-center mt-4">Fill out the form below to move forward in purchasing all the required items for your event!</p>
                    </div>
                    <div className="sm:w-1/2 sm:pl-6">
                        <h2 className="text-2xl font-bold bg-primary text-white rounded-lg text-center py-2">General Information</h2>
                        <div className="space-y-4 mt-4 flex flex-col">
                            <input type="text" placeholder="Select your Club" className="border-gray-300 p-2 rounded w-full border-b border-r" />
                            <div className='flex flex-row space-x-4'>
                                <input type="text" placeholder="Event Title" className="border-b border-r border-gray-300 p-2 rounded w-full" />
                                <input type="date" placeholder="Event Date" className="border-b border-r border-gray-300 p-2 rounded w-full" />
                            </div>
                            <textarea placeholder="Event Description (Max 150 characters)" className="border-b border-r border-gray-300 p-2 rounded w-full h-20" maxLength="150"></textarea>
                            <div className='flex flex-row space-x-4'>
                                <input type="text" placeholder="Point of Contact Name" className="border-b border-r border-gray-300 p-2 rounded w-full" />
                                <input type="email" placeholder="Point of Contact Email" className="border-b border-r border-gray-300 p-2 rounded w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Expenditure Breakdown */}
                <div className="mt-8">
                    <h2 className="text-3xl font-bold bg-primary text-white rounded-lg text-center p-4">Expenditure Breakdown</h2>
                    {expenses.map((expense, index) => (
                        <div key={index} className='space-y-4 mt-4'>
                            <h2 className="text-xl font-encode-sans">
                                Line Expense {index + 1} <span className="font-semibold">{expense.typeOfExpense && `| ${expense.typeOfExpense}`}</span>
                            </h2>
                            <div className='flex flex-row space-x-4'>
                                <input
                                    type="text"
                                    name="typeOfExpense"
                                    placeholder="Type of Expense"
                                    className="border-b border-r border-gray-300 p-2 rounded w-full"
                                    value={expense.typeOfExpense}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                                <input
                                    type="text"
                                    name="purpose"
                                    placeholder="Purpose"
                                    className="border-b border-r border-gray-300 p-2 rounded w-full"
                                    value={expense.purpose}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <div className='flex flex-row space-x-4'>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    className="border-b border-r border-gray-300 p-2 rounded w-full"
                                    step="1" // Only allow whole numbers
                                    value={expense.quantity}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                                <input
                                    type="number"
                                    name="dollarAmount"
                                    placeholder="Dollar Amount"
                                    className="border-b border-r border-gray-300 p-2 rounded w-full"
                                    value={expense.dollarAmount}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                                <input
                                    type="number"
                                    name="total"
                                    placeholder="Total"
                                    className="border-b border-r border-gray-300 p-2 rounded w-full"
                                    value={expense.total}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    name="link"
                                    placeholder="Link (if applicable)"
                                    className="border-b border-r border-gray-300 p-2 rounded w-full"
                                    value={expense.link}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <hr className="border-secondary mt-20" />
                        </div>
                    ))}
                    <div className="flex justify-end space-x-4">
                        <button onClick={handleAddExpense} className="bg-secondary hover:bg-gray-900 transition duration-300 ease-in-out text-white px-5 py-2 rounded-lg my-2">ADD Line item</button>
                        {expenses.length > 1 && (
                            <button onClick={() => handleDeleteExpense(expenses.length - 1)} className="bg-red-800 text-white px-4 py-2 rounded-lg my-2 hover:bg-red-950 transition duration-300 ease-in-out">DELETE Line Item</button>
                        )}
                    </div>
                </div>
                <div className="text-4xl text-center font-encode-sans mt-8">
                    Expenditure Total: ${totalAmount.toFixed(2)}
                </div>
                <div className="flex justify-end">
                    <button className="bg-secondary text-white px-4 py-2 rounded-lg my-2">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ExpenditureForm;
