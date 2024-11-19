import '@/Components/Form/ReusableButton.css'

interface ReusableButtonProps {
  children: React.ReactNode; 
  type?: 'button' | 'submit' | 'reset'; 
  disabled?: boolean; 
  processing?: boolean; 
  className?: string; 
  onClick?: () => void; 
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  processing = false,
  className = '',
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || processing} 
      className={`px-4 py-2 flex items-center justify-center bg-sky-500 text-white rounded hover:bg-sky-600 transition ${
        disabled || processing ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {processing ? (
        <div className="loader border-t-2 border-white animate-spin rounded-full h-4 w-4 mr-2"></div>
      ) : null}
      {children}
    </button>
  );
};


export default ReusableButton;
