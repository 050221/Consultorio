import { DentistasPageProps, Doctor } from "@/types";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ReusableButton from "@/Components/Form/ReusableButton";
import { Stethoscope } from 'lucide-react';
import Pagination from "@/Components/Table/Pagination";
import CustomTable from "@/Components/Table/CustomTable";
import ReusableSelect from "@/Components/Table/ReusableSelect";
import SearchBar from "@/Components/Table/SearchBar";
import StatusBadge from "@/Components/ui/StatusBadge";
import { Inertia } from "@inertiajs/inertia";
import { useFilters } from "@/Components/hooks/useFilters";
import { usePerPage } from "@/Components/hooks/usePerPage";
import useModal from '@/Components/ui/UseModal';
import Modal from '@/Components/ui/Modal';
import { useState } from "react";
import ShowDentista from "./ShowDentista";

const columnsdentistas = [
    { label: 'Nombre', key: 'name' },
    { label: 'Telefono', key: 'phone', },
    { label: 'Especialidad', key: 'specialty' },
    {
        key: 'activo',
        label: 'Estado',
        format: (value: boolean | number) => <StatusBadge value={value} />,
    },
];


const DoctorIndex = () => {

    const { dentistas } = usePage<DentistasPageProps>().props;


 const { isOpen: isViewModalOpen, openModal: openViewModal, closeModal: closeViewModal } = useModal();
 const [selectedDentista, setSelectedDentista] = useState<Doctor | null>(null);


    const handleCreate = () => {
        Inertia.visit('/dentista-create');
    }

    const handleView = (id: number) => {
        const dentista = dentistas.data.find(p => p.id === id);
        if (dentista) {
            setSelectedDentista(dentista);
            openViewModal();
        }
    };


    // Función para manejar la edición
    const handleEdit = (id: number) => {
        Inertia.visit(`/dentista/${id}/edit`); 
    };

    /* Función para manejar la eliminación con Swal
    const { handleDelete } = useDeleteItem({
        baseUrl: '/dentista',
        resourceName: 'dentista',
    });*/


        const { filters, isLoading: isFiltersLoading, handleFilterChange } = useFilters("dentistas", { search: "" });
        const { perPage, handlePerPageChange, isLoading: isPerPageLoading } = usePerPage(10, "dentistas");
    
        const isLoading = isFiltersLoading || isPerPageLoading;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Dentistas</h2>
                    <ReusableButton
                       onClick={handleCreate}
                    >
                        <Stethoscope className="w-5 h-5  mr-1" />
                        Agregar
                    </ReusableButton>
                </div>
            }
        >

            <Head title="Dentistas" />

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
                                    {dentistas.data.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">
                                            No se encontraron dentistas que coincidan con la búsqueda.
                                            <hr className='h-2 w-full' />
                                        </div>
                                    ) : (
                                        <CustomTable
                                            headers={columnsdentistas}
                                            data={dentistas.data}
                                            onView={handleView}
                                            onEdit={handleEdit}
                                            showActions
                                        />
                                    )}
                                </>

                            )}

                            <div className="mt-4 flex justify-center">
                                <Pagination
                                    links={dentistas.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para ver el paciente */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={closeViewModal}
                title="Detalles del Dentista"
                preventOutsideClick
            >
                {selectedDentista && (
                    <ShowDentista
                        dentista={selectedDentista}
                    />
                )}
            </Modal>
        </AuthenticatedLayout>
    );
};

export default DoctorIndex;