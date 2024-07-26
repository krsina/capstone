import React, { useState } from 'react';

function ExpenditureForm() {
    const [expenses, setExpenses] = useState([{ typeOfExpense: '', purpose: '', quantity: '', dollarAmount: '', total: '', link: '' }]);

    const handleAddExpense = () => {
        setExpenses([...expenses, { typeOfExpense: '', purpose: '', quantity: '', dollarAmount: '', total: '', link: '' }]);
    };

    const handleDeleteExpense = (index) => {
        if (expenses.length > 1) {
            const values = [...expenses];
            values.splice(index, 1);
            setExpenses(values);
        }
    };

    const handleInputChange = (index, event) => {
        const values = [...expenses];
        values[index][event.target.name] = event.target.value;
        setExpenses(values);
    };

    return (
        <div className="flex">
            <div className="w-1/6 bg-purple-700 text-white flex flex-col p-4 space-y-4 min-h-screen">
                <div className="text-2xl font-bold mb-8">Club Dashboard</div>
                <a href="#" className="text-lg">Events</a>
                <a href="#" className="text-lg">Organizations</a>
                <a href="#" className="text-lg">Resources</a>
                <a href="#" className="mt-auto text-lg">Logout</a>
            </div>
            <div className="w-5/6 bg-gray-200 py-20 flex flex-col items-center relative">
                <div className="absolute top-0 left-0 p-6">
                    <button className="text-primary font-bold">Back</button>
                </div>
                <div className="w-4/5 bg-white py-10 px-12 rounded-lg shadow-lg">
                    <div className="flex mb-8">
                        <div className="w-1/2 bg-primary p-6 rounded-lg flex flex-col items-center justify-center text-white">
                            <h1 className="text-4xl text-center font-bold">Welcome to the Expenditure Form!</h1>
                            <p className="text-lg text-center mt-4">Fill out the form below to move forward in purchasing all the required items for your event!</p>
                        </div>
                        <div className="w-1/2 pl-6">
                            <h2 className="text-2xl font-bold bg-primary text-white rounded-lg text-center py-2">General Information</h2>
                            <div className="space-y-4 mt-4">
                                <input type="text" placeholder="Have you submitted an Allocation form that has been approved?" className="border-gray-300 p-2 rounded w-full border-b border-r" />
                                <input type="text" placeholder="Select your Club" className="border-gray-300 p-2 rounded w-full border-b border-r" />
                                <div className='flex flex-row space-x-4'>
                                    <input type="text" placeholder="Event Title" className="border-b border-r border-gray-300 p-2 rounded w-full" />
                                    <input type="date" placeholder="Event Date" className="border-b border-r border-gray-300 p-2 rounded w-full" />
                                </div>
                                <div className='flex flex-row space-x-4'>
                                    <input type="text" placeholder="Budget Name Club Name" className="border-b border-r border-gray-300 p-2 rounded w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold bg-primary text-white rounded-lg text-center py-2">Expenditure Report</h2>
                        <div className="flex justify-end space-x-4">
                            <button onClick={handleAddExpense} className="bg-black text-white px-4 py-2 rounded-lg my-2">ADD</button>
                            {expenses.length > 1 && (
                                <button onClick={() => handleDeleteExpense(expenses.length - 1)} className="bg-black text-white px-4 py-2 rounded-lg my-2">DELETE</button>
                            )}
                        </div>
                        {expenses.map((expense, index) => (
                            <div key={index} className='space-y-4 mt-4'>
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
                                        type="text"
                                        name="quantity"
                                        placeholder="Quantity"
                                        className="border-b border-r border-gray-300 p-2 rounded w-full"
                                        value={expense.quantity}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                    <input
                                        type="text"
                                        name="dollarAmount"
                                        placeholder="Dollar Amount"
                                        className="border-b border-r border-gray-300 p-2 rounded w-full"
                                        value={expense.dollarAmount}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                    <input
                                        type="text"
                                        name="total"
                                        placeholder="Total"
                                        className="border-b border-r border-gray-300 p-2 rounded w-full"
                                        value={expense.total}
                                        onChange={(event) => handleInputChange(index, event)}
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
                            </div>
                        ))}
                    </div>
                    <div className="text-4xl text-center font-encode-sans mt-8">
                        Expenditure Total:
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-black text-white px-4 py-2 rounded-lg my-2">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpenditureForm;