/*import React from 'react';

interface FiltersProps {
  children: React.ReactNode;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Select({ 
  children,
  value,
  onChange,
  className = ''
}: FiltersProps) {
  return (
    <select 
      value={value}
      onChange={(e) => onChange(String(e.target.value))}
      className={`border-1 border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 focus:outline-none ${className}`}
    >    
      {children}
    </select>
  );
}*****/

import React from "react";

interface ReusableSelectProps {
  options: { value: string | number; label: string }[]; // Opciones para el select
  value?: string | number; // Valor seleccionado
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Evento al cambiar
  placeholder?: string; // Opción predeterminada
  name?: string; // Nombre del select
  className?: string; // Clases personalizadas
  disabled?: boolean; // Deshabilitar el select
  [key: string]: any; // Para aceptar cualquier otra prop
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  name,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      name={name}
      className={`border-1 w-full border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 focus:outline-none ${className}`}
      disabled={disabled}
      {...props}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ReusableSelect;
