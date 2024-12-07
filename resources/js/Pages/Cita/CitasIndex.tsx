import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { useTablePagination } from "@/Components/hooks/useTablePagination";
import { UserPlus } from 'lucide-react';
import Pagination from '@/Components/Table/Pagination';
import CustomTable from '@/Components/Table/CustomTable';
import SearchBar from '@/Components/Table/SearchBar';
import { useMemo, useState } from 'react';
import { useDeleteItem } from '@/Components/hooks/useDeleteItem';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/ui/Modal';
import useModal from '@/Components/ui/UseModal';
import EditCitaForm from './EditCitaForm';
import { formatDate, formatHora, getEventStyle } from '@/Components/utils/dateUtils';
import FiltrosPopover from '@/Components/Table/FiltrosPopover';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import ReusableButton from '@/Components/Form/ReusableButton';


// Actualización de las interfaces para incluir información del usuario
interface User {
    id: number;
    name: string;
}

interface Cita {
    id: number;
    patient_id: number;
    users?: User;  // Relación con el usuario/paciente
    fecha: string;
    hora: string;
    status: string;
}

interface CustomPageProps extends InertiaPageProps {
    citas: {
        data: Cita[];
        links: { url: string | null; label: string; active: boolean }[];
    }
}

const columnsCitas = [
    { label: 'Paciente', key: 'users.name' },  // Funciona con propiedades anidadas
    { label: 'Fecha', key: 'fecha', format: formatDate },
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
    const { citas } = usePage<CustomPageProps>().props;

    const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();

    const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>(''); // Estado para filtro por status
    const [filterDate, setFilterDate] = useState<string>(''); // Estado para filtro por fecha

    // Manejar búsqueda
    const handleSearch = (value: string) => setSearchText(value);

    // Manejar cambio de filtro por status
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(event.target.value);
    };

    // Manejar cambio de filtro por fecha
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDate(event.target.value);
    };

    // Use useMemo to optimize filtering
    const filteredCitas = useMemo(() => {
        return citas.data.filter((cita) => {
            const matchesSearch =
                (cita.users?.name || '').toLowerCase().includes(searchText.toLowerCase()) ||
                cita.fecha.includes(searchText) ||
                cita.hora.includes(searchText) ||
                cita.status.toLowerCase().includes(searchText.toLowerCase());

            const matchesStatus = filterStatus ? cita.status === filterStatus : true;
            const matchesDate = filterDate ? cita.fecha === filterDate : true;

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [citas.data, searchText, filterStatus, filterDate]);


    const handleCreate = () => {
        Inertia.visit('/agendar-cita');
    }

    const handleView = (id: number) => {
        Inertia.visit(`/cita/${id}`); // Navega a /cita/{id}
    };

    const handleEdit = (id: number) => {
        const cita = citas.data.find(p => p.id === id);
        console.log("Cita seleccionada:", cita); // Log para verificar
        if (cita) {
            setSelectedCita(cita);
            console.log("Abriendo modal...");
            openEditModal(); // Aquí debería activarse el modal
        } else {
            console.log("No se encontró la cita con el ID:", id);
        }
    };

    const { handleDelete } = useDeleteItem({
        baseUrl: '/cita',
        resourceName: 'cita',
    });

    const { perPage, isLoading, handlePerPageChange } = useTablePagination({
        initialPerPage: 10,
        path: '/citas',
        resourceKey: 'citas',
    });


    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Citas</h2>
                    <ReusableButton
                        onClick={handleCreate}
                    >
                        <UserPlus className=" w-5 h-5 mr-1" />
                        Agregar Cita
                    </ReusableButton>
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
                                        onSearch={handleSearch}
                                    />
                                </div>
                                <div className='w-full sm:w-1/2 my-2 md:my-0'>
                                    <div className='ml-auto w-full flex  justify-end gap-4'>
                                        <div >
                                            <FiltrosPopover
                                                filterDate={filterDate}
                                                filterStatus={filterStatus}
                                                onDateChange={handleDateChange}
                                                onStatusChange={handleStatusChange}
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
                                    {citas.data.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">
                                            No hay citas registradas actualmente.
                                        </div>
                                    ) : (
                                        <>
                                            {filteredCitas.length === 0 ? (
                                                <div className="text-center py-4 text-gray-500">
                                                    No se encontraron citas que coincidan con la búsqueda.
                                                </div>
                                            ) : (
                                                <CustomTable
                                                    headers={columnsCitas}
                                                    data={filteredCitas}
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
                title="Editar detalles de la cita"
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