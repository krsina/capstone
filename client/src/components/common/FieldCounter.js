import React, { useState } from 'react';

function FieldCounter({ placeholder, type = 'text', maxWords = 300 }) {
    const [value, setValue] = useState('');
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

    const handleChange = (e) => {
        const words = e.target.value.trim().split(/\s+/);
        if (words.length <= maxWords) {
            setValue(e.target.value);
        } else {
            // Only allow up to maxWords
            setValue(words.slice(0, maxWords).join(' '));
        }
    };

    return (
        <div className="mb-4">
            {type === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="w-full h-24 border-r border-b border-gray-300 p-2 rounded"
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="w-full border-r border-b border-gray-300 p-2 rounded"
                />
            )}
            <div className="text-right text-sm text-gray-500 mt-1">
                {wordCount}/{maxWords} words
            </div>
        </div>
    );
}

export default FieldCounter;
