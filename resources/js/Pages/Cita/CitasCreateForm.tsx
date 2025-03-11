import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Calendar from '@/Components/fullCalendar/Calendar';
import ButtonCancel from '@/Components/Form/ButtonCancel';
import ReusableButton from '@/Components/Form/ReusableButton';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import ReusableTextArea from '@/Components/ReusableTextArea';
import { CitaPageProps } from '@/types';
import AutoComplete from '@/Components/ui/AutoComplete';


const CitasCreate = () => {

    const { data, setData, post, processing, errors, reset } = useForm({
        doctor_id: '',
        patient_id: '',
        fecha: '',
        hora: '',
        tipo: '',
        status: '',
        nota: '',
    });

    const { pacientes, doctores, citas } = usePage<CitaPageProps>().props;


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
                    timer: 1500
                }).then(() => {
                    reset();
                    Inertia.visit('/citas')
                });
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

    const onSelectPacientes = (patient_id: number) => {
        setData("patient_id", String(patient_id)); // Convierte el número a string
    };

    const onSelectDoctor = (doctor_id: number) => {
        setData("doctor_id", String(doctor_id)); // Convierte el número a string
    };


    return (
        <AuthenticatedLayout

        >
            <Head title="Agendar Cita" />

            <div className="py-12">
                <div className="max-w-[1640px] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="py-6 px-6 flex flex-wrap  ">
                        <div className='w-full justify-center lg:w-4/12 py-4 lg:pr-6'>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Agendar Nueva Cita
                                    </h2>
                                    <hr className='w-full border my-1 border-sky-500' />
                                </div>

                                <form onSubmit={submit} >
                                    <div >
                                        <div className='w-full my-3'>
                                            <InputLabel
                                                htmlFor="name"
                                                value="Nombre del paciente"
                                            />
                                            <AutoComplete
                                                doctores={pacientes}
                                                placeholder="Buscar paciente..."
                                                onSelect={onSelectPacientes}
                                            />
                                            <InputError message={errors.patient_id} className="mt-2" />
                                        </div>

                                        <div className='w-full my-3'>
                                            <InputLabel
                                                htmlFor="name"
                                                value="Servicio"
                                            />
                                            <ReusableSelect
                                                options={[
                                                    { value: 'Ortodoncia', label: 'Ortodoncia' },
                                                    { value: 'Periodoncia', label: 'Periodoncia' },
                                                    { value: 'Endodoncia', label: 'Endodoncia' },
                                                    { value: 'Prostodoncia', label: 'Prostodoncia' },
                                                    { value: 'Cirugía Oral y Maxilofacial', label: 'Cirugía Oral y Maxilofacial' },
                                                    { value: 'Pedodoncia', label: 'Pedodoncia' },
                                                ]}
                                                value={data.tipo}
                                                onChange={(event) => setData('tipo', event.target.value)}
                                                className="w-full mt-1"
                                                required
                                            />
                                            <InputError message={errors.tipo} className="mt-2" />
                                        </div>

                                        <div className='w-full  my-3'>
                                            <InputLabel
                                                htmlFor="name"
                                                value="Nombre del dentista"
                                            />
                                            <AutoComplete
                                                doctores={doctores}
                                                placeholder="Buscar doctor..."
                                                onSelect={onSelectDoctor}
                                            />
                                            <InputError message={errors.doctor_id} className="mt-2" />
                                        </div>

                                        <div className='w-full my-3'>
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

                                        <div className='w-full my-3'>
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

                                        <div className='w-full my-3'>
                                            <InputLabel htmlFor="status" value="Elige el estado:" />
                                            <ReusableSelect
                                                id="status"
                                                name="status"
                                                options={[
                                                    { value: 'Confirmada', label: 'Confirmada' },
                                                    { value: 'Pendiente', label: 'Pendiente' },
                                                ]}
                                                value={data.status}
                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm border focus:border-sky-500 focus:ring-opacity-50"
                                                onChange={(e) => setData('status', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.status} className="mt-2" />
                                        </div>

                                        <div className='w-full my-3'>
                                            <InputLabel htmlFor="nota" value='Notas de la Consulta' />
                                            <ReusableTextArea
                                                id="nota"
                                                name="nota"
                                                rows={5}
                                                value={data.nota}
                                                onChange={(e) => setData('nota', e.target.value)}
                                                placeholder="Registre detalles importantes de la consulta..."
                                                maxLength={700}
                                                className="font-mono text-base leading-relaxed tracking-wide"
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
                                    </div>
                                    <div className="flex justify-end gap-4 ">
                                        <ButtonCancel
                                            onClick={cancel}
                                        >
                                            Salir
                                        </ButtonCancel>
                                        <ReusableButton type="submit" disabled={processing}>
                                            {processing ? 'Guardando...' : 'Guardar'}
                                        </ReusableButton>
                                    </div>
                                </form>
                            </div>
                            <div className='w-full lg:w-8/12 py-4'>
                                <Calendar citas={citas} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CitasCreate;
