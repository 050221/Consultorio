import React from 'react';
import { Head } from '@inertiajs/react';
import { Phone, Mail, Calendar, Cake, User } from 'lucide-react';
import LabelValue from '@/Components/LabelValue';
import { PacienteViewProps } from '@/types';
import { formatTimestamp } from '@/Components/utils/dateUtils';


const ViewPaciente: React.FC<PacienteViewProps> = ({ paciente }) => {
    return (
        <>
            <Head title="Detalles del Paciente" />
            <hr className=" border border-sky-500" />

            {/* Información del Paciente */}
            <div className="grid gap-4 mt-6 grid-cols-1 ">
                {/* Nombre */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="text-lg font-medium text-gray-900">{paciente.name}</p>
                    </div>
                </div>

                {/* fecha nacimiento */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-lg">
                        <Cake className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                        <p className="text-lg font-medium text-gray-900">{new Date(paciente.birthdate).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                        <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="text-lg font-medium text-gray-900">{paciente.phone}</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                        <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Correo Electronico</p>
                        <p className="text-lg font-medium text-gray-900">{paciente.email}</p>
                    </div>
                </div>

                {/* fecha registro */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                        <Calendar className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Fecha de Registro</p>
                        <p className="text-lg font-medium text-gray-900">{formatTimestamp(paciente.created_at)}</p>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ViewPaciente;
