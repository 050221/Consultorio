interface ButtonAddProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }

export default function ButtonAdd({ 
    children, 
    onClick,
    className = "" 
  }: ButtonAddProps) {
    return (
        <button 
        onClick={onClick}
        className={`flex bg-sky-500 px-4 py-2 text-white rounded hover:bg-sky-600 gap-1 ${className}`}
      >
        {children}
      </button>
    );
  }
