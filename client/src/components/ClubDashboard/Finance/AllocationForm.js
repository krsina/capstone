import React, { useState, useEffect } from 'react';
import BackButton from '../../common/BackButton';

function AllocationForm() {
    const [items, setItems] = useState([{ itemName: '', detail: '', dollarAmount: '', adminComments: '' }]);
    const [totalAmount, setTotalAmount] = useState(0);


    const handleAddItem = () => {
        setItems([...items, { itemName: '', detail: '', dollarAmount: '', adminComments: '' }]);
    };

    const handleDeleteItem = (index) => {
        if (items.length > 1) {
            const values = [...items];
            values.splice(index, 1);
            setItems(values);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const values = [...items];
        values[index][name] = name === 'dollarAmount' ? parseFloat(value) || '' : value;
        setItems(values);
    };

    // Used to calculate the total amount of all items
    useEffect(() => {
        const total = items.reduce((acc, item) => acc + (parseFloat(item.dollarAmount) || 0), 0);
        setTotalAmount(total);
    }, [items]);

    return (
        <div>
            <div className="bg-gray-100 pt-20 flex flex-col items-center sm:ml-80 ">
                <BackButton />
                {/* General Information */}
                <div className="sm:w-4/5 bg-white py-10  sm:px-12 px-4 rounded-lg shadow-lg">
                    <div className="flex sm:flex-row flex-col mb-8">
                        <div className="sm:w-1/2 bg-primary p-12 rounded-lg flex flex-col items-center justify-center text-white space-y-8">
                            <h1 className="text-5xl text-center">Welcome to the <span className="font-bold"> Allocation Form! </span></h1>
                            <p className="text-3xl text-center mt-4">Fill out your basic information, and break it down by line item. After approval move on to your expenditure report!</p>
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
                    {/* Allocation Breakdown */}
                    <div className="mt-8">
                        <h2 className="text-3xl font-bold bg-primary text-white rounded-lg text-center p-4">Allocation Breakdown</h2>
                        {items.map((item, index) => (
                            <div key={index} className="space-y-8  mt-4">
                                <h2 className="text-xl font-encode-sans">
                                    Line Item {index + 1} <span className="font-semibold"> {item.itemName && `| ${item.itemName}`}</span>
                                </h2>
                                <div className="flex flex-row space-x-4 h-14">
                                    <input
                                        type="text"
                                        name="itemName"
                                        placeholder="Item Name (ex. Decorations, Food, etc.)"
                                        className="border-b border-r border-gray-300 p-2 rounded w-full "
                                        value={item.itemName}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                    <input
                                        type="text"
                                        name="detail"
                                        placeholder="Detail (Max 300 Characters)"
                                        className="border-b border-r border-gray-300 p-2 rounded w-full"
                                        maxLength="300"
                                        value={item.detail}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="flex flex-row space-x-4 h-14">
                                    <input
                                        type="number"
                                        name="dollarAmount"
                                        placeholder="Dollar Amount"
                                        className="border-b border-r border-gray-300 p-2 rounded w-full"
                                        value={item.dollarAmount}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                    <input
                                        type="text"
                                        name="adminComments"
                                        placeholder="Admin Comments"
                                        className="border-b border-r border-gray-300 p-2 rounded w-full"
                                        value={item.adminComments}
                                        disabled
                                    />
                                </div>
                                <hr className="border-secondary mt-20" />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-4">
                            <button onClick={handleAddItem} className="bg-secondary hover:bg-gray-900 transition duration-300 ease-in-out text-white px-5 py-2 rounded-lg my-2">ADD Line item</button>
                            {items.length > 1 && (
                                <button onClick={() => handleDeleteItem(items.length - 1)} className="bg-red-800 text-white px-4 py-2 rounded-lg my-2 hover:bg-red-950 transition duration-300 ease-in-out">DELETE Line Item</button>
                            )}
                        </div>
                    </div>
                    <div className="text-4xl text-center font-encode-sans mt-8">
                        Total Request: ${totalAmount.toFixed(2)}
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-secondary text-white px-4 py-2 rounded-lg my-2">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllocationForm;