import React from 'react';
import { Head } from '@inertiajs/react';
import { Phone, Mail, Calendar } from 'lucide-react'; // Usamos los iconos de lucide-react
import LabelValue from '@/Components/LabelValue';
import { PacienteFormProps } from '@/types';



const ViewPaciente: React.FC<PacienteFormProps> = ({ paciente, onClose }) => {
    return (
        <>
            <Head title="Detalles del Paciente" />

            <hr className="border-sky-500 w-[95%]" />

            {/* Información del Paciente */}
            <div className="space-y-4 mt-6 ">
                <LabelValue
                    label="Nombre"
                    value={paciente.name}
                />
                <LabelValue
                    label="Correo Electrónico"
                    value={paciente.email}
                    icon={<Mail className="text-blue-500 mr-2" />} // Icono para correo
                />
                <LabelValue
                    label="Teléfono"
                    value={paciente.phone}
                    icon={<Phone className="text-green-500 mr-2" />} // Icono para teléfono
                />
                <LabelValue
                    label="Fecha de Registro"
                    value={new Date(paciente.created_at).toLocaleDateString()}
                    icon={<Calendar className="text-yellow-500 mr-2" />} // Icono para fecha
                />
            </div>

            {/* Botón de Cerrar */}
            <div className="flex justify-end">
                <button
                    onClick={onClose}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300"
                >
                    <span className="mr-2">Cerrar</span> {/* Texto para el botón */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

        </>
    );
};

export default ViewPaciente;
