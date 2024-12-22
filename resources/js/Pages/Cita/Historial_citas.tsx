import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Calendar, Clock, User, Mail, Phone, FileText, Circle } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDateComplete, formatHora, getEventStyle } from '@/Components/utils/dateUtils';
import SearchBar from '@/Components/Table/SearchBar';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import { useTablePagination } from '@/Components/hooks/useTablePagination';
import Pagination from '@/Components/Table/Pagination';
import useModal from '@/Components/ui/UseModal';
import Modal from '@/Components/ui/Modal';
import { CitasPageProps, Cita } from '@/types';
import RoleGuard from '@/Components/auth/RoleGuard';


interface CitaRowProps {
    cita: Cita;
}

const CitaRow: React.FC<CitaRowProps> = ({ cita }) => {
    const formattedDate = formatDateComplete(cita.fecha);
    const formattedTime = formatHora(cita.hora);
    console.log(cita);

    const { isOpen: isViewModalOpen, openModal: openViewModal, closeModal: closeViewModal } = useModal();


    return (
        <>
            <tr className="border-b">
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-sky-500" />
                        <span className="font-medium text-gray-500">{cita.users.name}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-4 h-4 text-blue-500" /> {cita.users.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-4 h-4 text-green-500" /> {cita.users.phone}
                    </div>
                </td>
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        <span>{formattedDate}</span>
                    </div>
                </td>
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <span>{formattedTime}</span>
                    </div>
                </td>
                <td className="px-4 py-3">
                    <span className={getEventStyle(cita.status)}>{cita.status}</span>
                </td>
                <td className="px-4 py-3 text-sm">
                    <button
                        onClick={openViewModal}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 "
                        aria-label="Ver nota de la cita"
                        title="Ver nota de la cita"
                    >
                        <FileText className="w-5 h-5 text-gray-500 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-500 group-hover:text-gray-600">Ver nota</span>
                    </button>

                </td>
            </tr>

            <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Nota de la cita">
                {cita.nota ? (
                    cita.nota
                ) : (
                    <span className="italic text-gray-500">Sin nota</span>
                )}
            </Modal>

        </>
    );
};

const HistorialCitas: React.FC = () => {
    const { citas } = usePage<CitasPageProps>().props;
    const [searchText, setSearchText] = useState<string>('');
    console.log(citas);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const filteredCitas = citas.data.filter((cita) => {
        const lowerSearch = searchText.toLowerCase();
        return (

            cita.users.name.toLowerCase().includes(lowerSearch) ||
            cita.users.email.toLowerCase().includes(lowerSearch) ||
            cita.users.phone.toLowerCase().includes(lowerSearch) ||
            formatDateComplete(cita.fecha).toLowerCase().includes(lowerSearch) ||
            formatHora(cita.hora).toLowerCase().includes(lowerSearch)
        );
    });

    const { perPage, isLoading, handlePerPageChange } = useTablePagination({
        initialPerPage: 10,
        path: '/historial_citas',
        resourceKey: 'historial_citas',
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold">Historial de Citas</h2>
            }>
            <Head title="Historial de Citas" />
            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex flex-wrap py-4">
                            <div className="w-full sm:w-1/2 my-2">
                                <SearchBar placeHolder="Buscar..." onSearch={handleSearch} />
                            </div>
                            <div className="w-full sm:w-1/2 my-2 flex justify-end">
                                <div className="w-24">
                                    <ReusableSelect
                                        value={perPage}
                                        onChange={(e) => handlePerPageChange(Number(e.target.value))}
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

                        {isLoading ? (
                            <div className="flex justify-center items-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                            </div>
                        ) : citas.data.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">No hay citas en el historial.</div>
                        ) : filteredCitas.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">No se encontraron citas que coincidan con la búsqueda.</div>
                        ) : (
                            <>
                                <RoleGuard allowedRoles={['Admin', 'Doctor']}>
                                    <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                                        <thead className="bg-gray-200 text-gray-600 text-sm uppercase">
                                            <tr>
                                                <th className="px-4 py-3 text-left">🧑‍⚕️ Paciente</th>
                                                <th className="px-4 py-3 text-left">📅 Fecha</th>
                                                <th className="px-4 py-3 text-left">⏰ Hora</th>
                                                <th className="px-4 py-3 text-left">✅ Estado</th>
                                                <th className="px-4 py-3 text-left">📝 Nota</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-700">
                                            {filteredCitas.map((cita) => (
                                                <CitaRow key={cita.id} cita={cita} />
                                            ))}
                                        </tbody>
                                    </table>
                                </RoleGuard>

                                <RoleGuard allowedRoles={['Patient']}>
                                    <div className="relative border-l border-gray-200">
                                        {filteredCitas.map((cita, index) => (
                                            <div key={cita.id} className="mb-10 ml-6">
                                                {/* Icono principal en la línea de tiempo */}
                                                <div
                                                    className={`absolute w-8 h-8 -left-4 rounded-full ${cita.status === 'completada'
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-400 text-white'
                                                        } flex items-center justify-center`}
                                                >
                                                    <Circle className="w-5 h-5" />
                                                </div>

                                                {/* Contenido de la cita */}
                                                <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                                    <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                                                        <User className="w-5 h-5 text-blue-500" />
                                                        {cita.users.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                        <Mail className="w-4 h-4" />
                                                        {cita.users.email}
                                                    </p>
                                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                                        <Phone className="w-4 h-4" />
                                                        {cita.users.phone}
                                                    </p>

                                                    <div className="mt-4">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Calendar className="w-5 h-5" />
                                                            <span>{cita.fecha}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600 mt-2">
                                                            <Clock className="w-5 h-5" />
                                                            <span>{cita.hora}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4">
                                                        <p className="text-sm font-medium">
                                                            Estado:{' '}
                                                            <span
                                                                className={`${cita.status === 'completada'
                                                                    ? 'text-green-600'
                                                                    : 'text-gray-600'
                                                                    }`}
                                                            >
                                                                {cita.status}
                                                            </span>
                                                        </p>
                                                        <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                                                            <FileText className="w-5 h-5 text-gray-500" />
                                                            {cita.nota ? cita.nota : <span className="italic text-gray-500">Sin nota</span>}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </RoleGuard>

                                <div className="mt-4 flex justify-center">
                                    <Pagination links={citas.links} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default HistorialCitas;
