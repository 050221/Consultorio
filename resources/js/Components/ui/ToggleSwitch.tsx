import React from 'react';
import { Check, X } from 'lucide-react'; 

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
                checked ? 'bg-green-500' : 'bg-red-400'
            }`}
        >
            <span
                className={`w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${
                    checked ? 'translate-x-6' : 'translate-x-0'
                }`}
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
