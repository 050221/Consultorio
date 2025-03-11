import React from "react";
import { X } from "lucide-react";

interface SearchBarProps {
  placeHolder?: string;
  value?: string;
  onSearch?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const SearchBar = ({
  placeHolder = "Buscar...",
  value = "",
  onSearch,
  onChange,
  onClear,
}: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onSearch) onSearch(e.target.value);
  };

  return (

    <input
      type="text"
      className="w-full text-base rounded-md border border-gray-300 hover:bg-gray-200 focus:ring-offset-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-300 "
      placeholder={placeHolder}
      value={value}
      onChange={handleChange}
    />

  );
};


export default SearchBar;
