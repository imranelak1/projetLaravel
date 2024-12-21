import React from 'react';

export default function SelectField({
    label,
    name,
    value,
    onChange,
    options,
    error,
    required = false,
    className = '',
}) {
    return (
        <div className={`mb-4 ${className}`}>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                    ${error ? 'border-red-500' : ''}`}
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
