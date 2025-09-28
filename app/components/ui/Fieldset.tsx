import React from "react";

const Fieldset: React.FC<{
    legend?: string;
    children: React.ReactNode;
    className?: string;
}> = ({ legend = "", className = "", children }) => {
    return (
        <fieldset className={`border border-gray-300 rounded p-3 ${className}`}>
            {legend && (
                <legend className="text-md font-semibold text-gray-500 px-2">
                    {legend}
                </legend>
            )}
            {children}
        </fieldset>
    );
};

export default Fieldset;
