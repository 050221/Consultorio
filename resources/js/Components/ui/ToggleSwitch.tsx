import React from "react";
import { Check, X } from "lucide-react";

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative w-14 h-7 flex items-center rounded-full transition-colors duration-300 
                 
                ${checked ? "bg-green-500" : "bg-red-400"}`}
        >
            <span
                className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center 
                    transform transition-transform duration-300 ease-in-out
                    ${checked ? "translate-x-7" : "translate-x-1"}`}
            >
                {checked ? (
                    <Check className="w-4 h-4 text-green-500" />
                ) : (
                    <X className="w-4 h-4 text-red-500" />
                )}
            </span>
        </button>
    );
};

export default ToggleSwitch;

