import React from "react";
import Select from "react-select";

interface MultiSelectProps {
  options: { value: string | number; label: string }[];
  value?: { value: string | number; label: string }[];
  onChange?: (value: { value: string | number; label: string }[]) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Seleccione una o más opciones",
  name,
  className = "",
  disabled = false,
  required = true,

}) => {
  return (
    <div className={`mt-1 rounded-md border border-gray-300 px-3 py-0.5  shadow-sm ${className}`}>
      <Select
        isMulti
        options={options}
        value={value}
        onChange={(selected) => onChange && onChange(selected as any)}
        placeholder={placeholder}
        isDisabled={disabled}
        classNamePrefix="react-select"
        required={required}
        styles={{
          control: (base) => ({
            ...base,
            border: "none", // Se usa el border de Tailwind
            backgroundColor: "white",
            boxShadow: "none",
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#0ea5e9", // sky-500
            color: "white",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "white",
          }),
          multiValueRemove: (base) => ({
            ...base,
            backgroundColor: "#0284c7", // sky-600
            color: "white",
            ":hover": {
              backgroundColor: "#0369a1", // sky-700
            },
          }),
        }}
      />
    </div>
  );
};

export default MultiSelect;
