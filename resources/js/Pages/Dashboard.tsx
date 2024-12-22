import Calendar from '@/Components/fullCalendar/Calendar';
import Accordion from '@/Components/ui/Accordion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { DashboardPageProps} from '@/types';
import { CalendarDays, Users, AlertCircle, UserPlus, LayoutDashboard } from 'lucide-react';
import Pagination from '@/Components/Table/Pagination';
import { useEffect } from 'react';
import RoleGuard from '@/Components/auth/RoleGuard';

export default function Dashboard() {
    // Obtención de datos desde el hook usePage con tipado
    const { citas, citasHoy, auth, nuevosPacientesMes } = usePage<DashboardPageProps>().props;

    useEffect(() => {
        console.log('Auth data:', auth);
    }, [auth]);


    // Simulación de estadísticas (pueden calcularse dinámicamente con los datos)
    const stats = {
        todayAppointments: citasHoy.data.length,
        totalAppointments: citas.length,
        canceledAppointments: citas.filter(cita => cita.status === 'Cancelada').length,
        newPatients: nuevosPacientesMes,
    };

    return (
        <AuthenticatedLayout

            header={
                <>
                    <RoleGuard allowedRoles={['Admin', 'Doctor']}>
                        <div className="space-y-1">
                            {/* Título con Ícono */}
                            <div className="flex items-center space-x-2">
                                <LayoutDashboard className="w-6 h-6 text-sky-600" />
                                <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
                                
                            </div>
                            {/* Subtítulo */}
                            <p className="text-sm text-gray-500">Resumen de citas, pacientes y estadísticas del sistema</p>
                        </div>
                    </RoleGuard>
                    <RoleGuard allowedRoles={['Patient']}>
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-700">Bienvenido, {auth.user.name}</h2>
                            <p className="text-gray-500">
                                Aquí puedes ver tus próximas citas, consultar detalles y gestionar tu perfil.
                            </p>
                        </div>
                    </RoleGuard>

                </>
            }

        >
            <Head title="Panel de Control" />

            <RoleGuard allowedRoles={['Admin', 'Doctor']}>
                <div className="py-12">
                    <div className="mx-auto max-w-8xl sm:px-6 lg:px-8 space-y-6">
                        {/* Estadísticas rápidas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Citas hoy */}
                            <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <CalendarDays className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">
                                        {stats.todayAppointments}
                                    </p>
                                    <p className="text-sm text-gray-500">Citas hoy</p>
                                </div>
                            </div>

                            {/* Total de citas */}
                            <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">
                                        {stats.totalAppointments}
                                    </p>
                                    <p className="text-sm text-gray-500">Total de citas</p>
                                </div>
                            </div>

                            {/* Citas canceladas */}
                            <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">
                                        {stats.canceledAppointments}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Citas canceladas
                                    </p>
                                </div>
                            </div>

                            {/* Nuevos pacientes */}
                            <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <UserPlus className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">
                                        {stats.newPatients}
                                    </p>
                                    <p className="text-sm text-gray-500">Nuevos pacientes</p>
                                </div>
                            </div>
                        </div>

                        {/* Contenido principal */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Calendario */}
                                    <div className="w-full md:w-3/4">
                                        <Calendar citas={citas} />
                                    </div>

                                    {/* Citas del día */}
                                    <div className="w-full md:w-1/4 flex flex-col">
                                        <h1 className="text-lg font-semibold text-gray-700 mb-4">
                                            Citas de hoy
                                        </h1>
                                        <Accordion
                                            citas={citasHoy.data} // Datos actuales de la página
                                            className=" rounded-lg overflow-hidden flex-grow"
                                        />
                                        <div className="mt-auto">
                                            <Pagination links={citasHoy.links} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RoleGuard>

            {/* Contenido para PACIENTES */}
            <RoleGuard allowedRoles={['Patient']}>
                <div className="py-12">
                    <div className="max-w-4xl mx-auto space-y-6">

                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                Tus citas
                            </h3>
                            <Accordion
                                citas={citasHoy.data}
                                className="rounded-lg overflow-hidden"
                            />
                        </div>
                    </div>
                </div>
            </RoleGuard>
        </AuthenticatedLayout>
    );
}
