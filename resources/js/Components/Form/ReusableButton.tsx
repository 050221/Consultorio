import React from 'react';
import '@/Components/Form/ReusableButton.css';

interface ReusableButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  processing?: boolean; // Mostrar loader o no
  loaderClassName?: string; // Clases adicionales para el loader
  color?: 'sky' | 'orange' | 'red'; // Nuevo prop para elegir el color
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  children,
  processing = false,
  disabled = false,
  loaderClassName = '',
  className = '',
  color = 'sky', // Establecer el color por defecto a 'sky'
  ...props
}) => {
  // Función helper para obtener el color correcto
  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return 'bg-red-500 text-white hover:bg-red-700';
      case 'orange':
        return 'bg-orange-500 text-white hover:bg-orange-700';
      case 'sky':
      default:
        return 'bg-sky-500 text-white hover:bg-sky-600';
    }
  };

  return (
    <button
      {...props}
      disabled={disabled || processing}
      className={`px-4 py-2 flex items-center justify-center rounded hover:bg-opacity-80 transition ${getColorClasses()} ${
        disabled || processing ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      aria-busy={processing}
    >
      {processing && (
        <div
          className={`loader border-t-2 border-white animate-spin rounded-full h-4 w-4 mr-2 ${loaderClassName}`}
          role="status"
          aria-label="Cargando"
        ></div>
      )}
      {children}
    </button>
  );
};

export default ReusableButton;