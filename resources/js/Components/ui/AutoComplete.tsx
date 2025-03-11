import { useState, useEffect } from "react";
import { X } from "lucide-react"; // Importamos el icono

interface Doctor {
  id: number;
  name: string;
}

interface AutoCompleteProps {
  doctores: Doctor[];
  placeholder?: string;
  onSelect: (selectedId: number) => void;
  initialSelectedId?: number;
}

export default function AutoComplete({
  doctores,
  placeholder = "Buscar...",
  onSelect,
  initialSelectedId,
}: AutoCompleteProps) {
  const [query, setQuery] = useState("");
  const [filteredDoctores, setFilteredDoctores] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (initialSelectedId) {
      const doctor = doctores.find((doc) => doc.id === initialSelectedId);
      if (doctor) {
        setSelectedDoctor(doctor);
        setQuery(doctor.name);
      }
    }
  }, [initialSelectedId, doctores]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredDoctores([]);
    } else {
      setFilteredDoctores(
        doctores.filter((doctor) =>
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setQuery(doctor.name);
    setFilteredDoctores([]);
    onSelect(doctor.id);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedDoctor(null);
    setFilteredDoctores([]);
    onSelect(0); // Enviar 0 si no hay selección
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="border-1 w-full border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 focus:outline-none mt-1 pr-10"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            aria-label="Limpiar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {filteredDoctores.length > 0 && (
        <ul className="absolute z-20 w-full max-h-[120px] bg-white border border-gray-200 rounded-md shadow-lg mt-1 overflow-y-auto">
          {filteredDoctores.map((doctor) => (
            <li
              key={doctor.id}
              onClick={() => handleSelectDoctor(doctor)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {doctor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
