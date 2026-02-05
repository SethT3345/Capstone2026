import React from 'react';

export default function Button({ 
    children, 
    onClick, 
    type = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    className = ''
}) {
    // Base styles
    const baseStyles = 'rounded-lg transition duration-200 font-medium';
    
    // Variant styles
    const variants = {
        primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };
    
    // Size styles
    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
        xl: 'px-8 py-5 text-xl',
    };
    
    // Width styles
    const widthStyle = fullWidth ? 'w-full' : '';
    
    // Disabled styles
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer';
    
    // Combine all styles
    const combinedStyles = `
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${widthStyle}
        ${disabledStyles}
        ${className}
    `.trim().replace(/\s+/g, ' ');
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedStyles}
        >
            {children}
        </button>
    );
}
