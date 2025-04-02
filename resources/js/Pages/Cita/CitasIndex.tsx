import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from "@inertiajs/react";
import { Calendar } from 'lucide-react';
import Pagination from '@/Components/Table/Pagination';
import CustomTable from '@/Components/Table/CustomTable';
import SearchBar from '@/Components/Table/SearchBar';
import { useState } from 'react';
import { useDeleteItem } from '@/Components/hooks/useDeleteItem';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/ui/Modal';
import useModal from '@/Components/ui/UseModal';
import EditCitaForm from './EditCitaForm';
import { formatDateComplete, formatHora, getEventStyle } from '@/Components/utils/dateUtils';
import FiltrosPopover from '@/Components/Table/FiltrosPopover';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import ReusableButton from '@/Components/Form/ReusableButton';
import { Cita, CitasPageProps, Servicio } from '@/types';
import { useFilters } from '@/Components/hooks/useFilters';
import { usePerPage } from '@/Components/hooks/usePerPage';
import RoleGuard from '@/Components/auth/RoleGuard';


// muetra las columnas de la tabla que pertenese al admin
const columnsCitas = [
    { label: 'Paciente', key: 'patient.name' },
    { label: 'Dentista', key: 'doctor.name' },
    { label: 'Servicio(s)', key: 'servicio', format: (servicios: Servicio[]) => servicios.map(s => s.label).join(', ') },
    { label: 'Fecha', key: 'fecha', format: formatDateComplete },
    { label: 'Hora', key: 'hora', format: formatHora },
    {
        label: 'Estado', key: 'status', format: (status: string) => (
            <span className={getEventStyle(status)}>
                {status}
            </span>
        )
    },
];

// muetra las columnas de la tabla que pertenese al doctor
const columnsCitasDentista = [
    { label: 'Paciente', key: 'patient.name' },
    { label: 'Servicio(s)', key: 'servicio', format: (servicios: Servicio[]) => servicios.map(s => s.label).join(', ') },
    { label: 'Fecha', key: 'fecha', format: formatDateComplete },
    { label: 'Hora', key: 'hora', format: formatHora },
    {
        label: 'Estado', key: 'status', format: (status: string) => (
            <span className={getEventStyle(status)}>
                {status}
            </span>
        )
    },
];

const CitasIndex = () => {

    const { citas, citasDentista } = usePage<CitasPageProps>().props;

    const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();

    const [selectedCita, setSelectedCita] = useState<Cita | null>(null);

    const handleCreate = () => {
        Inertia.visit('/agendar-cita');
    }

    const handleView = (id: number) => {
        Inertia.visit(`/cita/${id}`); // Navega a /cita/{id}
    };

    const handleEdit = (id: number) => {
        const cita = citas.data.find(p => p.id === id);
        if (cita) {
            setSelectedCita(cita);
            openEditModal();
        } else {
            console.log("No se encontró la cita");
        }
    };

    const { handleDelete } = useDeleteItem({
        baseUrl: '/cita',
        resourceName: 'cita',
    });

    const { filters, isLoading: isFiltersLoading, handleFilterChange } = useFilters("citas");
    const { search, status, date } = filters;
    const { perPage, handlePerPageChange, isLoading: isPerPageLoading } = usePerPage(10, "citas");

    const isLoading = isFiltersLoading || isPerPageLoading;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Citas</h2>
                    <RoleGuard allowedRoles={['admin']}>
                        <ReusableButton
                            onClick={handleCreate}
                        >
                            <Calendar className=" w-5 h-5 mr-1" />
                            Agregar Cita
                        </ReusableButton>
                    </RoleGuard>
                </div>
            }
        >
            <Head title="Citas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-wrap py-4">
                                <div className="w-full sm:w-1/2 my-2 md:my-0">
                                    <SearchBar
                                        placeHolder="Buscar cita..."
                                        value={search}
                                        onChange={(e) => handleFilterChange('search', e.target.value)}
                                    />


                                </div>
                                <div className='w-full sm:w-1/2 my-2 md:my-0'>
                                    <div className='ml-auto w-full flex  justify-end gap-4'>
                                        <div className='mt-1'>
                                            <FiltrosPopover
                                                date={date}
                                                status={status}
                                                handleDateChange={(newDate) => handleFilterChange('date', newDate)}
                                                handleStatusChange={(newStatus) => handleFilterChange('status', newStatus)}
                                            />
                                        </div>
                                        <div className='w-24' >
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


                            {isLoading ? (
                                <div className="flex justify-center items-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                                </div>
                            ) : (
                                <>
                                    <RoleGuard allowedRoles={['admin', 'receptionist']}>
                                        {citas.data.length === 0 ? (
                                            <div className="text-center py-4 text-gray-500">
                                                No hay citas registradas actualmente.
                                                <hr className='h-2 w-full' />
                                            </div>
                                        ) : (

                                            <CustomTable
                                                headers={columnsCitas}
                                                data={citas.data}
                                                onView={handleView}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                                showActions
                                            />

                                        )}
                                    </RoleGuard>
                                    <RoleGuard allowedRoles={['doctor']}>
                                        {citasDentista.data.length === 0 ? (
                                            <div className="text-center py-4 text-gray-500">
                                                No hay citas registradas actualmente.
                                            </div>
                                        ) : (

                                            <CustomTable
                                                headers={columnsCitasDentista}
                                                data={citasDentista.data}
                                                onView={handleView}
                                                onDelete={handleDelete}
                                                showActions
                                            />

                                        )}
                                    </RoleGuard>
                                </>
                            )}

                            <div className="mt-4 flex justify-center">
                                <Pagination
                                    links={citas.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para editar pacientes */}
            <Modal

                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                title="Edición de la Cita"
                preventOutsideClick
            >
                {selectedCita && (
                    <EditCitaForm
                        cita={selectedCita}
                        onClose={closeEditModal}
                    />
                )}
            </Modal>

        </AuthenticatedLayout>
    );
}

export default CitasIndex;

