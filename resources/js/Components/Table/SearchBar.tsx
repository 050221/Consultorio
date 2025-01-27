import React from "react";

interface SearchBarProps {
    placeHolder?: string; // Opcional
    value?: string; // Opcional
    onSearch?: (value: string) => void; // Opcional
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Opcional
  }
const SearchBar = ({
    placeHolder = "Buscar...", // Valor por defecto
    value,
    onSearch,
    onChange,
  }: SearchBarProps) => {
    // Controla los cambios en el input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e); // Si `onChange` está definido, lo llamamos
      }
  
      if (onSearch) {
        onSearch(e.target.value); // Si `onSearch` está definido, lo llamamos
      }
    };
  
    return (
      <input
        type="text"
        className="w-full text-base rounded-md border border-gray-300 hover:bg-gray-200 focus:ring-offset-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-300"
        placeholder={placeHolder} // Usar el placeholder si está definido
        value={value} // Controla el valor si está definido
        onChange={handleChange} // Controlador de eventos reutilizable
      />
    );
  };
  
  export default SearchBar;

