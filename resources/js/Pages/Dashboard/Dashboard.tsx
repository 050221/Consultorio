import Calendar from '@/Components/fullCalendar/Calendar';
import Accordion from '@/Components/ui/Accordion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Cita, DashboardPageProps, Servicio } from '@/types';
import { CalendarDays, Users, AlertCircle, LayoutDashboard, Stethoscope, Check, Clock, TrendingUp, Info, UserCheck, BarChart2, CalendarDaysIcon, Phone, Mail, User, FileText, } from 'lucide-react';
import Pagination from '@/Components/Table/Pagination';
import RoleGuard from '@/Components/auth/RoleGuard';
import Graficas from './Graficas';
import { formatDateComplete, formatHora, getEventStyle } from '@/Components/utils/dateUtils';
import DashboardHeader from '@/Components/ui/DashboardHeader';
import StatCard from '@/Components/ui/StartCard';






export default function Dashboard() {
    // Obtención de datos desde el hook usePage con tipado
    const { citas, citasHoy, auth, totalPacientes, totalDentistas, totalCitas, totalCitasConfirmadas, totalCitasPendientes, totalCitasCancelada, destistasMasCitas, totalCitasPorMes, citasUser, citasDentista, citasDentistaHoy, totalCitasDentista, totalCitasConfirmadasDentista, totalCitasPendientesDentista, totalCitasCanceladaDentista } = usePage<DashboardPageProps>().props;

    console.log(citasUser);


    return (
        <AuthenticatedLayout

            header={
                <>
                    <RoleGuard allowedRoles={['admin']}>
                        <DashboardHeader
                            icon={<LayoutDashboard className="w-6 h-6 text-sky-600" />}
                            title="Panel de Control"
                            subtitle="Resumen de citas, pacientes, dentistas, repecionistas y estadísticas del sistema"
                        />
                    </RoleGuard>
                    <RoleGuard allowedRoles={['doctor']}>
                        <DashboardHeader
                            icon={<Stethoscope className="w-6 h-6 text-sky-600" />}
                            title={`Bienvenido, ${auth.user.name}`}
                            subtitle="Consulta tus próximas citas y gestiona tu perfil"
                        />
                    </RoleGuard>

                    <RoleGuard allowedRoles={['receptionist']}>
                        <DashboardHeader
                            icon={<UserCheck className="w-6 h-6 text-sky-600" />}
                            title={`Bienvenido, ${auth.user.name}`}
                            subtitle="Gestión de citas, pacientes y disponibilidad de los doctores"
                        />
                    </RoleGuard>

                    <RoleGuard allowedRoles={['patient']}>
                        <DashboardHeader
                            icon={<User className="w-6 h-6 text-sky-600" />}
                            title={`Bienvenido, ${auth.user.name}`}
                            subtitle="Consulta tus citas y accede a tu historial completo"
                        />
                    </RoleGuard>

                </>
            }
        >
            <Head title="Panel de Control" />

            <RoleGuard allowedRoles={['admin', 'doctor', 'receptionist']}>
                <div className="py-12">
                    <div className="mx-auto max-w-8xl sm:px-6 lg:px-8 space-y-6">

                        {/* Estadísticas rápidas */}
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">

                            {/*Total de Pacientes Registrados */}
                            <RoleGuard allowedRoles={['admin']}>
                                <StatCard
                                    icon={<Users className="w-6 h-6" />}
                                    value={totalPacientes}
                                    label="Total de Pacientes Registrados"
                                    bgColor="bg-blue-100"
                                    iconColor="text-blue-600" />
                            </RoleGuard>

                            {/* Total de Dentistas activos y total de citas */}
                            <RoleGuard allowedRoles={['admin', 'receptionist']}>
                                <StatCard
                                    icon={<Stethoscope className="w-6 h-6" />}
                                    value={totalDentistas}
                                    label="Total de Dentistas Activos"
                                    bgColor="bg-sky-100"
                                    iconColor="text-sky-600" />
                                <StatCard
                                    icon={<CalendarDays className="w-6 h-6" />}
                                    value={totalCitas}
                                    label="Citas Programadas Hoy"
                                    bgColor="bg-sky-100"
                                    iconColor="text-sky-600" />

                                {/* Citas confimandas */}
                                <StatCard
                                    icon={<Check className="w-6 h-6" />}
                                    value={totalCitasConfirmadas}
                                    label="Citas Confirmadas"
                                    bgColor="bg-green-100"
                                    iconColor="text-green-600" />
                                {/* Citas pendinetes */}
                                <StatCard
                                    icon={<Clock className="w-6 h-6" />}
                                    value={totalCitasPendientes}
                                    label="Citas Pendientes"
                                    bgColor="bg-yellow-100"
                                    iconColor="text-yellow-600" />

                                {/* Citas canceladas */}
                                <StatCard
                                    icon={<AlertCircle className="w-6 h-6" />}
                                    value={totalCitasCancelada}
                                    label="Citas Canceladas"
                                    bgColor="bg-red-100"
                                    iconColor="text-red-600" />
                            </RoleGuard>



                            <RoleGuard allowedRoles={['doctor']}>
                                <StatCard
                                    icon={<CalendarDays className="w-6 h-6" />}
                                    value={totalCitasDentista}
                                    label="Total de Citas Programadas "
                                    bgColor="bg-sky-100"
                                    iconColor="text-sky-600" />
                                {/* Citas confimandas */}
                                <StatCard
                                    icon={<Check className="w-6 h-6" />}
                                    value={totalCitasConfirmadasDentista}
                                    label="Citas Confirmadas"
                                    bgColor="bg-green-100"
                                    iconColor="text-green-600" />
                                {/* Citas pendinetes */}
                                <StatCard
                                    icon={<Clock className="w-6 h-6" />}
                                    value={totalCitasPendientesDentista}
                                    label="Citas Pendientes"
                                    bgColor="bg-yellow-100"
                                    iconColor="text-yellow-600" />

                                {/* Citas canceladas */}
                                <StatCard
                                    icon={<AlertCircle className="w-6 h-6" />}
                                    value={totalCitasCanceladaDentista}
                                    label="Citas Canceladas"
                                    bgColor="bg-red-100"
                                    iconColor="text-red-600" />
                            </RoleGuard>
                        </section>


                        {/* Contenido principal */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Calendario */}
                                    <RoleGuard allowedRoles={['admin', 'receptionist']}>
                                        <div className="w-full md:w-3/4">
                                            <Calendar citas={citas} />
                                        </div>
                                    </RoleGuard>
                                    <RoleGuard allowedRoles={['doctor']}>
                                        <div className="w-full md:w-3/4">
                                            <Calendar citas={citasDentista} />
                                        </div>
                                    </RoleGuard>

                                    {/* Citas del día */}
                                    <div className="w-full md:w-1/4 flex flex-col">
                                        <h1 className="text-lg font-semibold text-gray-700 mb-4">
                                            Citas de hoy
                                        </h1>
                                        <RoleGuard allowedRoles={['admin', 'receptionist']}>
                                            <Accordion
                                                citas={citasHoy.data} // Datos actuales de la página
                                                className=" rounded-lg overflow-hidden flex-grow"
                                            />
                                        </RoleGuard>
                                        <RoleGuard allowedRoles={['doctor']}>
                                            <Accordion
                                                citas={citasDentistaHoy.data} // Datos actuales de la página
                                                className=" rounded-lg overflow-hidden flex-grow"
                                            />
                                        </RoleGuard>
                                        <div className="mt-auto">
                                            <Pagination links={citasHoy.links} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <RoleGuard allowedRoles={['admin']}>
                            <Graficas
                                destistasMasCitas={destistasMasCitas}
                                totalCitasPorMes={totalCitasPorMes}
                            />
                        </RoleGuard>


                    </div>
                </div>
            </RoleGuard>

            {/* Contenido para PACIENTES */}
            <RoleGuard allowedRoles={["patient"]}>
                <div className="py-12">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg rounded-xl p-6 mx-2 md:mx-0">
                            <h3 className="text-2xl font-bold text-white mb-6">📅 Cita</h3>

                            {citasUser.length > 0 ? (
                                <div className="space-y-4">
                                    {citasUser.map((cita: Cita) => (
                                        <div key={cita.id} className="bg-white p-5 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2  gap-4 border-l-4 border-sky-500">
                                            <div className="space-y-2">

                                                <h4 className="text-lg font-semibold text-sky-600">Servicio(s) de {cita.servicio && cita.servicio.length > 0 ? (
                                                    <span className="text-lg font-semibold text-sky-600">
                                                        {cita.servicio.map((servicio: Servicio) => servicio.value).join(", ")}
                                                    </span>
                                                ) : (
                                                    <p className="text-lg font-medium text-gray-900">No especificado</p>
                                                )}</h4>
                                                <p className="text-sm text-gray-700 flex items-center gap-2">
                                                    <CalendarDays className="w-5 h-5 text-gray-500" />
                                                    {formatDateComplete(cita.fecha)}
                                                </p>
                                                <p className="text-sm text-gray-700 flex items-center gap-2">
                                                    <Clock className="w-5 h-5 text-gray-500" />
                                                    {formatHora(cita.hora)}
                                                </p>
                                                <p className="text-sm text-gray-700 flex items-center gap-2">
                                                    <Stethoscope className="w-5 h-5 text-gray-500" />
                                                    {cita.doctor?.name || "Sin dentista asignado"}
                                                </p>
                                                <p className={`px-3 py-1 text-sm font-medium rounded-full ${getEventStyle(cita.status)}`}>
                                                    {cita.status}
                                                </p>
                                            </div>

                                            <div className="text-justify">
                                                <p className="mt-6 text-sm text-gray-500 italic max-w-96">
                                                    <span className='block text-left mb-1 text-base text-gray-700 font-semibold'>
                                                        Nota de Observación:
                                                    </span>

                                                    {/* Mostrar un mensaje más amigable si no hay nota */}
                                                    <span className={`block text-left mb-1 text-base ${cita.nota ? 'text-gray-700' : 'text-gray-400'}`}>
                                                        {cita.nota ? cita.nota : <span className="italic text-gray-400">Sin nota</span>}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white text-center italic">No tienes cita programadas.</p>
                            )}
                        </div>
                    </div>
                </div>
            </RoleGuard>
        </AuthenticatedLayout>
    );
}
