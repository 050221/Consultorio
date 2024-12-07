import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import ButtonCancel from '@/Components/Form/ButtonCancel';
import ReusableButton from '@/Components/Form/ReusableButton';
import Swal from 'sweetalert2';
import ReusableTextArea from '@/Components/ReusableTextArea';

interface Cita {
    id: number;
    patient_id: number;
    fecha: string;
    hora: string;
    status: string;
    nota?: string;
    users?: {
        id: number;
        name: string;
    };
}

interface EditCitaFormProps {
    cita: Cita;
    onClose: () => void;
}

const EditCitaForm: React.FC<EditCitaFormProps> = ({ cita, onClose }) => {
    const userName = cita.users?.name || 'Desconocido';

    // useForm para manejar el estado del formulario
    const { data, setData, put, errors, processing } = useForm({
        patient_id: cita.patient_id,
        fecha: cita.fecha,
        hora: cita.hora,
        status: cita.status,
        nota: cita.nota || '',
    });

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
                });
            },
        });
    };

    return (
        <>
            <Head title="Editar cita" />

            <form onSubmit={handleSubmit}>
                {/* Datos principales */}
                <div className="my-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Datos Principales</h3>
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
                            <InputLabel htmlFor="patient_id" value="Nombre del paciente:" />
                            <p className="mt-1 text-gray-700 font-medium">{userName}</p>
                        </div>

                        <div className="w-full sm:w-1/2 px-2">
                            <InputLabel htmlFor="fecha" value="Fecha de la cita:" />
                            <TextInput
                                id="fecha"
                                type="date"
                                value={data.fecha}
                                onChange={(e) => setData('fecha', e.target.value)}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            <InputError message={errors.fecha} className="mt-2 text-red-500" />
                        </div>
                    </div>
                </div>

                {/* Detalles de la cita */}
                <div className="my-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Detalles de la Cita</h3>
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
                            <InputLabel htmlFor="hora" value="Elige una hora:" />
                            <TextInput
                                id="hora"
                                type="time"
                                value={data.hora}
                                onChange={(e) => setData('hora', e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            <InputError message={errors.hora} className="mt-2 text-red-500" />
                        </div>

                        <div className="w-full sm:w-1/2 px-2">
                            <InputLabel htmlFor="status" value="Elige el estado de la cita:" />
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" disabled>
                                    Selecciona el estado
                                </option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Cancelada">Cancelada</option>
                            </select>
                            <InputError message={errors.status} className="mt-2 text-red-500" />
                        </div>
                    </div>
                </div>

                {/* Descripción de la cita */}
                <div className="my-4">
                    <InputLabel htmlFor="nota" value="Notas de la consulta:" />
                    <ReusableTextArea
                        id="nota"
                        value={data.nota}
                        onChange={(e) => setData('nota', e.target.value)}
                        placeholder="Registre detalles importantes de la consulta..."
                        maxLength={700}
                        className="font-mono text-base leading-relaxed tracking-wide"
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

