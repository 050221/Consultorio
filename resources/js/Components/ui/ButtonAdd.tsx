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
        className={`flex ${className}  gap-1 `}
      >    
        {children}
      </button>
    );
  }
