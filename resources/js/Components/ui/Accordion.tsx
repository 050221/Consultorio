import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Cita } from '@/types';
import { formatDate, formatHora, getEventStyle} from '@/Components/utils/dateUtils';

interface AccordionProps {
  citas: Cita[];
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ citas, className = '' }) => {
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  const togglePanel = (index: number) => {
    setOpenPanel((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {citas.length > 0 ? (
        citas.map((cita, index) => (
          <div
            key={cita.id}
            className="rounded-lg shadow-md border border-gray-300 overflow-hidden bg-white hover:shadow-lg transition-shadow"
          >
            {/* Accordion Header */}
            <button
              onClick={() => togglePanel(index)}
              className={`
                w-full flex justify-between items-center p-4 text-left font-medium transition-all duration-300
                ${openPanel === index ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}
              `}
              aria-expanded={openPanel === index}
              aria-controls={`panel-${index}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-lg font-semibold">{cita.users?.name || 'Paciente desconocido'}</span>
                <span className="text-sm text-gray-500">{formatHora(cita.hora)}</span>
              </div>
              <div className="flex items-center">
                {openPanel === index ? (
                  <ChevronUp className="text-blue-700" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </div>
            </button>
  
            {/* Accordion Panel */}
            {openPanel === index && (
              <div
                id={`panel-${index}`}
                className="p-6 bg-gray-50 text-gray-700 transition-all duration-300 ease-in-out"
              >
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="font-semibold w-24">Nombre:</span>
                    <span>{cita.users?.name || 'No disponible'}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold w-24">Fecha:</span>
                    <span>{formatDate(cita.fecha)}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold w-24">Hora:</span>
                    <span>{formatHora(cita.hora)}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold w-24">Estado:</span>
                    <span className={`font-medium ${getEventStyle(cita.status)}`}>{cita.status}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold w-24">Nota:</span>
                    <span>{cita.nota || 'Sin nota'}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 bg-gray-100 p-6 rounded-lg">
          <p className="text-lg font-medium">No hay citas disponibles</p>
          <p className="text-sm">Puedes agregar una nueva cita o verificar más tarde.</p>
        </div>
      )}
    </div>
  );
  
};

export default Accordion;
