import React from "react";

interface ReusableTextAreaProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  [key: string]: any; // Para aceptar cualquier otra prop adicional
}

const ReusableTextArea: React.FC<ReusableTextAreaProps> = ({
  value,
  onChange,
  placeholder = "Escriba aquí...",
  name,
  className = "",
  rows = 4,
  disabled = false,
  required = false,
  maxLength,
  minLength,
  ...props
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      className={`
        w-full 
        border border-gray-300 
        rounded-md 
        shadow-sm 
        focus:border-sky-500 
        focus:ring-sky-500 
        focus:ring-1 
        focus:outline-none 
        ${className}
      `}
      {...props}
    />
  );
};

export default ReusableTextArea;