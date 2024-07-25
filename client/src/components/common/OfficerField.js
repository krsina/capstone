// OfficerField.js
import React, { useState } from 'react';

const OfficerField = () => {
    const [officers, setOfficers] = useState(Array.from({ length: 5 }, () => ({ email: '', name: '', position: '' })));

    const addOfficer = () => {
        setOfficers([...officers, { email: '', name: '', position: '' }]);
    };

    const removeOfficer = (index) => {
        const newOfficers = officers.filter((_, i) => i !== index);
        setOfficers(newOfficers);
    };

    const handleOfficerChange = (index, field, value) => {
        const newOfficers = officers.map((officer, i) => {
            if (i === index) {
                return {
                    ...officer,
                    [field]: value
                };
            }
            return officer;
        });
        setOfficers(newOfficers);
    };

    return (
        <div className="flex-col grid gap-4">
            {officers.map((officer, index) => (
                <div key={index} className="grid grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Email"
                        className="border-r border-b border-gray-300 p-2 rounded"
                        value={officer.email}
                        onChange={(e) => handleOfficerChange(index, 'email', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        className="border-r border-b border-gray-300 p-2 rounded"
                        value={officer.name}
                        onChange={(e) => handleOfficerChange(index, 'name', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Position"
                        className="border-r border-b border-gray-300 p-2 rounded"
                        value={officer.position}
                        onChange={(e) => handleOfficerChange(index, 'position', e.target.value)}
                    />
                    {index >= 5 && (
                        <button
                            type="button"
                            onClick={() => removeOfficer(index)}
                            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={addOfficer}
                className="bg-secondary hover:bg-primary text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
                Add Member
            </button>
        </div>
    );
};

export default OfficerField;
