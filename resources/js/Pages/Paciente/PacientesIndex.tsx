
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import CustomTable from '@/Components/Table/CustomTable';
import Modal from '@/Components/ui/Modal';
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import ButtonAdd from '@/Components/ui/ButtonAdd';
import CreatePacienteForm from './CreatePacienteForm';





interface Paciente {
    id: number;
    name: string;
    email: string;
}

interface PageProps extends InertiaPageProps {
    pacientes: Paciente[];
}

export default function PacientesIndex() {

    // Obtén los datos de la página
    const { pacientes } = usePage<PageProps>().props;

    // Define las cabeceras
    const headers = ['ID', 'Nombre', 'Correo', 'Accion'];

    // Transforma los datos de los pacientes en un array de objetos genéricos
    const data = pacientes.map((paciente) => ({
        id: paciente.id,
        name: paciente.name,
        email: paciente.email,
    }));

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AuthenticatedLayout
            header={
                <div className='flex flex-wrap' >
                    <div className='w-4/5'>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Pacientes
                        </h2>
                    </div>

                    <div className='w-1/5 flex justify-end'>
                        <ButtonAdd onClick={() => setIsModalOpen(true)}>
                            <span><UserPlus className="w-5 h-5" /></span>
                            Agregar
                        </ButtonAdd>
                    </div>
                </div>

            }
        >
            <Head title="Pacientes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <CustomTable headers={headers} data={data} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Agregar nuevo paciente"
                preventOutsideClick={true} // Esto evitará que el modal se cierre al hacer clic fuera
            >
                <CreatePacienteForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </AuthenticatedLayout>

    )
}
