import React from 'react';

function FieldCounter({ name, placeholder, type = 'text', maxChar = 300, className = '', textareaClassName = '', value, onChange }) {
    const charCount = value.length;

    const handleChange = (e) => {
        if (e.target.value.length <= maxChar) {
            if (onChange) {
                onChange(e);
            }
        }
    }

    return (
        <div className={`relative ${className}`}>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className={`w-full border border-gray-300 p-2 rounded-xl hover:border-secondary text-secondary ${textareaClassName}`}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-xl"
                />
            )}
            <div className="text-right text-sm text-gray-500 mt-1">
                {charCount}/{maxChar} Characters
            </div>
        </div>
    );
}

export default FieldCounter;
