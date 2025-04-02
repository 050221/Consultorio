import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReusableButton from "@/Components/Form/ReusableButton";
import { Inertia } from "@inertiajs/inertia";
import LabelValue from "@/Components/LabelValue";
import {
  formatDateComplete, formatHora, formatTimestamp,
  getEventStyle
} from "@/Components/utils/dateUtils";
import { CitaViewPageProps } from "@/types";
import { ArrowLeft } from "lucide-react";

const CitaView: React.FC = () => {
  const { cita } = usePage<CitaViewPageProps>().props;
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);

  if (!cita) {
    return <p className="text-center text-gray-500">Cargando los detalles de la cita...</p>;
  }

  // Formatear los valores
  const formattedDate = formatDateComplete(cita.fecha);
  const formattedTime = formatHora(cita.hora);
  const formattedCreatedAt = formatTimestamp(cita.created_at);

  return (
    <AuthenticatedLayout>
      <Head title="Detalles de la Cita" />

      <div className="py-12 px-4 sm:px-0">
        <div className="max-w-4xl relative mx-auto bg-white shadow-xl rounded-xl overflow-hidden ">
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-700 dark:from-sky-600 dark:to-blue-800 text-white p-5 ">

            <h1 className="text-2xl font-semibold">Detalles de la Cita</h1>
          </div>

          <div className="p-6">
            {/* Información principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-300 pb-6">
              <LabelValue label="Paciente" value={cita.patient?.name || "No especificado"} />
              <LabelValue label="Dentista" value={cita.doctor?.name || "No asignado"} />
              <LabelValue label="Fecha" value={formattedDate} />
              <LabelValue label="Hora" value={formattedTime} />
              <div>
                <label className="font-medium text-gray-600" htmlFor="servicio">Servicio(s):</label>
                {cita.servicio && cita.servicio.length > 0 ? (
                  <p className="text-base font-medium text-gray-900">
                    {cita.servicio.map((servicio) => servicio.label).join(", ")}
                  </p>
                ) : (
                  <p className="text-lg font-medium text-gray-900">No especificado</p>
                )}
              </div>
              <LabelValue label="Estado" className={getEventStyle(cita.status)} value={cita.status || "No definido"} />
              <LabelValue label="Registrada el" value={formattedCreatedAt} />
            </div>

            {/* Nota con diseño moderno */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-300">
              <h2 className="text-lg font-semibold text-gray-700">Nota</h2>
              <p className={`text-gray-600 transition-all ${isNoteExpanded ? "line-clamp-none" : "line-clamp-3 overflow-hidden"}`}>
                {cita.nota || "Sin asignar"}
              </p>
              {cita.nota && cita.nota.length > 150 && (
                <button
                  onClick={() => setIsNoteExpanded(!isNoteExpanded)}
                  className="mt-2 text-blue-600 hover:underline text-sm font-medium"
                >
                  {isNoteExpanded ? "Leer menos" : "Leer más"}
                </button>
              )}
            </div>
          </div>

          {/* Botón de regreso */}
          <div className="p-6 flex justify-start">
            <ReusableButton
              onClick={() => Inertia.visit('/citas')}
              className="flex items-center gap-2 px-5 py-2 bg-sky-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </ReusableButton>
          </div>
          {!!cita.is_emergency && (
            <div className="absolute bottom-5 right-5 bg-red-100 border border-red-500 text-red-700 rounded-lg w-40 md:w-80 flex items-center p-2 md:p-3 shadow-md animate-bounce">
              <span className="flex items-center font-bold">
                <svg className="w-5 h-5 mr-2 text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9-4a1 1 0 112 0v4a1 1 0 01-2 0V6zm1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" />
                </svg>
                Cita urgente
              </span>
            </div>
          )}
          {/*}}
          {cita.is_emergency && (
            <div className="p-3 bg-red-500 text-white rounded-lg flex items-center justify-center shadow-md border border-red-700">
              <svg className="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9-4a1 1 0 112 0v4a1 1 0 01-2 0V6zm1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-bold">Cita Urgente</span>
            </div>
          )}

          {cita.is_emergency && (
            <div className="fixed bottom-16 right-7 bg-red-600 text-white p-3 rounded-lg shadow-lg flex items-center animate-bounce">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9-4a1 1 0 112 0v4a1 1 0 01-2 0V6zm1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" />
              </svg>
              <span className="font-bold">Cita Urgente</span>
            </div>
          )}*/}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CitaView;
