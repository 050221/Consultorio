import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Calendar from '@/Components/fullCalendar/Calendar';
import ButtonCancel from '@/Components/Form/ButtonCancel';
import ReusableButton from '@/Components/Form/ReusableButton';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import ReusableTextArea from '@/Components/ReusableTextArea';


//validar los requird por aletas de 


// Interfaz para el tipo de paciente
interface Paciente {
    id: number;
    name: string;
}

// Interfaz personalizada para los props de la página
interface CustomPageProps extends InertiaPageProps {
    pacientes: Paciente[]; // La lista de pacientes enviada desde el controlador
}

const CitasCreate = () => {

    const { data, setData, post, processing, errors, reset } = useForm({
        patient_id: '',
        fecha: '',
        hora: '',
        status: '',
        nota: '',
    });

    const { pacientes } = usePage<CustomPageProps>().props; // Obtenemos los pacientes desde los props


    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos enviados desde el formulario:', data);
        post(route('citas.store'), {
            onSuccess: () => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Cita Agendada!',
                    text: 'La cita fue agendada exitosamente para el paciente seleccionado.',
                    showConfirmButton: false,
                    timer: 2000
                });
                reset();
            },
            onError: () => {
                console.log('Error al guardar la cita:', errors);
                Swal.fire({
                    title: 'Error al Agendar',
                    text: 'Ocurrió un problema al intentar agendar la cita. Por favor, verifica los datos e inténtalo nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                });
            },
        });
    };

    const cancel = () => {
        Inertia.visit('/citas');
    }

    return (
        <AuthenticatedLayout

        >
            <Head title="Agendar cita" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-6 flex flex-wrap  ">
                            <div className='w-full sm:w-4/12 '>
                                <div className=" p-3">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Agendar Nueva Cita
                                    </h2>
                                    <hr className='w-full border my-1 border-sky-500' />
                                </div>

                                <form onSubmit={submit} className=" flex flex-wrap ">
                                    <div className='w-full md:w-1/2 p-3'>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Nombre del paciente:"
                                        />
                                        <ReusableSelect
                                            options={pacientes.map(paciente => ({
                                                value: paciente.id,
                                                label: paciente.name
                                            }))}
                                            value={data.patient_id || ''}
                                            onChange={(event) => setData('patient_id', event.target.value)}
                                            placeholder="Selecciona un paciente"
                                            className="w-full mt-1"
                                            required
                                        />

                                        <InputError message={errors.patient_id} className="mt-2" />
                                    </div>

                                    <div className='w-full md:w-1/2 p-3'>
                                        <InputLabel htmlFor="fecha" value="Fecha de la cita:" />
                                        <TextInput
                                            id="fecha"
                                            type="date"
                                            name="fecha"
                                            value={data.fecha}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('fecha', e.target.value)}
                                            required
                                            min={new Date().toISOString().split("T")[0]}
                                        />
                                        <InputError message={errors.fecha} className="mt-2" />
                                    </div>

                                    <div className='w-full md:w-1/2 p-3'>
                                        <InputLabel htmlFor="hora" value="Elige una hora:" />
                                        <TextInput
                                            id="hora"
                                            type="time"
                                            name="hora"
                                            value={data.hora}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('hora', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.hora} className="mt-2" />
                                    </div>

                                    <div className='w-full md:w-1/2 p-3'>
                                        <InputLabel htmlFor="status" value="Elige el estado:" />
                                        <ReusableSelect
                                            id="status"
                                            name="status"
                                            options={[
                                                { value: 'Pendiente', label: 'Pendiente' },
                                                { value: 'Confirmada', label: 'Confirmada' },
                                                { value: 'Cancelada', label: 'Cancelada' },
                                            ]}
                                            placeholder="Seleccione un estado"  // Opcional, puedes dejarlo como está o modificarlo
                                            value={data.status}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm border focus:border-sky-500 focus:ring-opacity-50"
                                            onChange={(e) => setData('status', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                    <div className='w-full p-3'>
                                        <InputLabel htmlFor="nota" value='Notas de la Consulta' />
                                        <ReusableTextArea
                                            id="nota"
                                            name="nota"
                                            rows={8}
                                            value={data.nota}
                                            onChange={(e) => setData('nota', e.target.value)}
                                            placeholder="Registre detalles importantes de la consulta..."
                                            maxLength={700}
                                            className="font-mono text-base leading-relaxed tracking-wide"
                                            required
                                        />
                                        <div className="text-right text-sm text-gray-500">
                                            {data.nota.length} / 700 caracteres
                                        </div>
                                        {data.nota.length === 700 && (
                                            <p className="text-red-500 text-xs">
                                                Has alcanzado el límite máximo de caracteres
                                            </p>
                                        )}
                                        <InputError message={errors.nota} className="mt-2" />
                                    </div>
                                    <div className="flex justify-end gap-4 p-3">
                                        <ButtonCancel
                                            onClick={cancel}
                                        >
                                            Salir
                                        </ButtonCancel>
                                        <ReusableButton
                                            type="submit"
                                            processing={processing}
                                        >
                                            Guardar
                                        </ReusableButton>
                                    </div>
                                </form>
                            </div>
                            <div className='w-full sm:w-8/12'>
                                <Calendar />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CitasCreate;
