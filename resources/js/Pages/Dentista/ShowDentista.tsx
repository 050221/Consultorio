import { Head } from "@inertiajs/react";
import { DentistaFormProps } from "@/types";
import { User, Phone, Mail, CheckCircle, Stethoscope, Calendar } from "lucide-react";
import { AvailabilityDisplay } from "@/Components/hooks/dentista/useAvailabilityDisplay";

const ShowDentista: React.FC<DentistaFormProps> = ({ dentista }) => {

    return (
        <>
            <Head title="Detalles del Dentista" />
            <hr className=" border border-sky-500" />

            <div className="grid gap-4 mt-6  ">
                {/* Nombre */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="text-lg font-medium text-gray-900">{dentista.name}</p>
                    </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                        <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="text-lg font-medium text-gray-900">{dentista.phone}</p>
                    </div>
                </div>

                {/* Especialidad */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                        <Stethoscope className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Especialidad</p>
                        {dentista.specialty && dentista.specialty.length > 0 ? (
                            dentista.specialty.map((specialty) => (
                                <p key={specialty.value} className="text-lg font-medium text-gray-900">
                                    {specialty.label},
                                </p>
                            ))
                        ) : (
                            <p className="text-lg font-medium text-gray-900">No especificada</p>
                        )}
                    </div>
                </div>

                {/* Estado */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Estado</p>
                        <p className="text-lg font-medium text-gray-900">
                            {dentista.activo ? "Activo" : "Inactivo"}
                        </p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                        <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Correo Electronico</p>
                        <p className="text-lg font-medium text-gray-900">{dentista.email}</p>
                    </div>
                </div>
            </div>
            <div>
                {/* Disponibilidad */}
                <div className="mt-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 rounded-lg flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Disponibilidad</p>
                        </div>

                    </div>
                    <div className="ml-16">
                        <AvailabilityDisplay availabilityJson={dentista.availability } />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowDentista;