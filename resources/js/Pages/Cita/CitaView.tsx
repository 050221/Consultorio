import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReusableButton from "@/Components/Form/ReusableButton";
import { Inertia } from "@inertiajs/inertia";
import LabelValue from "@/Components/LabelValue";
import { formatDate, formatHora, formatTimestamp, getStatusClassName,
  getEventStyle } from "@/Components/utils/dateUtils";
import { CitaViewPageProps } from "@/types";



// Componente reutilizable para etiqueta y valor

const CitaView: React.FC = () => {
  const { cita } = usePage<CitaViewPageProps>().props;
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);

  const handleClick = () => {
    Inertia.visit('/citas');
  }

  if (!cita) {
    return <p className="text-center text-gray-500">Cargando los detalles de la cita...</p>;
  }

  // Formatear los valores
  const formattedDate = formatDate(cita.fecha);
  const formattedTime = formatHora(cita.hora);
  const formattedCreatedAt = formatTimestamp(cita.created_at);

  return (
    <AuthenticatedLayout>
      <Head title="Detalles de la Cita" />
      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              {/* Encabezado */}
              <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Detalles de la Cita
                </h1>
                <ReusableButton
                  onClick={handleClick}
                >
                  Salir
                </ReusableButton>
              </div>

              <hr className="mt-2 border-sky-500" />

              {/* Información de la cita */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <LabelValue label="Paciente" value={cita.users.name} />
                  <LabelValue label="Teléfono" value={cita.users.phone} />
                </div>
                <div>
                <LabelValue label="Fecha" value={formattedDate} />
                <LabelValue label="Hora" value={formattedTime} />
                  <LabelValue label="Estado" value={cita.status}  className={getEventStyle(cita.status)} />
                </div>
              </div>

              {/* Nota */}
              <div className="mt-6">
                <LabelValue label="Nota" value={""} />
                <div className="relative">
                  <p
                    className={`text-gray-800 ${!isNoteExpanded ? "line-clamp-4" : ""
                      }`}
                  >
                    {cita.nota || "Sin asignar"}
                  </p>
                  {cita.nota && cita.nota.length > 150 && (
                    <button
                      onClick={() => setIsNoteExpanded(!isNoteExpanded)}
                      className="text-blue-600 hover:underline mt-2"
                      aria-expanded={isNoteExpanded}
                      aria-label={isNoteExpanded ? "Leer menos" : "Leer más"}
                    >
                      {isNoteExpanded ? "Leer menos" : "Leer más"}
                    </button>

                  )}
                </div>
              </div>

              {/* Fecha de creación */}
              <div className="mt-6">
                <LabelValue label="Creada el" value={formattedCreatedAt} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CitaView;
