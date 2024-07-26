import React, { useState } from 'react';

function AllocationForm() {
    const [items, setItems] = useState([{ itemName: '', detail: '', dollarAmount: '', adminComments: '' }]);

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
        const values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values);
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
                            <h1 className="text-4xl text-center font-bold">Welcome to the Allocation Form!</h1>
                            <p className="text-lg text-center mt-4">Fill out your basic information, and break it down by line item. After approval move on to your expenditure report!</p>
                        </div>
                        <div className="w-1/2 pl-6">
                            <h2 className="text-2xl font-bold bg-primary text-white rounded-lg text-center py-2">General Information</h2>
                            <div className="space-y-4 mt-4">
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
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold bg-primary text-white rounded-lg text-center py-2">Allocation Breakdown</h2>
                        <div className="flex justify-end space-x-4">
                            <button onClick={handleAddItem} className="bg-black text-white px-4 py-2 rounded-lg my-2">ADD</button>
                            {items.length > 1 && (
                                <button onClick={() => handleDeleteItem(items.length - 1)} className="bg-black text-white px-4 py-2 rounded-lg my-2">DELETE</button>
                            )}
                        </div>
                        {items.map((item, index) => (
                            <div key={index} className="space-y-4 mt-4">
                                <div className="flex flex-row space-x-4">
                                    <input
                                        type="text"
                                        name="itemName"
                                        placeholder="Item Name (ex. Decorations, Food, etc.)"
                                        className="border-b border-r border-gray-300 p-2 rounded w-full"
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
                                <div className="flex flex-row space-x-4">
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
                            </div>
                        ))}
                    </div>
                    <div className="text-4xl text-center font-encode-sans mt-8">
                        Total Request:
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-black text-white px-4 py-2 rounded-lg my-2">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllocationForm;