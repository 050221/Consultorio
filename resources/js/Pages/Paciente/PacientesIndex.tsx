import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CustomTable from '@/Components/Table/CustomTable';
import Modal from '@/Components/ui/Modal';
import Pagination from '@/Components/Table/Pagination';
import CreatePacienteForm from './CreatePacienteForm';
import useModal from '@/Components/ui/UseModal';
import EditPacienteForm from './EditPacienteForm';
import { UserPlus } from 'lucide-react';
import SearchBar from '@/Components/Table/SearchBar';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import ReusableButton from '@/Components/Form/ReusableButton';
import ViewPaciente from './ViewPaciente';
import { User, PacientesPageProps } from '@/types';
import StatusBadge from '@/Components/ui/StatusBadge';
import { usePerPage } from '@/Components/hooks/usePerPage';
import { useFilters } from '@/Components/hooks/useFilters';


const columnsPacientes = [
    { label: 'Nombre', key: 'name' },
    { label: 'Telefono', key: 'phone', },
    { label: 'Correo', key: 'email' },
    {
        key: 'activo',
        label: 'Estado',
        format: (value: boolean | number) => <StatusBadge value={value} />,
    },
];

const PacientesIndex = () => {
    
    const { pacientes } = usePage<PacientesPageProps>().props;

    const { isOpen: isCreateModalOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
    const { isOpen: isViewModalOpen, openModal: openViewModal, closeModal: closeViewModal } = useModal();
    const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();

    const [selectedPaciente, setSelectedPaciente] = useState<User | null>(null);


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


    const { filters, isLoading: isFiltersLoading, handleFilterChange } = useFilters("pacientes", { search: "" });
    const { perPage, handlePerPageChange, isLoading: isPerPageLoading } = usePerPage(10, "pacientes");


    const isLoading = isFiltersLoading || isPerPageLoading;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Pacientes</h2>
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
                                        value={filters.search}
                                        onChange={(e) => handleFilterChange("search", e.target.value)}
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
                                    {pacientes.data.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">
                                            No se encontraron pacientes que coincidan con la búsqueda.
                                            <hr className='h-2 w-full' />
                                        </div>
                                    ) : (
                                        <CustomTable
                                            headers={columnsPacientes}
                                            data={pacientes.data}
                                            onView={handleView}
                                            onEdit={handleEdit}
                                            showActions
                                        />
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
                title="Agregar Nuevo Paciente"
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
                    />
                )}
            </Modal>

            {/* Modal para editar pacientes */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                title="Edición de Paciente"
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