import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import ButtonCancel from '@/Components/Form/ButtonCancel';
import ReusableButton from '@/Components/Form/ReusableButton';
import Swal from 'sweetalert2';
import ReusableTextArea from '@/Components/ReusableTextArea';
import { EditCitaFormProps } from '@/types';
import ReusableSelect from '@/Components/Table/ReusableSelect';
import MultiSelectArray from '@/Components/ui/MultiSelectArray';

const EditCitaForm: React.FC<EditCitaFormProps> = ({ cita, onClose }) => {

    // useForm para manejar el estado del formulario
    const { data, setData, put, errors, processing } = useForm({
        patient_id: cita.patient_id,
        doctor_id: cita.doctor_id,
        fecha: cita.fecha,
        hora: cita.hora,
        status: cita.status,
        servicio: cita.servicio,
        nota: cita.nota || '',
        is_emergency: cita.is_emergency || false,
    });

    //console.log('cita', cita);


    const handleChange = (field: string, value: any) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('citas.update', cita.id), {
            onSuccess: () => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Guardado!',
                    text: 'La cita ha sido actualizada con éxito.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => onClose());
            },
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, revisa los datos ingresados y vuelve a intentarlo.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'bg-sky-500 text-white font-semibold py-2 px-6 rounded hover:bg-sky-600 focus:ring-2 focus:ring-sky-300 transition-all duration-200 ease-in-out cursor-pointer border-2 border-sky-300 shadow-md hover:shadow-lg active:scale-95 mr-2',
                    },
                    buttonsStyling: false,
                });
            },
        });
    };

    return (
        <>
            <Head title="Edición de Cita" />

            <form onSubmit={handleSubmit}>
                {/* Datos principales */}
                <div className="my-4">
                    <h3 className="text-gray-800 font-semibold text-xl">Datos Principales</h3>
                    <hr className=' border-1 border-gray-300 mb-4' />
                    <div className="flex flex-wrap  mt-1">
                        <div className="w-full sm:w-1/2 mt-2">
                            <InputLabel htmlFor="patient_id" value="Nombre del paciente:" />
                            <p className="text-gray-700 text-lg font-medium">{cita.patient.name}</p>
                        </div>
                        <div className="w-full sm:w-1/2 mt-2">
                            <InputLabel htmlFor="patient_id" value="Nombre del dentista:" />
                            <p className="text-gray-700 text-lg font-medium">{cita.doctor.name}</p>
                        </div>
                    </div>
                </div>


                {/* Detalles de la cita */}
                <div className="my-4">
                    <h3 className="text-xl font-semibold text-gray-800 ">Detalles de la Cita</h3>
                    <hr className=' border-1 border-gray-300 mb-4' />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="fecha" value="Fecha de la cita" />
                            <TextInput
                                id="fecha"
                                type="date"
                                value={data.fecha}
                                onChange={(e) => setData('fecha', e.target.value)}
                                min={new Date().toLocaleDateString('en-CA')}
                                required
                                className="w-full"
                            />
                            <InputError message={errors.fecha} className="mt-2 text-red-500" />
                        </div>
                        <div>
                            <InputLabel htmlFor="hora" value="Elige una hora" />
                            <TextInput
                                id="hora"
                                type="time"
                                value={data.hora}
                                onChange={(e) => setData('hora', e.target.value)}
                                required
                                className="w-full"
                            />
                            <InputError message={errors.hora} className="mt-2 text-red-500" />
                        </div>
                    </div>
                    <div className='grid gap-4 mt-4'>
                        <div>
                            <InputLabel htmlFor="servicio" value="Servicio" />
                            <MultiSelectArray
                                name="servicio"
                                value={data.servicio}
                                onChange={(value) => handleChange("servicio", value)}
                                options={[
                                    { value: 'Rehabilitación', label: 'Rehabilitación' },
                                    { value: 'Ortodoncia', label: 'Ortodoncia' },
                                    { value: 'Cirugía', label: 'Cirugía' },
                                    { value: 'Implantes', label: 'Implantes' },
                                    { value: 'Endodoncia', label: 'Endodoncia' },
                                ]}
                                className="w-full"
                            />
                            <InputError message={errors.servicio} className="mt-2 text-red-500" />
                        </div>
                        <div>
                            <InputLabel htmlFor="status" value="Elige el estado de la cita" />
                            <ReusableSelect
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                required
                                options={[
                                    { value: 'Pendiente', label: 'Pendiente' },
                                    { value: 'Cancelada', label: 'Cancelada' },
                                    { value: 'Confirmada', label: 'Confirmada' },
                                ]}
                            />
                            <InputError message={errors.status} className="mt-2 text-red-500" />
                        </div>
                        <div className='w-full my-3'>
                            <InputLabel htmlFor="is_emergency" value="¿Es una urgencia?" />
                            <div className="flex items-center">
                                <input
                                    id="is_emergency"
                                    type="checkbox"
                                    checked={data.is_emergency}
                                    onChange={(e) => setData('is_emergency', e.target.checked)}
                                    className="mr-2 w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                                />
                                <label htmlFor="is_emergency" className="text-gray-700">Sí</label>
                            </div>
                            <InputError message={errors.is_emergency} className="mt-2" />
                        </div>
                    </div>


                </div>

                {/* Descripción de la cita */}
                <div className="my-4">
                    <InputLabel htmlFor="nota" value="Nota de la consulta" />
                    <ReusableTextArea
                        id="nota"
                        value={data.nota}
                        onChange={(e) => setData('nota', e.target.value)}
                        placeholder="Registre detalles importantes de la consulta..."
                        maxLength={700}
                    />
                    <div className="text-right text-sm text-gray-500">
                        {data.nota?.length || 0} / 700 caracteres
                    </div>
                    <InputError message={errors.nota} className="mt-2 text-red-500" />
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 mt-6">
                    <ButtonCancel onClick={onClose}>
                        Cancelar
                    </ButtonCancel>
                    <ReusableButton type="submit" disabled={processing}>
                        {processing ? 'Guardando...' : 'Guardar'}
                    </ReusableButton>
                </div>
            </form>
        </>
    );
};

export default EditCitaForm;

