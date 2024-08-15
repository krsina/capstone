import React from 'react';

const OfficerField = ({ officers, setOfficers, addOfficer, removeOfficer, handleOfficerChange, emailErrors }) => {
    return (
        <div className="flex-col flex gap-6">
            {officers.map((officer, index) => (
                // Add Unique Key to the parent div
                <div className="flex flex-col space-y-4" key={index}>
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 h-auto md:h-12">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`border-r border-b border-gray-300 rounded py-3 px-2 leading-tight focus:border-primary hover:border-primary ${emailErrors[index] ? 'border-red-500' : ''}`}
                                value={officer.email}
                                onChange={(e) => handleOfficerChange(index, 'email', e.target.value)}
                            />
                            {emailErrors[index] && <p className="text-red-500 text-xs italic mt-1">UW email address only.</p>}
                        </div>

                        <input
                            type="text"
                            placeholder="First Name"
                            className="border-r border-b border-gray-300 p-2 rounded focus:outline-none focus:border-primary hover:border-primary"
                            value={officer.first_name}
                            onChange={(e) => handleOfficerChange(index, 'first_name', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border-r border-b border-gray-300 p-2 rounded focus:outline-none focus:border-primary hover:border-primary"
                            value={officer.last_name}
                            onChange={(e) => handleOfficerChange(index, 'last_name', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Position"
                            className="border-r border-b border-gray-300 p-2 rounded focus:outline-none focus:border-primary hover:border-primary"
                            value={officer.position}
                            onChange={(e) => handleOfficerChange(index, 'position', e.target.value)}
                        />
                        {index >= 5 && (
                            <button
                                type="button"
                                onClick={() => removeOfficer(index)}
                                className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                                aria-label={`Remove officer ${index + 1}`}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    <hr className="sm:hidden block pt-2 border-secondary"></hr>
                </div>
            ))}
            <button
                type="button"
                onClick={addOfficer}
                className="bg-secondary hover:bg-primary text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
                Add Member
            </button>
        </div>
    );
};

export default OfficerField;
