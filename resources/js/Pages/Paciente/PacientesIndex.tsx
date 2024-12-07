import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CustomTable from '@/Components/Table/CustomTable';
import Modal from '@/Components/ui/Modal';
import Pagination from '@/Components/Table/Pagination';
import CreatePacienteForm from './CreatePacienteForm';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import useModal from '@/Components/ui/UseModal';
import EditPacienteForm from './EditPacienteForm';
import { UserPlus } from 'lucide-react';
import SearchBar from '@/Components/Table/SearchBar';
import { useTablePagination } from '@/Components/hooks/useTablePagination';
import { useDeleteItem } from '@/Components/hooks/useDeleteItem';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import ReusableButton from '@/Components/Form/ReusableButton';
import ViewPaciente from './ViewPaciente';


// Tipos
interface Paciente {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
}


interface CustomPageProps extends InertiaPageProps {
    pacientes: {
        data: Paciente[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

const columnsPacientes = [
    { label: 'Nombre', key: 'name' },
    { label: 'Correo', key: 'email' },
    { label: 'Telefono', key: 'phone', },
];

const PacientesIndex = () => {
    const { pacientes } = usePage<CustomPageProps>().props;

    const { isOpen: isCreateModalOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
    const { isOpen: isViewModalOpen, openModal: openViewModal, closeModal: closeViewModal } = useModal();
    const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();

    const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
    const [searchText, setSearchText] = useState<string>("");

    // Función para manejar la búsqueda
    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    // Filtrar datos de la tabla
    const filteredPacientes = pacientes.data.filter((paciente) =>
        paciente.name.toLowerCase().includes(searchText.toLowerCase()) ||
        paciente.email.toLowerCase().includes(searchText.toLowerCase()) ||
        paciente.phone.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleView = (id: number) => {
        const paciente = pacientes.data.find(p => p.id === id);
        if (paciente) {
            setSelectedPaciente(paciente);
            openViewModal();
        }
    };


    // Función para manejar la edición
    const handleEdit = (id: number) => {
        const paciente = pacientes.data.find(p => p.id === id);
        if (paciente) {
            setSelectedPaciente(paciente);
            openEditModal();
        }
    };

    // Función para manejar la eliminación con Swal
    const { handleDelete } = useDeleteItem({
        baseUrl: '/pacientes',
        resourceName: 'paciente',
    });

    const { perPage, isLoading, handlePerPageChange } = useTablePagination({
        initialPerPage: 10,
        path: '/pacientes',
        resourceKey: 'pacientes',
    });


    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Pacientes</h2>
                    <ReusableButton
                        onClick={openCreateModal}
                    >
                        <UserPlus className="w-5 h-5  mr-1" />
                        Agregar
                    </ReusableButton>
                </div>
            }
        >
            <Head title="Pacientes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-6">


                            <div className="flex flex-wrap py-4">

                                <div className="w-full sm:w-1/2 my-2 md:my-0">
                                    <SearchBar
                                        placeHolder="Buscar paciente..."
                                        onSearch={handleSearch}
                                    />
                                </div>

                                <div className="w-full sm:w-1/2 my-2 md:my-0">
                                    <div className='ml-auto w-full flex  justify-end' >
                                        <div className='w-24'>
                                            <ReusableSelect
                                                value={perPage}
                                                onChange={(event) => handlePerPageChange(Number(event.target.value))}
                                                options={[
                                                    { value: 10, label: '10' },
                                                    { value: 25, label: '25' },
                                                    { value: 50, label: '50' },
                                                    { value: 100, label: '100' },
                                                ]}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>


                            {/* Añadimos un loader condicional */}
                            {isLoading ? (
                                <div className="flex justify-center items-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                                </div>
                            ) : (
                                <>
                                    {/* Tabla existente */}
                                    {pacientes.data.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">
                                            No hay pacientes registrados actualmente.
                                            <hr className='h-2 w-full' />
                                        </div>
                                    ) : (
                                        <>
                                            {filteredPacientes.length === 0 ? (
                                                <div className="text-center py-4 text-gray-500">
                                                    No se encontraron pacientes que coincidan con la búsqueda.
                                                    <hr className='h-2 w-full' />
                                                </div>
                                            ) : (
                                                <CustomTable
                                                    headers={columnsPacientes}
                                                    data={filteredPacientes}
                                                    onView={handleView}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    showActions
                                                />
                                            )}
                                        </>
                                    )}
                                </>
                            )}

                            <div className="mt-4 flex justify-center">
                                <Pagination
                                    links={pacientes.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para agregar pacientes */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                title="Agregar nuevo paciente"
                preventOutsideClick
            >
                <CreatePacienteForm
                    onClose={closeCreateModal} />
            </Modal>

             {/* Modal para ver el paciente */}
             <Modal
                isOpen={isViewModalOpen}
                onClose={closeViewModal}
                title="Detalles del Paciente"
                preventOutsideClick
            >
             {selectedPaciente && (
                    <ViewPaciente
                        paciente={selectedPaciente}
                        onClose={closeViewModal}
                    />
                )}
            </Modal>

            {/* Modal para editar pacientes */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                title="Editar paciente"
                preventOutsideClick
            >
                {selectedPaciente && (
                    <EditPacienteForm
                        paciente={selectedPaciente}
                        onClose={closeEditModal}
                    />
                )}
            </Modal>
        </AuthenticatedLayout >
    );
}


export default PacientesIndex;