import LabelValue from "@/Components/LabelValue";
import { Cita } from "@/types";
import {
    formatDateComplete, formatHora, formatTimestamp,
    getEventStyle
} from "@/Components/utils/dateUtils";
import { useState } from "react";
import RoleGuard from "@/Components/auth/RoleGuard";
import InputLabel from "@/Components/InputLabel";


interface ViewCitaModalProps {
    cita: Cita | null;
}

const ViewCitaModal: React.FC<ViewCitaModalProps> = ({ cita }) => {
    const [isNoteExpanded, setIsNoteExpanded] = useState(false);

    if (!cita) return <p>No hay datos de la cita</p>; // Evita errores si no hay una cita seleccionada

    return (
        <div >
            {/* Información principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-300 pb-6">
                <LabelValue label="Paciente" value={cita.patient?.name || "No especificado"} />
                <RoleGuard allowedRoles={['admin', 'receptionist']}><LabelValue label="Doctor" value={cita.doctor?.name || "No asignado"} /></RoleGuard>
                <LabelValue label="Fecha" value={formatDateComplete(cita.fecha)} />
                <LabelValue label="Hora" value={formatHora(cita.hora)} />
                <LabelValue label="Servicio(s)" value={
                    cita.servicio && cita.servicio.length > 0 ? (
                        <p >
                            {cita.servicio.map((servicio) => servicio.label).join(", ")}
                        </p>
                    ) : (
                        <p className="text-lg font-medium text-gray-900">No especificado</p>
                    )} />
                <LabelValue label="Estado" className={getEventStyle(cita.status)} value={cita.status || "No definido"} />
                <LabelValue label="Registrada el" value={formatTimestamp(cita.created_at)} />
                <div>
                    <InputLabel htmlFor="is_emergency" value="¿Cita urgencia?" />
                    <div className="flex items-center">
                        <input
                            id="is_emergency"
                            type="checkbox"
                            checked={cita.is_emergency}
                            className="mr-2 w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500 "
                        />
                        <label htmlFor="is_emergency" className="text-gray-700">Sí</label>
                    </div>
                </div>
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
    );
};

export default ViewCitaModal;
