import React, { useState } from 'react';
import Pagination from '@/Components/Table/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Cita, HistorialPageProps } from "@/types";
import { Head, usePage } from '@inertiajs/react';
import { formatDateComplete, formatHora, getEventStyle } from '@/Components/utils/dateUtils';
import { Calendar, Stethoscope, User, Mail, Phone, FileText, Circle, Clock } from 'lucide-react';
import Modal from '@/Components/ui/Modal';
import useModal from '@/Components/ui/UseModal';
import { useFilters } from '@/Components/hooks/useFilters';
import { usePerPage } from '@/Components/hooks/usePerPage';
import SearchBar from '@/Components/Table/SearchBar';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import FiltrosPopover from '@/Components/Table/FiltrosPopover';
import RoleGuard from '@/Components/auth/RoleGuard';
import ViewCitaModal from './ViewCitaModal';

const Historial = () => {
    const { historialC, citasPatient, historialCDoctor } = usePage<HistorialPageProps>().props;

    const { filters, isLoading: isFiltersLoading, handleFilterChange } = useFilters("historial");
    const { search, status, date } = filters;
    const { perPage, handlePerPageChange, isLoading: isPerPageLoading } = usePerPage(10, "historial");

    const isLoading = isFiltersLoading || isPerPageLoading;

    const { isOpen: isViewModalOpen, openModal: openViewModal, closeModal: closeViewModal } = useModal();

    const [selectedCita, setSelectedCita] = useState<Cita | null>(null);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold">Historial de Citas</h2>}
        >
            <Head title="Historial de Citas" />

            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="p-6">

                        {/* Filtros */}
                        <div className="flex flex-wrap py-4">
                            <div className="w-full sm:w-1/2 my-2 md:my-0">
                                <SearchBar
                                    placeHolder="Buscar ..."
                                    value={search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                            <div className="w-full sm:w-1/2 my-2 md:my-0">
                                <div className='ml-auto w-full flex  justify-end gap-4'>
                                    <RoleGuard allowedRoles={['Admin', 'Doctor', 'receptionist']}>
                                        <div className='mt-1'>
                                            <FiltrosPopover
                                                date={date}
                                                status={status}
                                                handleDateChange={(newDate) => handleFilterChange('date', newDate)}
                                                handleStatusChange={(newStatus) => handleFilterChange('status', newStatus)}
                                            />
                                        </div>
                                    </RoleGuard>
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

                        <RoleGuard allowedRoles={['admin', 'receptionist']}>
                            {/* Añadimos un loader condicional */}
                            {isLoading ? (
                                <div className="flex justify-center items-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                                </div>
                            ) : (
                                <>
                                    {/* Tabla existente */}
                                    {historialC.data.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">
                                            No hay citas en el historial.
                                            <hr className='h-2 w-full' />
                                        </div>
                                    ) : (
                                        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                                            <thead className="bg-gray-200 text-gray-600 text-sm uppercase">
                                                <tr>
                                                    <th className="px-4 py-3 text-left">🧑‍⚕️ Paciente</th>
                                                    <th className="px-4 py-3 text-left">🩺 Doctor</th>
                                                    <th className="px-4 py-3 text-left">📅 Fecha</th>
                                                    <th className="px-4 py-3 text-left">✅ Estado</th>
                                                    <th className="px-4 py-3 text-left">📝 Cita</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {historialC.data.map((cita: Cita) => (
                                                    <tr key={cita.id} className="border-b">
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <User className="w-4 h-4 text-sky-500" />
                                                                <span className="font-medium text-gray-500">{cita.patient.name}</span>
                                                            </div>
                                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                                <Mail className="w-4 h-4 text-blue-500" />
                                                                <span className="font-medium text-gray-500">{cita.patient.phone}</span>
                                                            </div>
                                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                                <Phone className="w-4 h-4 text-green-500" />
                                                                <span className="font-medium text-gray-500">{cita.patient.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <Stethoscope className="w-5 h-5 text-purple-500" />
                                                                <span>{cita.doctor.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="w-5 h-5 text-orange-500" />
                                                                <span>{formatDateComplete(cita.fecha)}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className={getEventStyle(cita.status)}>{cita.status}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedCita(cita);
                                                                    openViewModal();
                                                                }}
                                                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 "
                                                                aria-label="Ver nota de la cita"
                                                                title="Ver nota de la cita"
                                                            >
                                                                <FileText className="w-5 h-5 text-gray-500 group-hover:text-gray-600" />
                                                                <span className="text-sm text-gray-500 group-hover:text-gray-600">Ver Completa</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </>
                            )}

                            {/* Modal */}
                            <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Detalles de la cita">
                                <ViewCitaModal cita={selectedCita} />
                            </Modal>
                        </RoleGuard>

                        <RoleGuard allowedRoles={['doctor']}>
                            {/* Añadimos un loader condicional */}
                            {isLoading ? (
                                <div className="flex justify-center items-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                                </div>
                            ) : (
                                <>
                                    {/* Tabla existente */}
                                    {historialCDoctor.data.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">
                                            No hay citas en el historial.
                                            <hr className='h-2 w-full' />
                                        </div>
                                    ) : (
                                        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                                            <thead className="bg-gray-200 text-gray-600 text-sm uppercase">
                                                <tr>
                                                    <th className="px-4 py-3 text-left">🧑‍⚕️ Paciente</th>
                                                    <th className="px-4 py-3 text-left">🩺 Servicio</th>
                                                    <th className="px-4 py-3 text-left">📅 Fecha</th>
                                                    <th className="px-4 py-3 text-left">✅ Estado</th>
                                                    <th className="px-4 py-3 text-left">📝 Cita</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {historialCDoctor.data.map((cita: Cita) => (
                                                    <tr key={cita.id} className="border-b">
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <User className="w-4 h-4 text-sky-500" />
                                                                <span className="font-medium text-gray-500">{cita.patient.name}</span>
                                                            </div>
                                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                                <Mail className="w-4 h-4 text-blue-500" />
                                                                <span className="font-medium text-gray-500">{cita.patient.phone}</span>
                                                            </div>
                                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                                <Phone className="w-4 h-4 text-green-500" />
                                                                <span className="font-medium text-gray-500">{cita.patient.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <Stethoscope className="w-5 h-5 text-purple-500" />
                                                                {cita.servicio && cita.servicio.length > 0 ? (
                                                                    <p className="text-base font-medium text-gray-500">
                                                                        {cita.servicio.map((servicio) => servicio.label).join(", ")}
                                                                    </p>
                                                                ) : (
                                                                    <p className="text-lg font-medium text-gray-900">No especificado</p>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="w-5 h-5 text-orange-500" />
                                                                <span className='font-medium text-gray-500'>{formatDateComplete(cita.fecha)}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className={getEventStyle(cita.status)}>{cita.status}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedCita(cita);
                                                                    openViewModal();
                                                                }}
                                                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 "
                                                                aria-label="Ver nota de la cita"
                                                                title="Ver nota de la cita"
                                                            >
                                                                <FileText className="w-5 h-5 text-gray-500 group-hover:text-gray-600" />
                                                                <span className="text-sm text-gray-500 group-hover:text-gray-600">Ver Completa</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </>
                            )}

                            {/* Modal */}
                            <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Detalles de la cita">
                                <ViewCitaModal cita={selectedCita} />
                            </Modal>
                        </RoleGuard>

                        <RoleGuard allowedRoles={['patient']}>
                            <div className="relative border-l border-gray-200">
                                {citasPatient.data.map((cita: Cita) => (
                                    <div key={cita.id} className="mb-10 ml-6">
                                        {/* Icono principal en la línea de tiempo */}
                                        <div
                                            className={`absolute w-8 h-8 -left-4 rounded-full ${cita.status === 'Completada'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-400 text-white'
                                                } flex items-center justify-center`}
                                        >
                                            <Circle className="w-5 h-5" />
                                        </div>

                                        {/* Contenido de la cita */}
                                        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <h2 className="text-xl font-bold text-sky-700 flex items-center gap-2">
                                                Servicio(s) de 
                                                {cita.servicio && cita.servicio.length > 0 ? (
                                                    <p >
                                                        {cita.servicio.map((servicio) => servicio.label).join(", ")}
                                                    </p>
                                                ) : (
                                                    <p className="text-lg font-medium text-gray-900">No especificado</p>
                                                )}
                                            </h2>

                                            <div className="mt-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="w-5 h-5 text-orange-500" />
                                                    <span>{formatDateComplete(cita.fecha)}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 mt-2">
                                                    <Clock className="w-5 h-5 text-purple-500" />
                                                    <span>{formatHora(cita.hora)}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 mt-2">
                                                    <Stethoscope className="w-5 h-5 text-blue-500" />
                                                    <span>{cita.doctor.name}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-sm font-medium">
                                                    Estado:{' '}
                                                    <span className={getEventStyle(cita.status)}>{cita.status}</span>
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


                        {/* Paginación */}
                        <RoleGuard allowedRoles={['admin', 'receptionist']}>
                            <div className="mt-4 flex justify-center">
                                <Pagination links={historialC.links} />
                            </div>
                        </RoleGuard>
                        <RoleGuard allowedRoles={['doctor']}>
                            <div className="mt-4 flex justify-center">
                                <Pagination links={historialCDoctor.links} />
                            </div>
                        </RoleGuard>
                        <RoleGuard allowedRoles={['patient']}>
                            <div className="mt-4 flex justify-center">
                                <Pagination links={citasPatient.links} />
                            </div>
                        </RoleGuard>

                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
};

export default Historial;
