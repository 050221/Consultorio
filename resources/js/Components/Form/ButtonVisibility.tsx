import { Eye, EyeClosed } from 'lucide-react';

interface ButtonVisibilityProps {
    onToggle: () => void; 
    isPasswordVisible: boolean; 
}

const ButtonVisibility: React.FC<ButtonVisibilityProps> = ({ onToggle, isPasswordVisible }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="absolute m-auto right-2 top-[2.3rem] text-gray-600 hover:text-gray-800"
        >
            {isPasswordVisible ? <EyeClosed className="h-5 w-6" /> : <Eye className="h-5 w-6" />}
        </button>
    );
};

export default ButtonVisibility;
