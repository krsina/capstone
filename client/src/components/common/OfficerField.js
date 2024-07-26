import React, { useState } from 'react';

const OfficerField = () => {
    const [officers, setOfficers] = useState(Array.from({ length: 5 }, () => ({ email: '', name: '', position: '' })));
    const [emailErrors, setEmailErrors] = useState(Array.from({ length: 5 }, () => false));


    const addOfficer = () => {
        setOfficers([...officers, { email: '', name: '', position: '' }]);
        setEmailErrors([...emailErrors, false]);
    };

    const removeOfficer = (index) => {
        setOfficers(officers.filter((_, i) => i !== index));
        setEmailErrors(emailErrors.filter((_, i) => i !== index));
    };

    const handleOfficerChange = (index, field, value) => {
        const newOfficers = officers.map((officer, i) => {
            if (i === index) {
                return {
                    ...officer,
                    [field]: value,
                };
            }
            return officer;
        });

        // Validates the email as UW email
        if (field === 'email') {
            const newEmailErrors = emailErrors.map((error, i) => {
                if (i === index) {
                    return !value.includes('@uw.edu');
                }
                return error;
            });
            setEmailErrors(newEmailErrors);
        }

        setOfficers(newOfficers);
    };

    return (
        <div className="flex-col grid gap-6">
            {officers.map((officer, index) => (
                <div key={index} className="grid grid-cols-4 gap-12 h-12">
                    <div className="h-12">
                        <input
                            type="email"
                            placeholder="Email"
                            className={`border-r border-b border-gray-300 rounded py-3 px-2 leading-tight focus:border-primary hover:border-primary  ${emailErrors[index] ? 'border-red-500' : ''}`}
                            value={officer.email}
                            onChange={(e) => handleOfficerChange(index, 'email', e.target.value)}
                        />
                        {emailErrors[index] && <p className="text-red-500 text-xs italic">Please enter a valid UW email address.</p>}
                    </div>
                    <input
                        type="text"
                        placeholder="Name"
                        className="border-r border-b border-gray-300 p-2 rounded focus:outline-none focus:border-primary hover:border-primary"
                        value={officer.name}
                        onChange={(e) => handleOfficerChange(index, 'name', e.target.value)}
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
