import React, { useState } from 'react';

function FieldCounter({ placeholder, type = 'text', maxChar = 300 }) {
    const [value, setValue] = useState('');
    const charCount = value.length;

    const handleChange = (e) => {
        // If the number of characters is less than or equal to the maximum number of characters, set the value
        if (e.target.value.length < maxChar) {
            // Set the value
            setValue(e.target.value)
        }
    }

    return (
        <div className="mb-4">
            {type === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="w-full h-24 border border-gray-300 p-2"
                />
            )
                : (
                    <input
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                )}
            <div className="text-right text-sm text-gray-500 mt-1">
                {charCount}/{maxChar} Characters
            </div>
        </div>
    );
}

export default FieldCounter;
